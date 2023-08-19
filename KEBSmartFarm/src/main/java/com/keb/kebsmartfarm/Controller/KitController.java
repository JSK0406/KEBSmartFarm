package com.keb.kebsmartfarm.Controller;

import com.keb.kebsmartfarm.dto.*;
import com.keb.kebsmartfarm.service.KitAndPlantManageService;
import com.keb.kebsmartfarm.service.PlantPictureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@RequestMapping("/kit")
@RestController
@RequiredArgsConstructor
public class KitController {

    private final KitAndPlantManageService kitAndPlantManageService;
    private final PlantPictureService plantPictureService;

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateKit(@RequestBody Map<String, String> req) {
        String serialNum = req.get("serialNum");
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

    @GetMapping("/plant/list")
    public ResponseEntity<Map<String, Object>> getUserPlantList() {
        return ResponseEntity.ok(kitAndPlantManageService.gettingListOfUsersPlant());
    }

    @GetMapping("/{kitNo}/light")
    public ResponseEntity<Boolean> lightKit(@PathVariable long kitNo) {
        return ResponseEntity.ok(kitAndPlantManageService.controlLight(kitNo));

    }

    @PostMapping("/plant/{plantNo}/picture")
    public ResponseEntity<?> addDiary(@PathVariable long plantNo,
                                      @RequestParam("file") MultipartFile file,
                                      @RequestParam("msg") String msg) {
        PlantPictureRequestDto requestDto = PlantPictureRequestDto.builder()
                .plantNum(plantNo)
                .file(file)
                .msg(msg).build();
        plantPictureService.store(requestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/plant/{plantNo}/pictures")
    public ResponseEntity<List<String>> getListOfPicturesByPlantNum(@PathVariable long plantNo) {
        Stream<Path> pathStream = plantPictureService.loadAllByPlantNum(plantNo);

        List<String> resourceList = pathStream.flatMap(path -> {
            try {
                String url = path.toUri().toURL().toString();
                return Stream.of(url);
            } catch (MalformedURLException e) {
                throw new RuntimeException(e);
            }
        }).toList();
        if (resourceList.isEmpty()) return ResponseEntity.noContent().build();
        else return ResponseEntity.ok().body(resourceList);
    }


    @GetMapping("/{kitNo}/details")
    public ResponseEntity<SensorDataDto> getListOfSensorData(@PathVariable long kitNo, @RequestParam("regDate") String regDate) throws ParseException {
        // kitNo랑 regDate 받아오고
        // regDate 이후 데이터 중 최근 데이터 받아오기
        // orderBy desc -> 하나!
        return ResponseEntity.ok(kitAndPlantManageService.getLatestData(kitNo, regDate));
    }
}
