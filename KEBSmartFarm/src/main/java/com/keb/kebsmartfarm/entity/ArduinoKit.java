package com.keb.kebsmartfarm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;

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
    @JoinColumn(name = "userSeqNum")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "arduinoKit", cascade = CascadeType.ALL)
    private List<Plant> PlantList;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Transient
    private Plant plant;


    public void getActivePlant(){
        for (Plant activePlant: PlantList){
            if (activePlant.getPreviousPlant() == null) {
                plant = activePlant;
            }
        }
    }

}
