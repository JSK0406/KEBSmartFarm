package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class SensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "kitNo", referencedColumnName = "kitNo", updatable = false, insertable = false)
    private ArduinoKit kit;

    @Column(name = "kitNo")
    private Long arduinoKitNo;

    private Double humidity;
    private Double temp;
    private int illuminance;
    private int soilMoisture;

    @Temporal(TemporalType.TIMESTAMP)
    private Date receivedDate;

}
