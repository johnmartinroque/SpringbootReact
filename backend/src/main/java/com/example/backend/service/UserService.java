package com.example.backend.service;

import com.example.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final Map<String, User> users = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public boolean register(User user) {
        if (users.containsKey(user.getUsername())) return false;
        user.setId(idCounter.getAndIncrement());
        users.put(user.getUsername(), user);
        return true;
    }

    public User login(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User findByUsername(String username) {
        return users.get(username);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }
}
