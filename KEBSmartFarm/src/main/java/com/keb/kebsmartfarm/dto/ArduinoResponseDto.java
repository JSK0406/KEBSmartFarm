package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArduinoResponseDto {
    private String kitSerialNum;
    private String kitDeviceName;

    public static ArduinoResponseDto of(ArduinoKit arduinoKit) {
        return ArduinoResponseDto.builder()
                .kitSerialNum(arduinoKit.getSerialNum())
                .kitDeviceName(arduinoKit.getDeviceName())
                .build();
    }
}
