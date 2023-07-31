package com.keb.kebsmartfarm.repository;

import com.keb.kebsmartfarm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userI);

    Optional<User> findByUserPhoneNum(String phnum);

    boolean existsByUserId(String userId);
}
