package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ArduinoKit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kitNo;
    private String deviceName;
    private String serialNum;
    private String userId;
    private String date;

}
