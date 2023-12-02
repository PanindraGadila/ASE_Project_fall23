package com.example.demo.controllers;

import com.example.demo.entities.Stage;
import com.example.demo.entities.User;
import com.example.demo.security.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.db.StageRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path="/api/stage")
public class StageController {
    @Autowired private StageRepository stageRepository;

    @Autowired private UserAuthService userAuthService;

    @GetMapping(path="")
    public @ResponseBody Iterable<Stage> getAllStages() {
        User user = userAuthService.getCurrentUser();
        return stageRepository.findAllByUserId(user.getId());
    }

    @PostMapping(path="")
    public Stage addNewStage (@RequestBody Stage obj) {
        Stage stage = new Stage();
        stage.setName(obj.getName());
        stage.setUser(userAuthService.getCurrentUser());
        return stageRepository.save(stage);
    }

    @PutMapping(path="/{id}")
    public @ResponseBody Stage updateStageById(@PathVariable Long id, @RequestBody Stage obj) {
        Stage stage = stageRepository.findById(id).orElseGet(null);
        stage.setName(obj.getName());
        return stageRepository.save(stage);
    }

    @DeleteMapping(path="/{id}")
    public @ResponseBody void deleteStageById(@PathVariable Long id) {
        stageRepository.deleteById(id);
    }

}
