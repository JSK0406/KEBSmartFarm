package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.PreviousPlantDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import com.keb.kebsmartfarm.repository.PreviousPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreviousPlantService {
    private final PreviousPlantRepository previousPlantRepository;

    public PreviousPlantDto movePlantToPreviousPlant(ArduinoKit arduinoKit) {
        Plant plant = arduinoKit.getActivePlant()
                // 식물이 없으면 오류 발생
                .orElseThrow(() -> new IllegalStateException("식물이 존재하지 않습니다"));
        // 식물이 있으면 이전 식물로
        previousPlantRepository.save(PlantService.toPreviousPlant(plant));
        return new PreviousPlantDto().of(plant);
    }
}
