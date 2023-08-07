package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.PlantRequestDto;
import com.keb.kebsmartfarm.dto.PlantResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.repository.PlantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;

    @Transactional
    public PlantResponseDto createPlant(ArduinoKit arduinoKit, PlantRequestDto requestDto) {
        return PlantResponseDto.of(plantRepository.save(requestDto.toPlant(arduinoKit)));
    }
}
