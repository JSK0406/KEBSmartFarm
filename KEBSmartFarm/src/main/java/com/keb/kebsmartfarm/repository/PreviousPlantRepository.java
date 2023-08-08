package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.PreviousPlant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreviousPlantRepository extends JpaRepository<PreviousPlant, Long> {

}
