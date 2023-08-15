package com.keb.kebsmartfarm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.keb.kebsmartfarm.dto.SensorDataDto;
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

    private final ObjectMapper objectMapper;

    @Autowired
    public MqttSubscriber(MqttClient mqttClient, @Value("${Adafruit.username}") String username, ObjectMapper objectMapper) {
        this.mqttClient = mqttClient;
        this.USERNAME = username;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void subscribe() {
        try {
            String topic = String.format("%s/feeds/data", USERNAME);

            mqttClient.subscribe(topic, (topic1, message) -> {
                String payload = new String(message.getPayload());
                SensorDataDto sensorDataDto = objectMapper.readValue(payload, SensorDataDto.class);
                System.out.println(sensorDataDto);
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
