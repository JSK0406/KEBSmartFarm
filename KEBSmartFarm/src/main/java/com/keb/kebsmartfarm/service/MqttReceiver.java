package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.config.JsonUtil;
import com.keb.kebsmartfarm.dto.SensorDataDto;
import com.keb.kebsmartfarm.entity.SensorData;
import com.keb.kebsmartfarm.repository.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.integration.annotation.MessageEndpoint;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.transaction.annotation.Transactional;

// 메시지 받아 처리할 클래스 지정
@MessageEndpoint
@RequiredArgsConstructor
public class MqttReceiver {

    private final SensorDataRepository sensorDataRepository;

    @Transactional
    public void handle(Message<?> msg) {
        String topic = (String) msg.getHeaders().get(MqttHeaders.RECEIVED_TOPIC);
        System.out.println("Topic : " + topic);
        System.out.println("Payload : " + msg.getPayload());
        saveSensorData(JsonUtil.fromJson((String) msg.getPayload(), SensorDataDto.class).toSensorData());
    }


    public void saveSensorData(SensorData sensorData) {
        this.sensorDataRepository.save(sensorData);
    }
}
