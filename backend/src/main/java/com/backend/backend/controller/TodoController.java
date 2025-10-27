package com.backend.backend.controller;

import com.backend.backend.model.Todo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend during development
public class TodoController {

    private List<Todo> todos = new ArrayList<>();
    private Long idCounter = 1L;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todos;
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        todo.setId(idCounter++);
        todos.add(todo);
        return todo;
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        for (Todo todo : todos) {
            if (todo.getId().equals(id)) {
                todo.setTitle(updatedTodo.getTitle());
                todo.setCompleted(updatedTodo.isCompleted());
                return todo;
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}
