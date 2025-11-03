package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (userService.register(user)) {
            response.put("message", "User registered successfully");
        } else {
            response.put("message", "Username already exists");
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existing = userService.login(user.getUsername(), user.getPassword());
        if (existing != null) {
            String token = jwtUtil.generateToken(user.getUsername());
            response.put("token", token);
        } else {
            response.put("error", "Invalid credentials");
        }
        return response;
    }

    @GetMapping("/me")
    public Map<String, Object> me(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.validateToken(token);
        if (username != null) {
            response.put("username", username);
        } else {
            response.put("error", "Invalid token");
        }
        return response;
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {
        List<Map<String, Object>> userList = new ArrayList<>();
        for (User user : userService.getAllUsers()) {
            Map<String, Object> data = new HashMap<>();
            data.put("id", user.getId());
            data.put("username", user.getUsername());
            userList.add(data);
        }
        return userList;
}
}


