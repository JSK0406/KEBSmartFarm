package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.dto.*;

import java.util.Map;

public interface KitAndPlantManageService {
    public ArduinoResponseDto addKit(ArduinoRequestDto requestDto);

    public void deleteKit(long kitNo);

    public PlantResponseDto plantingPlant(long kitNo, PlantRequestDto plantRequestDto);

    public PreviousPlantDto completingPlantGrowth(long kitNo);

    public void deletingPlant(long kitNo);

    public Map<String, Object> gettingListOfUsersPlant();

    public boolean controlLight(long kitNo);

    public boolean validateKit(String serialNum);

    public SensorDataDto getLatestData(long kitNo, String regDate);
//    public List<>
}
