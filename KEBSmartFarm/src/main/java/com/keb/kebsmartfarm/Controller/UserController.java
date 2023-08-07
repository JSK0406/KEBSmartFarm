package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.service.ArduinoKitService;
import com.keb.kebsmartfarm.service.ReleasedKitService;
import com.keb.kebsmartfarm.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ArduinoKitService arduinoKitService;
    private final ReleasedKitService releasedKitService;
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
    public ResponseEntity<ArduinoResponseDto> deleteKit(@PathVariable long kitNo) {
        // Kit가 없으면 204 띄움
        return ResponseEntity.ok(arduinoKitService.deleteKit(kitNo));
    }

}


