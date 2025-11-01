package com.example.backend.service;

import com.example.backend.model.Todo;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {
    private final Map<Long, Todo> todos = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public List<Todo> getTodosByUser(String username) {
        List<Todo> userTodos = new ArrayList<>();
        for (Todo todo : todos.values()) {
            if (todo.getUsername().equals(username)) {
                userTodos.add(todo);
            }
        }
        return userTodos;
    }

    public Todo addTodo(Todo todo) {
        long id = idCounter.getAndIncrement();
        todo.setId(id);
        todos.put(id, todo);
        return todo;
    }

    public boolean updateTodoStatus(Long id, String status, String username) {
        Todo todo = todos.get(id);
        if (todo != null && todo.getUsername().equals(username)) {
            todo.setStatus(status);
            return true;
        }
        return false;
    }

    public boolean deleteTodo(Long id, String username) {
        Todo todo = todos.get(id);
        if (todo != null && todo.getUsername().equals(username)) {
            todos.remove(id);
            return true;
        }
        return false;
    }
}
