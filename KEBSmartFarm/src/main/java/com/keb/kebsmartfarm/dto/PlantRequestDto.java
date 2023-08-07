package com.keb.kebsmartfarm.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlantRequestDto {
    private String plantName;
    private ArduinoKit arduinoKit;
    private String date;
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public Plant toPlant(ArduinoKit arduinoKit) {
        return Plant.builder()
                .plantName(getPlantName())
                .arduinoKit(arduinoKit)
                .plantRegDate(simpleDateFormat.format(new Date()))
                .build();
    }
}
