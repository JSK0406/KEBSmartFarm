package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArduinoKit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kitNo;
    private String deviceName;
    @Column(unique = true)
    private String serialNum;
    @Column(columnDefinition = "DATETIME")
    private String date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userSeqNum")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "arduinoKit", cascade = CascadeType.ALL)
    private List<Plant> PlantList;

    @Transient
    private Plant plant;

    public Plant getActivePlant() {
        for (Plant activePlant : PlantList) {
            if (activePlant.getPreviousPlant() == null) {
                return activePlant;
            }
        }
        return null;
    }
}
