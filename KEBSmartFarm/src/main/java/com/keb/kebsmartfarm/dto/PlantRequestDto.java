package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlantRequestDto {
    private String plantName;
    private String plantNickName;
    private ArduinoKit arduinoKit;
    private MultipartFile file;
    private Path storedPath;
    // 추후 Plant에 파일 이름과 파일 저장 위치 넣어줘야함.

    public Plant toPlant(ArduinoKit arduinoKit) {
        return Plant.builder()
                .plantName(getPlantName())
                .plantNickName(getPlantNickName())
                .arduinoKit(arduinoKit)
                .plantRegDate(LocalDateTime.now())
                .orgFileName(file.getOriginalFilename())
                .storedFilePath(storedPath.toString())
                .build();
    }

    // 저장하고 주입
    public void setStoredPath(Path storedPath) {
        this.storedPath = storedPath;
    }
}
