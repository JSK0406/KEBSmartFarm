package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.Plant;
import com.keb.kebsmartfarm.entity.PreviousPlant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreviousPlantDto {
    private long plantRegNo;
    private Plant plant;
    private Date plantHarvestDate;


    public static PreviousPlantDto of(PreviousPlant previousPlant) {
        return PreviousPlantDto.builder()
                .plant(previousPlant.getPlant())
                .plantRegNo(previousPlant.getRegNo())
                .plantHarvestDate(previousPlant.getPlantHarvestDate())
                .build();
    }
}
