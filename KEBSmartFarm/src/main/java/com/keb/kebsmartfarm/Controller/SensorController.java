package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.entity.ReleasedKit;
import com.keb.kebsmartfarm.service.ReleasedKitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/sensor")
@RestController
@RequiredArgsConstructor
public class SensorController {

    private final ReleasedKitService releasedKitService;


    @PostMapping("/certificate")
    public ResponseEntity<Long> certificateKit(@RequestBody String serialNumber) {
        ReleasedKit releasedKit = releasedKitService.validateKitSerialNumber(serialNumber)
                .orElseThrow(() -> new IllegalStateException("해당 키드가 존재하지 않습니다."));
        return ResponseEntity.ok(releasedKit.getReleaseNum());
    }
}
