package com.inkgreen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        // 创建一个CORS配置对象，用于设置跨域请求的规则
        CorsConfiguration config = new CorsConfiguration();

        // 允许来自本地开发地址（localhost）任意端口的请求源
        // 使用通配符 * 匹配所有端口号，常见于前端开发时使用 localhost:3000 等不同端口
        config.addAllowedOriginPattern("http://localhost:*");

        // 同样允许来自回环地址 127.0.0.1 任意端口的请求源
        // 有的系统可能使用 127.0.0.1 而不是 localhost
        config.addAllowedOriginPattern("http://127.0.0.1:*");

        // 允许所有请求头（Header）
        // 星号 * 表示任何自定义请求头都可以被接受
        config.addAllowedHeader("*");

        // 允许所有HTTP方法（GET, POST, PUT, DELETE 等）
        config.addAllowedMethod("*");

        // 允许携带凭证信息，比如 Cookie 和 Authorization 头
        // 当设置为 true 时，前端请求的 withCredentials 也必须为 true
        config.setAllowCredentials(true);

        // 创建一个基于URL路径的CORS配置源
        // 可以针对不同的URL路径应用不同的CORS配置
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // 将上述CORS配置注册到所有路径（/** 匹配所有请求路径）
        // 这意味着所有请求都会应用这个CORS配置
        source.registerCorsConfiguration("/**", config);

        // 返回一个CorsFilter过滤器，它会根据配置源处理跨域请求
        return new CorsFilter(source);
    }
}
