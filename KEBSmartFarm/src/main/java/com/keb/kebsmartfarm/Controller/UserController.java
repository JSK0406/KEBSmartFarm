package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.service.ArduinoKitService;
import com.keb.kebsmartfarm.service.PlantService;
import com.keb.kebsmartfarm.service.ReleasedKitService;
import com.keb.kebsmartfarm.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ArduinoKitService arduinoKitService;
    private final ReleasedKitService releasedKitService;
    private final PlantService plantService;

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

        releasedKitService.validateKitSerialNumber(requestDto.getSerialNum()).orElseThrow(() -> new RuntimeException("존재하지 않는 시리얼 번호입니다."));
        return ResponseEntity.ok(arduinoKitService.createArduinoKit(requestDto));
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


//    @DeleteMapping("/kit/{kitNo}/plant/{plantNo}")
//    public ResponseEntity<PlantResponseDto> deletePlant(@PathVariable long kitNo, @PathVariable long plantNo) {
//        ArduinoKit arduinoKit = arduinoKitService.findKitByKitNo(kitNo);
//        return ResponseEntity.ok(null);
//    }

}


