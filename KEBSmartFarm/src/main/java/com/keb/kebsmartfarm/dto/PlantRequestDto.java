package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlantRequestDto {
    private String plantName;
    private String plantNickName;
    private ArduinoKit arduinoKit;
    public Plant toPlant(ArduinoKit arduinoKit) {
        return Plant.builder()
                .plantName(getPlantName())
                .plantNickName(getPlantNickName())
                .arduinoKit(arduinoKit)
                .plantRegDate(LocalDateTime.now())
                .build();
    }

}
