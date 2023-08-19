package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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
    private LocalDateTime wateringDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private Plant plantNum;
}
