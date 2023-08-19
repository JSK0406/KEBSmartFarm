package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.PlantPictureRequestDto;
import com.keb.kebsmartfarm.entity.PlantPicture;
import com.keb.kebsmartfarm.repository.PlantPictureRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;

@Slf4j
@Service
public class PlantPictureServiceImpl implements PlantPictureService {

    private final Path rootLocation;
    private final PlantPictureRepository plantPictureRepository;

    private final SimpleDateFormat simpleDateFormat;

    @Autowired
    public PlantPictureServiceImpl(PlantPictureRepository plantPictureRepository) {
        this.rootLocation = Paths.get("src", "main", "resources", "pictures");
        this.plantPictureRepository = plantPictureRepository;
        this.simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }


    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void store(PlantPictureRequestDto plantPictureDto) {
        MultipartFile file = plantPictureDto.getFile();
        if (file.isEmpty()) {
            throw new IllegalStateException("빈 파일은 저장할 수 없습니다.");
        }

        String contentType = file.getContentType();
        if (!(contentType.contains("image/jpeg") || contentType.contains("image/png") || contentType.contains("image/gif")))
            throw new IllegalStateException("이미지 파일이 아닙니다.");

        try {
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(simpleDateFormat.format(new Date()) + "-" + UUID.randomUUID() + "-" + file.getOriginalFilename()))
                    .normalize().toAbsolutePath();

            log.info(destinationFile.toString());

            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new IllegalStateException("파일은 현재 디렉토리 바깥에 저장될 수 없습니다.");
            }
            file.transferTo(destinationFile);
            plantPictureRepository.save(plantPictureDto.toPlantPicture(destinationFile));
        } catch (IOException e) {
            throw new IllegalStateException("파일 저장에 실패했습니다.", e);
        }
    }

    @Override
    @Transactional
    public Stream<Path> loadAllByPlantNum(Long plantNum) {
        return this.plantPictureRepository.findAllByPlantNumOrderByDateDesc(plantNum)
                .stream().map(PlantPicture::getStoredFilePath).map(Paths::get);
    }

    @Override
    public Path load(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
}
