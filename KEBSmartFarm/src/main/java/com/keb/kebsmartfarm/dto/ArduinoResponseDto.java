package com.keb.kebsmartfarm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ArduinoResponseDto {
    private String kitSerialNum;
    private String kitDeviceName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Plant plant;
    private String date;

    public static ArduinoResponseDto of(ArduinoKit arduinoKit) {
        return ArduinoResponseDto.builder()
                .kitSerialNum(arduinoKit.getSerialNum())
                .kitDeviceName(arduinoKit.getDeviceName())
                .date(arduinoKit.getDate())
                .plant(arduinoKit.getActivePlant())
                .build();
    }

    public static List<ArduinoResponseDto> ofList(List<ArduinoKit> arduinoKitList) {
        return arduinoKitList.stream().map(ArduinoResponseDto::of).collect(Collectors.toList());
    }
}
