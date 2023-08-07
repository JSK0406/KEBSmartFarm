package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArduinoKitRepository extends JpaRepository<ArduinoKit, Long> {
    Optional<ArduinoKit> findBySerialNum(String serialNum);
}
