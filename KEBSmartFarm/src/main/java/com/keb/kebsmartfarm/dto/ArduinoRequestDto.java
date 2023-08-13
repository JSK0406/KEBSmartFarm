package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArduinoRequestDto {
    private Long userSeqNum;
    private String serialNum;
    private String deviceName;
    public ArduinoKit toArduinoKit() {
        return ArduinoKit.builder()
                .serialNum(getSerialNum())
                // 문제
                .date(new Date())
                .userSeqNum(SecurityUtil.getCurrentUserId())
                .deviceName(getDeviceName())
                // 일단 임시로 NPE 생기지 않도록 조치함
                .PlantList(new ArrayList<>())
                .build();
    }

}
