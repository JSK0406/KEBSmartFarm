package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.PlantPictureRequestDto;
import org.springframework.core.io.Resource;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface PlantPictureService {

    void init();

    void store(PlantPictureRequestDto plantPictureDto);

    Stream<Path> loadAllByPlantNum(Long plantNum);

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
