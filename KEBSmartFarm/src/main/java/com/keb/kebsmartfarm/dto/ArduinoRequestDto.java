package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.PreviousPlant;
import com.keb.kebsmartfarm.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArduinoRequestDto {
    private String userSeqNum;
    private String serialNum;
    private String date;
    private String deviceName;
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @Builder
    public ArduinoKit toArduinoKit() {
        return ArduinoKit.builder()
                .serialNum(getSerialNum())
                .date(simpleDateFormat.format(new Date()))
                .user(User.builder().userSeqNum(SecurityUtil.getCurrentUserId()).build())
                .deviceName(getDeviceName())
                // 일단 임시로 NPE 생기지 않도록 조치함
                .PlantList(new ArrayList<>())
                .build();
    }
}
