package com.keb.kebsmartfarm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CommandDto {
    private String command;

    @JsonProperty("switch")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String switchStatus;


    public static CommandDto of(String command, String status) {
        return CommandDto.builder()
                .command(command)
                .switchStatus(status)
                .build();
    }
}
