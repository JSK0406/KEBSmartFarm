package com.keb.kebsmartfarm.service;

import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MqttSubscriber {
    private final MqttClient mqttClient;
    private final String USERNAME;

    @Autowired
    public MqttSubscriber(MqttClient mqttClient, @Value("${Adafruit.username}") String username) {
        this.mqttClient = mqttClient;
        this.USERNAME = username;
    }

    @PostConstruct
    public void subscribe() {
        try {
            String topic = String.format("%s/groups/+/feeds", USERNAME);

            mqttClient.subscribe(topic, (topic1, message) -> {
                String payload = new String(message.getPayload());
                System.out.println("Received message on topic " + topic + ": " + payload);
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
