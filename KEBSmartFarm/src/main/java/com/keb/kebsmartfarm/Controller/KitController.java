package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.service.KitAndPlantManageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/kit")
@RestController
@RequiredArgsConstructor
public class KitController {

    private final KitAndPlantManageService kitAndPlantManageService;

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateKit(@RequestBody String serialNum){
        return ResponseEntity.ok(kitAndPlantManageService.validateKit(serialNum));
    }

    @PostMapping
    public ResponseEntity<ArduinoResponseDto> addKit(@RequestBody ArduinoRequestDto requestDto) {
        return ResponseEntity.ok(kitAndPlantManageService.addKit(requestDto));
    }

    @DeleteMapping("/{kitNo}")
    public ResponseEntity<?> deleteKit(@PathVariable long kitNo) {
        kitAndPlantManageService.deleteKit(kitNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/{kitNo}/plant")
    public ResponseEntity<PlantResponseDto> addPlantToKit(@PathVariable long kitNo, @RequestBody PlantRequestDto plantRequestDto) {
        return ResponseEntity.ok(kitAndPlantManageService.plantingPlant(kitNo, plantRequestDto));
    }

    @PostMapping("/{kitNo}/growth")
    public ResponseEntity<PreviousPlantDto> moveToPreviousPlant(@PathVariable long kitNo) {
        return ResponseEntity.ok(kitAndPlantManageService.completingPlantGrowth(kitNo));
    }

    @DeleteMapping("/{kitNo}/plant")
    public ResponseEntity<?> deletePlant(@PathVariable long kitNo) {
        kitAndPlantManageService.deletingPlant(kitNo);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/plantList")
    public ResponseEntity<Map<String, Object>> getUserPlantList() {
        return ResponseEntity.ok(kitAndPlantManageService.gettingListOfUsersPlant());
    }

    @GetMapping("/{kitNo}/light")
    public ResponseEntity<Boolean> lightKit(@PathVariable long kitNo){
        return ResponseEntity.ok(kitAndPlantManageService.controlLight(kitNo));
    }

}
