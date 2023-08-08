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
        return ArduinoResponseDto.of(arduinoKitRepository.save(kitRegistered(requestDto)));
    }

    public ArduinoKit kitRegistered(ArduinoRequestDto requestDto) {
        // 조회한 다음 있으면 중복이므로 오류 발생
        arduinoKitRepository.findBySerialNum(requestDto.getSerialNum())
                .ifPresent(arduinoKit -> {
                    throw new IllegalStateException("이미 등록된 키트입니다.");
                });
        // 없으면 정상 키트 반환
        return requestDto.toArduinoKit();
    }

    public void deleteKit(long kitNo){
        ArduinoKit arduinoKit = arduinoKitRepository.findById(kitNo)
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 키트입니다."));
        arduinoKitRepository.delete(arduinoKit);
    }

    public ArduinoKit findKitByKitNo(long kitNo){
        return arduinoKitRepository.findById(kitNo)
                .orElseThrow(() -> new IllegalStateException("등록되지 않은 키트입니다."));
    }

}
