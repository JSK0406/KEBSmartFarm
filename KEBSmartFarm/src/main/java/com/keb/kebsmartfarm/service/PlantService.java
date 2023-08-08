package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.dto.PlantRequestDto;
import com.keb.kebsmartfarm.dto.PlantResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import com.keb.kebsmartfarm.entity.PreviousPlant;
import com.keb.kebsmartfarm.entity.User;
import com.keb.kebsmartfarm.repository.PlantRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
@Slf4j
@Service
@AllArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final Date date = new Date();
    @Transactional
    public PlantResponseDto createPlant(ArduinoKit arduinoKit, PlantRequestDto requestDto) {
        // 키트에 이미 키우는 식물이 있으면 오류 반환
        arduinoKit.getActivePlant().
                ifPresent(plant -> {throw new IllegalStateException("이미 식물이 등록된 키트입니다.");});
        // 없으면 식물 추가 가능
        return PlantResponseDto.of(plantRepository.save(requestDto.toPlant(arduinoKit)));
    }


    @Transactional
    public void deletePlant(ArduinoKit arduinoKit) {
        Plant plant = arduinoKit.getActivePlant()
                //없으면 오류
                .orElseThrow(() -> new IllegalStateException("식물이 등록되지 않았습니다."));
        // 삭제 시 반드시 연관관계 해제가 필요
        arduinoKit.getPlantList().remove(plant);
        log.info(plant.toString());
        plantRepository.delete(plant);
    }

    public static PreviousPlant toPreviousPlant(Plant plant) {
        return PreviousPlant.builder()
                .user(User.builder().userSeqNum(SecurityUtil.getCurrentUserId()).build())
                .plant(plant)
                .plantHarvestDate(dateFormat.format(date))
                .build();
    }

}
