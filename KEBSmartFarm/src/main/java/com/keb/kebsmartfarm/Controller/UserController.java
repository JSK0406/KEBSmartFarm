package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.service.ArduinoKitService;
import com.keb.kebsmartfarm.service.SendMailService;
import com.keb.kebsmartfarm.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final ArduinoKitService arduinoKitService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMyUserInfo() {
        Map<String, Object> resp = new HashMap<>();
        UserResponseDto myInfoSecurity = userService.getMyInfoBySecurity();
        List<ArduinoResponseDto> kits = arduinoKitService.findKits();

        resp.put("user", myInfoSecurity);
        resp.put("kits", kits);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/nickname")
    public ResponseEntity<UserResponseDto> setUserNickname(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.changeUserNickname(userRequestDto.getUserPassword(), userRequestDto.getUserNickname()));
    }

    @PostMapping("/password")
    public ResponseEntity<UserResponseDto> setUserPassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return ResponseEntity.ok(userService.changeUserPassword(changePasswordDto.getExPassword(), changePasswordDto.getNewPassword()));
    }

    @PostMapping("/kit/add")
    public ResponseEntity<ArduinoKit> createArduino(@RequestBody ArduinoKit arduinoKit) {
        return ResponseEntity.ok(arduinoKitService.addKit(arduinoKit));
    }


}


