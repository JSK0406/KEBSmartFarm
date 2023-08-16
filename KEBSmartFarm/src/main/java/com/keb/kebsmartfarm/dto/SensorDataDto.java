package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.SensorData;
import lombok.*;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class SensorDataDto {
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
                .receivedDate(new Date())
                .illuminance(getIlluminance())
                .build();
    }
}
