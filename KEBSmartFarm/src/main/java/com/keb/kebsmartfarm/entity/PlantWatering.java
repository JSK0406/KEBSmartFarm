package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlantWatering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wateringNo;

    @Column(columnDefinition = "datetime")
    private String wateringDate;

    @ManyToOne(cascade = CascadeType.ALL)
    private Plant plantNum;
}
