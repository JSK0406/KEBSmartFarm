package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MemberSeqNum")
    private User user;
}
