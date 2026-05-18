package com.inkgreen;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.inkgreen.mapper")
public class InKgreenApplication {

    public static void main(String[] args) {
        SpringApplication.run(InKgreenApplication.class, args);
    }
}
