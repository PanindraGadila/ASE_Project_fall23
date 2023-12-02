package com.example.demo.security;

import com.example.demo.db.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        com.example.demo.entities.User userObj = userRepository.findByUsername(username);

        if (userObj == null) {// should have proper handling of Exception
            throw new UsernameNotFoundException("User '" + username + "' not found.");
        }
        System.out.println("userObj");
        System.out.println(userObj);

        UserDetails userDetails = User.withUsername(userObj.getUsername()).password(userObj.getPassword()).build();

        return userDetails;
    }

    public static String getCurrentUserUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();
        return userDetail.getUsername();
    }

    public Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();
        return Long.parseLong(userDetail.getUsername());
    }

    public com.example.demo.entities.User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();
        return userRepository.findByUsername(userDetail.getUsername());
    }
}