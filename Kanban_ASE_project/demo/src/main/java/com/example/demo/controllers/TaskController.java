package com.example.demo.controllers;

import com.example.demo.db.StageRepository;
import com.example.demo.db.TaskRepository;
import com.example.demo.entities.Stage;
import com.example.demo.payload.CreateUpdateTaskRequest;
import com.example.demo.security.UserAuthService;

import com.example.demo.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path="/api/task")
public class TaskController {
    @Autowired private TaskRepository taskRepository;

    @Autowired private StageRepository stageRepository;

    @Autowired private UserAuthService userAuthService;

    @GetMapping(path="/{id}")
    public @ResponseBody Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElseGet(null);
    }

    @PostMapping(path="")
    public @ResponseBody Task addNewTask (@RequestBody CreateUpdateTaskRequest obj) {
        Stage stage = stageRepository.findById(obj.getStageId()).orElseGet(null);

        Task task = new Task();
        task.setTitle(obj.getTitle());
        task.setDescription(obj.getDescription());
        task.setStage(stage);
        System.out.println(stage);
        return taskRepository.save(task);
    }

    @PutMapping(path="/{id}")
    public @ResponseBody Task updateTaskById(@PathVariable Long id, @RequestBody CreateUpdateTaskRequest obj) {
        Task task = taskRepository.findById(id).orElseGet(null);
        task.setTitle(obj.getTitle());
        task.setDescription(obj.getDescription());
        Stage stage = stageRepository.findById(obj.getStageId()).orElseGet(null);
        System.out.println(stage);
        task.setStage(stage);
        return taskRepository.save(task);
    }

    @DeleteMapping(path="/{id}")
    public @ResponseBody void deleteTaskById(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}
