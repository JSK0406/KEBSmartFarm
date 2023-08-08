package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviousPlantDto {
    private long plantRegNo;
    private Plant plant;
    private String plantHarvestDate;

    public PreviousPlantDto of(Plant plant) {
        return PreviousPlantDto.builder()
                .plantRegNo(getPlantRegNo())
                .plantHarvestDate(getPlantHarvestDate())
                .plant(getPlant())
                .build();
    }
}
