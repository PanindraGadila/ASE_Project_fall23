package com.example.demo.payload;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    public MessageResponse() {
    }

    public String getMessage() {
        return message;
    }
}
