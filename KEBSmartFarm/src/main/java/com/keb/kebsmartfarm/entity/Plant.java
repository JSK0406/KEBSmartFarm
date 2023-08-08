package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantNum;
    @Column(unique = true)
    private String plantName;
    private String plantNickName;
    @Column(columnDefinition = "DATETIME")
    private String plantRegDate;

    @ManyToOne
    @JoinColumn(name = "plantKitNo")
    @JsonIgnore
    private ArduinoKit arduinoKit;

    @JsonIgnore
    @OneToOne(mappedBy = "plant", cascade = CascadeType.ALL)
    private PreviousPlant previousPlant;
}