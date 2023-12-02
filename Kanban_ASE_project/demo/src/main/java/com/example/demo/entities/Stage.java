package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Stage {
    private @Id
    @GeneratedValue Long id;

    private String name;

//    List of tasks in this stage
    @OneToMany(mappedBy = "stage")
    private List<Task> tasks;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Stage() {}

    public Stage(String name, List<Task> tasks) {
        this.name = name;
        this.tasks = tasks;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
