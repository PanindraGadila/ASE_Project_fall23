package com.example.demo.db;

import com.example.demo.entities.Stage;
import com.example.demo.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StageRepository extends JpaRepository<Stage, Long> {
    @Query(value = "SELECT * FROM stage WHERE user_id = ?1", nativeQuery = true)
    Iterable<Stage> findAllByUserId(Long id);
}
