package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.ArduinoRequestDto;
import com.keb.kebsmartfarm.dto.ArduinoResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.repository.ArduinoKitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArduinoKitService {
    private final ArduinoKitRepository arduinoKitRepository;
    public ArduinoResponseDto createArduinoKit(ArduinoRequestDto requestDto){
        isKitRegistered(requestDto);
        return ArduinoResponseDto.of(arduinoKitRepository.save(requestDto.toArduinoKit()));
    }

    private void isKitRegistered(ArduinoRequestDto requestDto) {
        if(arduinoKitRepository.existsArduinoKitBySerialNum(requestDto.getSerialNum())){
            throw new IllegalStateException("이미 등록된 키트입니다.");
        }
    }

    public ArduinoResponseDto deleteKit(Long kitNo){
        ArduinoKit arduinoKit = arduinoKitRepository.findById(kitNo)
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 키트입니다."));
        arduinoKitRepository.delete(arduinoKit);
        return ArduinoResponseDto.of(arduinoKit);
    }
}
