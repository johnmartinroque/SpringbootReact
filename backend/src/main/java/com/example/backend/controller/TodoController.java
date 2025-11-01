package com.example.backend.controller;

import com.example.backend.model.Todo;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;
    private final JwtUtil jwtUtil;

    public TodoController(TodoService todoService, JwtUtil jwtUtil) {
        this.todoService = todoService;
        this.jwtUtil = jwtUtil;
    }

    private String getUsernameFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.validateToken(token);
    }

    @GetMapping
    public List<Todo> getTodos(@RequestHeader("Authorization") String authHeader) {
        String username = getUsernameFromHeader(authHeader);
        if (username == null) return Collections.emptyList();
        return todoService.getTodosByUser(username);
    }

    @PostMapping
    public Todo createTodo(@RequestHeader("Authorization") String authHeader, @RequestBody Todo todo) {
        String username = getUsernameFromHeader(authHeader);
        if (username == null) return null;
        todo.setUsername(username);
        todo.setStatus("pending");
        return todoService.addTodo(todo);
    }

    @PutMapping("/{id}/status")
    public Map<String, Object> updateStatus(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String username = getUsernameFromHeader(authHeader);
        Map<String, Object> response = new HashMap<>();
        if (username == null) {
            response.put("error", "Invalid token");
            return response;
        }

        String status = body.get("status");
        boolean success = todoService.updateTodoStatus(id, status, username);
        response.put("success", success);
        return response;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteTodo(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id
    ) {
        String username = getUsernameFromHeader(authHeader);
        Map<String, Object> response = new HashMap<>();
        if (username == null) {
            response.put("error", "Invalid token");
            return response;
        }

        boolean success = todoService.deleteTodo(id, username);
        response.put("success", success);
        return response;
    }
}
