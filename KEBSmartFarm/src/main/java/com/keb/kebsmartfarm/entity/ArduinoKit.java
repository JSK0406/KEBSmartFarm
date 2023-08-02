package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
public class ArduinoKit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kitNo;
    private String deviceName;
    private String serialNum;
    @Column(columnDefinition = "DATETIME")
    private String date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MemberSeqNum")
    private User user;

    @OneToMany(mappedBy = "arduinoKit", cascade = CascadeType.ALL)
    private List<Plant> plant;
}
