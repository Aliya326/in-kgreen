package com.inkgreen.mapper;

import com.inkgreen.entity.User;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT id, username, password_hash FROM users")
    List<User> findAll();

    @Select("SELECT id, username, password_hash FROM users WHERE username = #{username} LIMIT 1")
    User findByUsername(String username);

    @Insert("INSERT INTO users (username, password_hash) VALUES (#{username}, #{passwordHash})")
    void insert(User user);   
}
