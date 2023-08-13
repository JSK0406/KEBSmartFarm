package com.keb.kebsmartfarm.config;

import jakarta.annotation.PreDestroy;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {
    private final String HOST = "io.adafruit.com";
    private final int PORT = 1883;
    private final String USERNAME;

    private final String PASSWORD;

    private final MqttClient mqttClient;

    public MqttConfig(@Value("${Adafruit.username}") String username, @Value("${Adafruit.password}") String password) throws MqttException {
        this.USERNAME = username;
        this.PASSWORD = password;
        // persistence type 보내줘야 .lck 파일 생성하지 않음.
        this.mqttClient = new MqttClient(String.format("tcp://%s:%d", HOST, PORT), MqttClient.generateClientId(), new MemoryPersistence());
        mqttClient.connect(getMQTTConnectOptions());
    }

    private MqttConnectOptions getMQTTConnectOptions() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(USERNAME);
        options.setPassword(PASSWORD.toCharArray());
        options.setCleanSession(true);
        return options;
    }

    @Bean
    public MqttClient mqttClient() {
        return mqttClient;
    }

    @PreDestroy
    public void destroy() throws MqttException {
        mqttClient().disconnect();
        mqttClient().close();
    }
}
