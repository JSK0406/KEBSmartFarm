package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.ReleasedKit;
import com.keb.kebsmartfarm.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ArduinoKitService arduinoKitService;
    private final ReleasedKitService releasedKitService;
    private final PlantService plantService;
    private final PreviousPlantService previousPlantService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyUserInfo() {
        UserResponseDto myInfoSecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoSecurity);
    }

    @PostMapping("/nickname")
    public ResponseEntity<UserResponseDto> setUserNickname(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.changeUserNickname(userRequestDto.getUserPassword(), userRequestDto.getUserNickname()));
    }

    @PostMapping("/password")
    public ResponseEntity<UserResponseDto> setUserPassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return ResponseEntity.ok(userService.changeUserPassword(changePasswordDto.getExPassword(), changePasswordDto.getNewPassword()));
    }

    @PostMapping("/kit")
    public ResponseEntity<ArduinoResponseDto> addKit(@RequestBody ArduinoRequestDto requestDto) {

        ReleasedKit releasedKit = releasedKitService.validateKitSerialNumber(requestDto.getSerialNum()).orElseThrow(() -> new RuntimeException("존재하지 않는 시리얼 번호입니다."));

        return ResponseEntity.ok(arduinoKitService.createArduinoKit(requestDto, releasedKit));
    }

    @DeleteMapping("/kit/{kitNo}")
    public ResponseEntity<?> deleteKit(@PathVariable long kitNo) {
        // Kit가 없으면 204 띄움
        arduinoKitService.deleteKit(kitNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/kit/{kitNo}/plant")
    public ResponseEntity<PlantResponseDto> addPlantToKit(@PathVariable long kitNo, @RequestBody PlantRequestDto plantRequestDto) {
        // 없는 키트면 오류
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        return ResponseEntity.ok(plantService.createPlant(arduinoKit, plantRequestDto));
    }

    @PostMapping("/kit/{kitNo}/growth")
    public ResponseEntity<PreviousPlantDto> moveToPreviousPlant(@PathVariable long kitNo) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        return ResponseEntity.ok(previousPlantService.movePlantToPreviousPlant(arduinoKit));
    }

    @DeleteMapping("/kit/{kitNo}/plant")
    public ResponseEntity<?> deletePlant(@PathVariable long kitNo) {
        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
        // 삭제 서비스 수행
        plantService.deletePlant(arduinoKit);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/plantList")
    public ResponseEntity<Map<String, Object>> getUserPlantList() {
        Map<String, Object> res = new HashMap<>();
        // 키웠던 식물
        long seqNum = SecurityUtil.getCurrentUserId();
        res.put("previousPlant",previousPlantService.getPlantList(seqNum));
        // 키우는 식물
        List<PlantResponseDto> plants = arduinoKitService.getMyArduinoKits(seqNum).stream()
                .map(ArduinoKit::getActivePlant)
                .filter(Optional::isPresent)
                .flatMap(Optional::stream)
                .map(PlantResponseDto::of)
                .toList();
        res.put("plant", plants);
        return ResponseEntity.ok(res);
    }

}


