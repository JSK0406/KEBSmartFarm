#include "AdafruitIOConfig.h"
#include "oled_u8g2.h"
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <SPIFFS.h>
#include <WiFi.h>

// For transmissing Data
#define SERIAL_NUMBER "C4487DA4-0D4E-4036-A157-75095B6C0CAC"

// initial AP MODE
const char *AP_SSID = "kit_C4487DA4";
const char *AP_PASSWORD = "password";

OLED_U8G2 oled;
// Setting sensors
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
    Adafruit_MQTT_Publish(&mqtt, IO_USERNAME "/f/data/json");

// Setup a subscribing feeds
Adafruit_MQTT_Subscribe command =
    Adafruit_MQTT_Subscribe(&mqtt, IO_USERNAME "/f/" SERIAL_NUMBER "-command");
/************** Feeds *************/

// For subscription
StaticJsonDocument<256> cmdJson;
// To publish data
StaticJsonDocument<256> data;

AsyncWebServer server(80);
// For saving WiFi infos
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
void handleCommand(Adafruit_MQTT_Subscribe *);
void setup() {
    Serial.begin(115200);
    oled.setup();
    SPIFFS.begin(true);
    if (SPIFFS.exists("/config.json")) {
        loadConfig();
        attemptWiFiConnection();
        pinMode(RED_LED, OUTPUT); // Now can light LED
        Serial.println(WiFi.localIP());
        // Setup MQTT subscription for receiving command
        mqtt.subscribe(&command);
    } else {
        startAP();
        serveInitialConfigPage();
    }
}

void loop() {
    if (SPIFFS.exists("/config.json")) {
        MQTT_connect();
        Adafruit_MQTT_Subscribe *subs;

        if (subs = mqtt.readSubscription(5000)) {
            if (subs == &command) {
                handleCommand(subs);
            }
            cmdJson.clear();
        }
    }

    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;
        calcTempCeclious();
        lux = analogRead(illuminanceSensor);
        String jsonStr;
        data["serialNumber"] = SERIAL_NUMBER;
        data["temp"] = Tc;
        data["illuminance"] = lux;
        serializeJson(data, jsonStr);

        if (!sensorData.publish(jsonStr.c_str())) {
            Serial.println(F("Data publish Failed"));
        } else {
            Serial.println(F("Data publish OK"));
        }

        data.clear();
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
    // Set APIP to custom IP, GATEWAY, SUBNET
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
                oled.setLine(1, "");
                oled.setLine(2, "resetting...");
                oled.setLine(3, "");
                oled.display();
                ESP.restart();
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

void handleCommand(Adafruit_MQTT_Subscribe *subs) {
    deserializeJson(cmdJson, (char *)command.lastread);
    const char *cmd = cmdJson["command"];
    const char *switchState = cmdJson["switch"];

    if (strcmp(cmd, "switch") == 0) {
        if (strcmp(switchState, "ON") == 0) {
            Serial.println(F("LED ON"));
            digitalWrite(RED_LED, HIGH);
        } else if (strcmp(switchState, "OFF") == 0) {
            Serial.println(F("LED OFF"));
            digitalWrite(RED_LED, LOW);
        }
    } else if (strcmp(cmd, "delete") == 0) {
        Serial.println(F("Delete this kit"));
        oled.setup();
        SPIFFS.remove("/config.json");
        oled.setLine(1, "deleting");
        oled.setLine(2, "this Kit...");
        oled.display();
        ESP.restart();
    }
}