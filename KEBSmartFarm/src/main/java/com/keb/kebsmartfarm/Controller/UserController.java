package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.service.KitAndPlantManageService;
import com.keb.kebsmartfarm.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final KitAndPlantManageService kitAndPlantManageService;

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
        return ResponseEntity.ok(kitAndPlantManageService.addKit(requestDto));
    }

    @DeleteMapping("/kit/{kitNo}")
    public ResponseEntity<?> deleteKit(@PathVariable long kitNo) {
        kitAndPlantManageService.deleteKit(kitNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/kit/{kitNo}/plant")
    public ResponseEntity<PlantResponseDto> addPlantToKit(@PathVariable long kitNo, @RequestBody PlantRequestDto plantRequestDto) {
        return ResponseEntity.ok(kitAndPlantManageService.plantingPlant(kitNo, plantRequestDto));
    }

    @PostMapping("/kit/{kitNo}/growth")
    public ResponseEntity<PreviousPlantDto> moveToPreviousPlant(@PathVariable long kitNo) {
        return ResponseEntity.ok(kitAndPlantManageService.completingPlantGrowth(kitNo));
    }

    @DeleteMapping("/kit/{kitNo}/plant")
    public ResponseEntity<?> deletePlant(@PathVariable long kitNo) {
        kitAndPlantManageService.deletingPlant(kitNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/plantList")
    public ResponseEntity<Map<String, Object>> getUserPlantList() {
        return ResponseEntity.ok(kitAndPlantManageService.gettingListOfUsersPlant());
    }

    @GetMapping("/kit/{kitNo}/light")
    public ResponseEntity<Boolean> lightKit(@PathVariable long kitNo){
        return ResponseEntity.ok(kitAndPlantManageService.controlLight(kitNo));
    }

}


