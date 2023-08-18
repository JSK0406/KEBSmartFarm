package com.keb.kebsmartfarm.service;

import com.keb.kebsmartfarm.config.JsonUtil;
import com.keb.kebsmartfarm.config.MqttConfig;
import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.ReleasedKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class KitAndPlantManageServiceImpl implements KitAndPlantManageService {

    private final ArduinoKitService arduinoKitService;
    private final ReleasedKitService releasedKitService;

    private final MqttConfig.MyGateway myGateway;
    private final PlantService plantService;
    private final PreviousPlantService previousPlantService;

    private final String TOPIC;

    private final Map<String, String> COMMAND;
    @Override
    @Transactional
    public ArduinoResponseDto addKit(ArduinoRequestDto requestDto) {
        ReleasedKit releasedKit = releasedKitService.validateKitSerialNumber(requestDto.getSerialNum())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 시리얼 번호입니다."));
        // topic으로 등록 요청 고려
//        myGateway.sendToMqtt(JsonUtil.toJson(CommandDto.of("")));
        return arduinoKitService.createArduinoKit(requestDto, releasedKit);
    }

    @Autowired
    public KitAndPlantManageServiceImpl(ArduinoKitService arduinoKitService,
                                        ReleasedKitService releasedKitService,
                                        @Qualifier("mqttConfig.MyGateway") MqttConfig.MyGateway myGateway,
                                        PlantService plantService,
                                        PreviousPlantService previousPlantService,
                                        @Value("${Adafruit.username}") String username) {
        this.arduinoKitService = arduinoKitService;
        this.releasedKitService = releasedKitService;
        this.myGateway = myGateway;
        this.plantService = plantService;
        this.previousPlantService = previousPlantService;
        this.TOPIC = String.format("%s/f/", username);
        this.COMMAND = new HashMap<>();
        COMMAND.put("command", "");
    }

    @Override
    @Transactional
    public void deleteKit(long kitNo) {
        // Kit가 없으면 204 띄움
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        arduinoKitService.deleteKit(arduinoKit);
        // 지운 후 키트에 저장된 와이파이 정보 삭제
        COMMAND.replace("command", "delKit");
        myGateway.sendToMqtt(JsonUtil.toJson(COMMAND),
                arduinoKit.getSerialNum(), 2);
    }

    @Override
    @Transactional
    public PlantResponseDto plantingPlant(long kitNo, PlantRequestDto plantRequestDto) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        COMMAND.replace("command", "addPlant");
        myGateway.sendToMqtt(JsonUtil.toJson(COMMAND),
                TOPIC + arduinoKit.getSerialNum() + "-command", 2);
        return plantService.createPlant(arduinoKit, plantRequestDto);
    }

    @Override
    @Transactional
    public PreviousPlantDto completingPlantGrowth(long kitNo) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        COMMAND.replace("command", "growth");
        myGateway.sendToMqtt(JsonUtil.toJson(COMMAND),
                TOPIC + arduinoKit.getSerialNum() + "-command", 2);
        return previousPlantService.movePlantToPreviousPlant(arduinoKit);
    }

    @Override
    @Transactional
    public void deletingPlant(long kitNo) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        COMMAND.replace("command", "delPlant");
        myGateway.sendToMqtt(JsonUtil.toJson(COMMAND),
                TOPIC + arduinoKit.getSerialNum() + "-command", 2);
        plantService.deletePlant(arduinoKit);
    }

    @Override
    @Transactional
    public Map<String, Object> gettingListOfUsersPlant() {
        Map<String, Object> res = new HashMap<>();
        // 키웠던 식물
        long seqNum = SecurityUtil.getCurrentUserId();
        res.put("previousPlant", previousPlantService.getPlantList(seqNum));
        // 키우는 식물
        List<PlantResponseDto> plants = arduinoKitService.getMyArduinoKits(seqNum).stream()
                .map(ArduinoKit::getActivePlant)
                .filter(Optional::isPresent)
                .flatMap(Optional::stream)
                .map(PlantResponseDto::of)
                .toList();
        res.put("plant", plants);
        return res;
    }

    @Override
    public boolean controlLight(long kitNo) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        COMMAND.replace("command", "switch");
        myGateway.sendToMqtt(JsonUtil.toJson(COMMAND),
                TOPIC+arduinoKit.getSerialNum() + "-command");
        return true;
    }
}