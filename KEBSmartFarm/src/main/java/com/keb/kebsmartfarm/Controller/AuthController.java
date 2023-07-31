package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.MailDto;
import com.keb.kebsmartfarm.dto.TokenDto;
import com.keb.kebsmartfarm.dto.UserRequestDto;
import com.keb.kebsmartfarm.dto.UserResponseDto;
import com.keb.kebsmartfarm.service.AuthService;
import com.keb.kebsmartfarm.service.SendMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final SendMailService sendMailService;

    @RequestMapping(value = "/join", method = RequestMethod.POST)
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto userRequestDto) {

        return ResponseEntity.ok(authService.signup(userRequestDto));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.login(userRequestDto));
    }

    @PostMapping("/findPw")
    public ResponseEntity<Boolean> findUserPassword(@RequestBody UserRequestDto request) {
        return ResponseEntity.ok(authService.findUserPasswordByUserNameAndUserEmail(request.getUserEmail(), request.getUserId()));
    }

    @PostMapping("/findPw/sendEmail")
    public void sendEmail(@RequestBody UserRequestDto request) {
        MailDto mailDto = sendMailService.createMailAndChangePassword(request.getUserEmail(), request.getUserId());
        sendMailService.mailSend(mailDto);
    }
}