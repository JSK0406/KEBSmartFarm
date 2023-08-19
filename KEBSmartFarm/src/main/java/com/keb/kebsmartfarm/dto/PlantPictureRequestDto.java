package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.entity.PlantPicture;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PlantPictureRequestDto {
    private Long plantNum;
    private String msg;
    private MultipartFile file;

    public PlantPicture toPlantPicture(Path dest){
        return PlantPicture.builder().
                seqNum(SecurityUtil.getCurrentUserId())
                .plantNum(getPlantNum())
                .date(new Date())
                .orgFileName(file.getOriginalFilename())
                .storedFilePath(dest.toString())
                .msg(getMsg())
                .build();
    }
}
