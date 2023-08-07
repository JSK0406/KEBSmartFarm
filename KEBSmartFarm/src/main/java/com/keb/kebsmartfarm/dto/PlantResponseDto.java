package com.keb.kebsmartfarm.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlantResponseDto {
    private Long plantNum;
    private String plantName;
    @JsonIgnore
    private ArduinoKit arduinoKit;
    private String plantRegDate;
    public static PlantResponseDto of(Plant plant) {
        return PlantResponseDto.builder()
                .plantName(plant.getPlantName())
                .plantNum(plant.getPlantNum())
                .arduinoKit(plant.getArduinoKit())
                .plantRegDate(plant.getPlantRegDate())
                .build();
    }
}
