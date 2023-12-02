package com.example.demo.db;

import com.example.demo.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface TaskRepository  extends JpaRepository<Task, Long> {
    @Query(value = "SELECT * FROM task WHERE stage_id = ?1", nativeQuery = true)
    Iterable<Task> findAllByStageId(Long id);
}
