package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {
}
