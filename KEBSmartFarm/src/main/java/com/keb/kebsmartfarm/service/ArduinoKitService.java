package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.dto.ArduinoResponseDto;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.repository.ArudinoKitRepository;
import com.keb.kebsmartfarm.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArduinoKitService {
    private ArudinoKitRepository arduinoKitRepository;

    public ArduinoKit addKit(ArduinoKit arduinoKit) {
        return arduinoKitRepository.save(arduinoKit);
    }

    public List<ArduinoResponseDto> findKits(){
        return arduinoKitRepository.findAllByUserId(SecurityUtil.getCurrentUserId()).stream()
                .map(ArduinoResponseDto::of)
                .toList();
    }
}
