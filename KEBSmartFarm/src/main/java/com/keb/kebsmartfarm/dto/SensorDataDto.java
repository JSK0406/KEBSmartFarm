package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.SensorData;
import lombok.*;

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

    public SensorData toSensorData() {
        return SensorData.builder()
                .arduinoKitNo(getKitNo())
                .temp(getTemp())
                .illuminance(getIlluminance())
                .build();
    }
}
