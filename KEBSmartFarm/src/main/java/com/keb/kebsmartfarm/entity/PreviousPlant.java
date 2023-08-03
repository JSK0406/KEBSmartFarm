package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreviousPlant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RegNo;

    @ManyToOne
    @JoinColumn(name = "userSeqNum")
    private User user;

    @OneToOne
    @JoinColumn(name = "plant")
    private Plant plant;

    @Column(columnDefinition = "DATETIME")
    private String plantHarvestDate;
}
