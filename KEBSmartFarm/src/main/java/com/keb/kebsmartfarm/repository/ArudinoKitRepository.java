package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ArudinoKitRepository extends JpaRepository<ArduinoKit, UUID> {
    List<ArduinoKit> findAllByUserId(String userId);
}
