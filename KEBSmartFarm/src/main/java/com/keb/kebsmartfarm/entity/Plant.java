package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plantNum;
    private String plantName;
    @Column(unique = true)
    private String plantNickName;
    @Temporal(TemporalType.TIMESTAMP)
    private Date plantRegDate;

    @ManyToOne
    @JoinColumn(name = "plantKitNo")
    @JsonIgnore
    private ArduinoKit arduinoKit;

    @NotEmpty
    private String orgFileName;

    @NotEmpty
    private String storedFilePath;

    @JsonIgnore
    @OneToOne(mappedBy = "plant", cascade = CascadeType.ALL)
    private PreviousPlant previousPlant;
}