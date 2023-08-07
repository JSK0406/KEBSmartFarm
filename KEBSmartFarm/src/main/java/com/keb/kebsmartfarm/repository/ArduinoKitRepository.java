package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.ArduinoKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArduinoKitRepository extends JpaRepository<ArduinoKit, Long> {
    boolean existsArduinoKitBySerialNum(String serialNum);
}
