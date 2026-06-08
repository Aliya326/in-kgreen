package com.inkgreen.service;

import com.inkgreen.entity.User;
import com.inkgreen.mapper.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public List<User> findAll() {
        return userMapper.findAll();
    }

    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    public void insert(User user) {
        userMapper.insert(user);
    }

    public Map<String, Object> login(User user) {
        User dbUser = userMapper.findByUsername(user.getUsername());
        if (dbUser == null || dbUser.getPasswordHash() == null || !dbUser.getPasswordHash().equals(user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "用户名或密码错误");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", UUID.randomUUID().toString());
        response.put("username", dbUser.getUsername());
        response.put("avatar", "");
        return response;
    }
}
