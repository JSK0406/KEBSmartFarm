package com.keb.kebsmartfarm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.keb.kebsmartfarm.entity.SensorData;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class SensorDataDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String serialNumber;
    private Double temp;
    private int illuminance;
    private Long kitNo;
    private int soil_moisture;

    public SensorData toSensorData() {
        return SensorData.builder()
                .arduinoKitNo(getKitNo())
                .temp(getTemp())
                .humidity(0.0)
                .soilMoisture(getSoil_moisture())
                .receivedDate(LocalDateTime.now())
                .illuminance(getIlluminance())
                .build();
    }

    @Builder
    public static SensorDataDto of(SensorData sensorData) {
        return SensorDataDto.builder()
                .illuminance(sensorData.getIlluminance())
                .temp(sensorData.getTemp())
                .kitNo(sensorData.getArduinoKitNo())
                .soil_moisture(sensorData.getSoilMoisture())
                .build();
    }
}
