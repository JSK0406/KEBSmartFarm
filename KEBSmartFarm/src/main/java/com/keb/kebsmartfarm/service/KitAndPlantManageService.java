package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.PlantWatering;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface KitAndPlantManageService {
    public ArduinoResponseDto addKit(ArduinoRequestDto requestDto);

    public void deleteKit(long kitNo);

    public PlantResponseDto plantingPlant(long kitNo, PlantRequestDto plantRequestDto);

    public PreviousPlantDto completingPlantGrowth(long kitNo);

    public void deletingPlant(long kitNo);

    public Map<String, Object> gettingListOfUsersPlant();

    public boolean controlLight(long kitNo);

    public Map<String, LocalDateTime> supplyWater(long kitNo);

    public boolean validateKit(String serialNum);

    public Map<String, Object> getLatestDataList(long kitNo, String regDate);

}
