package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.ArduinoRequestDto;
import com.keb.kebsmartfarm.dto.ArduinoResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.ReleasedKit;
import com.keb.kebsmartfarm.repository.ArduinoKitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArduinoKitService {
    private final ArduinoKitRepository arduinoKitRepository;
    public ArduinoResponseDto createArduinoKit(ArduinoRequestDto requestDto, ReleasedKit releasedKit){
        ArduinoKit arduinoKit = kitRegistered(requestDto);
        arduinoKit.setReleasedKit(releasedKit);
        return ArduinoResponseDto.of(arduinoKitRepository.save(arduinoKit));
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

    @Transactional
    public void deleteKit(long kitNo){
        ArduinoKit arduinoKit = arduinoKitRepository.findById(kitNo)
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 키트입니다."));
        // 관계를 끊습니다.
        ReleasedKit releasedKit = arduinoKit.getReleasedKit();
        releasedKit.setArduinoKit(null);
        arduinoKit.setReleasedKit(null);

        // 삭제를 수행합니다.
        arduinoKitRepository.delete(arduinoKit);
    }

    public ArduinoKit findKitByKitNo(long kitNo){
        return arduinoKitRepository.findById(kitNo)
                .orElseThrow(() -> new IllegalStateException("등록되지 않은 키트입니다."));
    }

    public List<ArduinoKit> getMyArduinoKits(long userSeqNum){
        return arduinoKitRepository.findArduinoKitsByUserSeqNum(userSeqNum);
    }
}
