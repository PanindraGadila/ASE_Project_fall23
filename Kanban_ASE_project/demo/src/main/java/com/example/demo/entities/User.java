package com.example.demo.entities;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Inheritance(strategy= InheritanceType.JOINED)
public class User {

    private @Id @GeneratedValue Long id;
    private String name;
    private String password;
    private String username;

    public User() {}

    public User(String name, String username, String password) {
        this.name = name;
        this.password = password;
        this.username = username;
    }

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getName() {
        return this.name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String firstName) {
        this.name = firstName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean checkPassword(String password) {
        return BCrypt.checkpw(password, this.password);
    }


    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof User))
            return false;
        User user = (User) o;
        return Objects.equals(this.id, user.id)
                && Objects.equals(this.username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.username);
    }

    @Override
    public String toString() {
        return "User{" + "id=" + this.id + ", name='" + this.name + '\'' + ", username='" + this.username + '\'' + '}';
    }
}