package com.example.demo.payload;

public class UserInfoResponse {
    private String username;
    private Long id;

    public UserInfoResponse(Long id, String username) {
        this.username = username;
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }
}
