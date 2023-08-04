package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.config.SecurityUtil;
import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.User;
import com.keb.kebsmartfarm.service.ArduinoKitService;
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
    public ResponseEntity<ArduinoResponseDto> addArduinoKit(@RequestBody ArduinoRequestDto requestDto) {
        return ResponseEntity.ok(arduinoKitService.createArduinoKit(requestDto));
    }
}


