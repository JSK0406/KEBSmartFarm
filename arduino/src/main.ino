#include "oled_u8g2.h"
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <SPIFFS.h>
#include <WiFi.h>

// ADAFRUIT IO Setup
#define IO_USERNAME "user"
#define IO_GROUPNAME "sensor01"
#define IO_KEY "key"
#define IO_SERVER "io.adafruit.com"
#define IO_SERVERPORT 1883

// initial AP MODE
const char *AP_SSID = "ArduinoAP";
const char *AP_PASSWORD = "password";

OLED_U8G2 oled;
// illuminance, temp, LED
int illuminanceSensor = A1, lux = 0;
int tempSensor = A2;
int RED_LED = D2;

int Vo;
double R1 = 10000;
double logR2, R2, T, Tc;
double c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
double Tf = 0;
unsigned long previousMillis = 0;
const long interval = 60 * 1000; // 1분마다
// AP IP 주소 설정
IPAddress local_IP(192, 168, 4, 1);
IPAddress gateway(192, 168, 4, 1);
IPAddress subnet(255, 255, 255, 0);

// Create WiFiClient class to connect to the MQTT server
WiFiClient client;
// Setup the MQTT client class by passing in the WiFi client and MQTT server and
// login details.
Adafruit_MQTT_Client mqtt(&client, IO_SERVER, IO_SERVERPORT, IO_USERNAME,
                          IO_KEY);

/************** Feeds *************/
// Setup publishing feeds
// MQTT paths for AIO => [username]/feeds/[feedname]
Adafruit_MQTT_Publish sensorData =
    Adafruit_MQTT_Publish(&mqtt, IO_USERNAME "/feeds/" IO_GROUPNAME ".data");

Adafruit_MQTT_Publish sensorData2 =
    Adafruit_MQTT_Publish(&mqtt, IO_USERNAME "/feeds/sensor02.data");


// Setup a subscribing feeds
Adafruit_MQTT_Subscribe onoffbtn =
    Adafruit_MQTT_Subscribe(&mqtt, IO_USERNAME "/feeds/" IO_GROUPNAME ".onoff");
/************** Feeds *************/

AsyncWebServer server(80);
// AP 모드로 wifi 정보 저장
File configFile;

String ssid, password;
int connectAttempt = 0;

void loadConfig();
void attemptWiFiConnection();
void startAP();
void serveInitialConfigPage();
void saveConfigHandler(AsyncWebServerRequest *);
void MQTT_connect();
void calcTempCeclious();
void setup() {
    Serial.begin(115200);
    oled.setup();
    SPIFFS.begin(true);
    if (SPIFFS.exists("/config.json")) {
        loadConfig();
        attemptWiFiConnection();
        pinMode(RED_LED, OUTPUT); // Now can light LED
        Serial.println(WiFi.localIP());
        // Setup MQTT subscription for onoff feed
        mqtt.subscribe(&onoffbtn);
    } else {
        startAP();
        serveInitialConfigPage();
    }
}

void loop() {
    MQTT_connect();
    Adafruit_MQTT_Subscribe *subs;
    while ((subs = mqtt.readSubscription(5000))) {
        if (subs == &onoffbtn) {
            Serial.print(F("On-off button : "));
            Serial.println((char *)onoffbtn.lastread);

            if (strcmp((char *)onoffbtn.lastread, "ON") == 0) {
                digitalWrite(RED_LED, HIGH);
            }
            if (strcmp((char *)onoffbtn.lastread, "OFF") == 0) {
                digitalWrite(RED_LED, LOW);
            }
        }
    }
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        Serial.print(F("\nSending temp val : "));
        calcTempCeclious();
        Serial.println(Tc);
        lux = analogRead(illuminanceSensor);
        // To publish data -> Json
        StaticJsonDocument<256> data;
        String jsonStr;
        data["temp"] = Tc;
        data["illuminance"] = lux;
        serializeJson(data, jsonStr);

        if (!sensorData.publish(jsonStr.c_str())) {
            Serial.println(F("Data publish Failed"));
        } else {
            Serial.println(F("Data publish OK"));
        }
        if (!sensorData2.publish(jsonStr.c_str())) {
            Serial.println(F("Data2 publish Failed"));
        } else {
            Serial.println(F("Data2 publish OK"));
        }
    }
}

void loadConfig() {
    configFile = SPIFFS.open("/config.json", "r");
    StaticJsonDocument<256> doc;
    deserializeJson(doc, configFile);
    ssid = doc["ssid"].as<String>();
    password = doc["password"].as<String>();
    configFile.close();
}

void attemptWiFiConnection() {
    WiFi.begin(ssid.c_str(), password.c_str());
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        connectAttempt++;
        if (connectAttempt > 10) {
            startAP();
            serveInitialConfigPage();
            break;
        }
    }
    if (WiFi.status() == WL_CONNECTED) {
        oled.setLine(1, "WiFi connected");
        oled.display();
    }
}

void startAP() {
    WiFi.mode(WIFI_AP);
    // 여기서 지정된 IP 주소, 게이트웨이 및 서브넷 마스크를 사용하여 AP IP를
    // 설정합니다.
    if (!WiFi.softAPConfig(local_IP, gateway, subnet)) {
        Serial.println("AP IP 설정에 실패했습니다.");
    }

    WiFi.softAP(AP_SSID, AP_PASSWORD);

    oled.setLine(1, "change WiFi to");
    oled.setLine(2, "arduinoAP");
    oled.setLine(3, "192.168.4.1");
    oled.display();
};

void serveInitialConfigPage() {
    server.on("/saveConfig", HTTP_POST, saveConfigHandler);

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (!SPIFFS.exists("/index.html")) {
            request->send(404);
        } else {
            request->send(SPIFFS, "/index.html", "text/html");
        }
    });

    server.begin();
}

void saveConfigHandler(AsyncWebServerRequest *request) {
    if (request->hasParam("ssid", true) &&
        request->hasParam("password", true)) {
        String ssid = request->getParam("ssid", true)->value();
        String password = request->getParam("password", true)->value();

        StaticJsonDocument<256> doc;
        doc["ssid"] = ssid;
        doc["password"] = password;

        configFile = SPIFFS.open("/config.json", "w");
        if (serializeJson(doc, configFile) == 0) {
            Serial.println("Failed to write config file");
            request->send(500);
        } else {
            request->send(200);
            configFile.close();
            delay(1000);
            ESP.restart();
        }
    } else {
        request->send(400);
    }
}

// Function to connect and reconnect as necessary to the MQTT server.
// Should be called in the loop function and it will take care if connecting.
void MQTT_connect() {
    int8_t ret;
    if (mqtt.connected()) {
        return;
    }

    Serial.println("Connecting to MQTT");
    uint8_t retries = 3;

    while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
        switch (ret) {
        case 1:
            Serial.println(F("Wrong protocol"));
            break;
        case 2:
            Serial.println(F("ID rejected"));
            break;
        case 3:
            Serial.println(F("Server unavail"));
            break;
        case 4:
            Serial.println(F("Bad user/pass"));
            break;

        case 5:
            Serial.println(F("Not authed"));
            break;
        case 6:
            Serial.println(F("Failed to subscribe"));
            break;
        default:
            Serial.println(F("Connection failed"));
            break;
        }
        Serial.println(mqtt.connectErrorString(ret));
        Serial.println("Retrying MQTT connection in 5 seconds");
        mqtt.disconnect();
        delay(5000);
        retries--;
        if (retries == 0) {
            // basically die and wait for WDT to reset me
            while (1) {
                oled.setLine(2, "please push");
                oled.setLine(3, "reset button");
                oled.display();
            }
        }
    }
    Serial.println("MQTT Connected!");
}

void calcTempCeclious() {
    Vo = analogRead(tempSensor); // read from temp sensing value
    R2 = R1 * (4095.0 / (float)Vo - 1.0);
    logR2 = log(R2);
    T = (1.0 / (c1 + c2 * logR2 + c3 * logR2 * logR2 * logR2));
    Tc = T - 273.15; // celsius
}
