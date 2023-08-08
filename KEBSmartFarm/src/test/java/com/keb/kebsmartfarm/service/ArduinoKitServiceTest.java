package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.ArduinoRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ArduinoKitServiceTest {


    @Autowired
    private  ArduinoKitService arduinoKitService;
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat();

    @Test
    @DisplayName("키트 생성")
    void 키트_생성() {
        //given
        ArduinoRequestDto ar =
                new ArduinoRequestDto(null, "69992C00-FDBF-4564-B599-36D271F8634A",
                null, "생성 테스트", simpleDateFormat);

        //when
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> arduinoKitService.createArduinoKit(ar));

        //then
        assertThat(e.getMessage()).isEqualTo("이미 등록된 키트입니다.");
    }


    @Test
    @DisplayName("키트 삭제")
    void 키트_삭제() {
        //given

        //when

        //then
    }
}