package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlantWatering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wateringNo;

    @Temporal(TemporalType.TIMESTAMP)
    private Date wateringDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private Plant plantNum;
}
