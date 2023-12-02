package com.example.demo.payload;

public class CreateUpdateTaskRequest {
    private String title;
    private String description;
    private Long stageId;

    public CreateUpdateTaskRequest(String title, String description, Long stageId) {
        this.title = title;
        this.description = description;
        this.stageId = stageId;
    }

    public CreateUpdateTaskRequest() {
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getStageId() {
        return stageId;
    }
}
