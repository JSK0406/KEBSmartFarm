package com.keb.kebsmartfarm.dto;

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
    private Long kitNo;
    private String date;

    @Builder
    public ArduinoKit toArduinoKit() {
        return ArduinoKit.builder()
                .kitNo(getKitNo())
                .serialNum(getSerialNum())
                .date(SimpleDateFormat.getDateInstance().format(new Date()))
                .user(User.builder().userSeqNum(Long.valueOf(getUserSeqNum())).build())
                // 일단 임시로 NPE 생기지 않도록 조치함
                .PlantList(new ArrayList<>())
                .build();
    }
}
