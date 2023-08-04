package com.keb.kebsmartfarm.dto;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import com.keb.kebsmartfarm.entity.PreviousPlant;
import com.keb.kebsmartfarm.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String userId;
    private String userNickname;
    private List<ArduinoResponseDto> userKitList;
    public static UserResponseDto of(User user) {
        return UserResponseDto.builder()
                .userId(user.getUserId())
                .userNickname(user.getUserNickname())
                .userKitList(ArduinoResponseDto.ofList(user.getArduinoKitList()))
                .build();
    }
}