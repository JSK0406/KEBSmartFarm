package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReleasedKit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ReleaseNum;

    @Column(columnDefinition = "text", unique = true)
    private String kitSerialNum;
}
