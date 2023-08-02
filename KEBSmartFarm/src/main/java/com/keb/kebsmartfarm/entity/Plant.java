package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantNum;
    private String plantName;
    @Column(columnDefinition = "DATETIME")
    private String plantRegDate;

    @ManyToOne
    @JoinColumn(name = "kitNo")
    @JsonIgnore
    private ArduinoKit arduinoKit;

    @OneToOne(mappedBy = "plant")
    private PreviousPlant previousPlant;
}