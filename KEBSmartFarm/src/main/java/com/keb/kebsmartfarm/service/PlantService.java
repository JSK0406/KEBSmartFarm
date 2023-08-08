package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.PlantRequestDto;
import com.keb.kebsmartfarm.dto.PlantResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import com.keb.kebsmartfarm.repository.PlantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;

    @Transactional
    public PlantResponseDto createPlant(ArduinoKit arduinoKit, PlantRequestDto requestDto) {
        // 키트에 이미 키우는 식물이 있으면 오류 반환
        Optional.ofNullable(arduinoKit.getActivePlant()).
                ifPresent(plant -> {throw new IllegalStateException("이미 식물이 등록된 키트입니다.");});
        // 없으면 식물 추가 가능
        return PlantResponseDto.of(plantRepository.save(requestDto.toPlant(arduinoKit)));
    }

    public void deletePlant(ArduinoKit arduinoKit, PlantRequestDto requestDto) {
        plantRepository.delete(requestDto.toPlant(arduinoKit));
    }
}
