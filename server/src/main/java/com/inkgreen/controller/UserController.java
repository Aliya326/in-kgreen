package com.inkgreen.controller;

import com.inkgreen.entity.User;
import com.inkgreen.service.UserService; 
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/me")
    public List<User> me() {
        return userService.findAll();
    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        return userService.login(user);
    }

}

