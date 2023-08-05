package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.ArduinoRequestDto;
import com.keb.kebsmartfarm.dto.ArduinoResponseDto;
import com.keb.kebsmartfarm.entity.User;
import com.keb.kebsmartfarm.repository.ArduinoKitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArduinoKitService {
    private final ArduinoKitRepository arduinoKitRepository;
    public ArduinoResponseDto createArduinoKit(ArduinoRequestDto requestDto){
        if(arduinoKitRepository.existsArduinoKitBySerialNum(requestDto.getSerialNum())){
            throw new RuntimeException("이미 등록된 키트입니다.");
        }
        return ArduinoResponseDto.of(arduinoKitRepository.save(requestDto.toArduinoKit()));
    }
}
