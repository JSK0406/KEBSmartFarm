package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.TokenDto;
import com.keb.kebsmartfarm.dto.UserRequestDto;
import com.keb.kebsmartfarm.dto.UserResponseDto;
import com.keb.kebsmartfarm.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @RequestMapping(value = "/join", method = RequestMethod.POST)
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto userRequestDto) {

        return ResponseEntity.ok(authService.signup(userRequestDto));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.login(userRequestDto));
    }
}