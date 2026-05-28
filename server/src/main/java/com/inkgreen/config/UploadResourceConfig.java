package com.inkgreen.config;

// 导入 Spring 的配置注解，标记此类为一个配置类
import org.springframework.context.annotation.Configuration;
// 导入资源处理器注册表，用于注册静态资源映射
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// 导入 WebMvc 配置器接口，通过实现它来扩展 Spring MVC 配置
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 导入 Java NIO 的 Path 和 Paths 工具类，用于处理文件路径
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * 自定义 Spring MVC 配置类
 * 用于将本地上传目录映射为可通过 URL 访问的静态资源
 */
@Configuration  // 声明这是一个 Spring 配置类，Spring 容器会自动加载并处理它
public class UploadResourceConfig implements WebMvcConfigurer {  // 实现 WebMvcConfigurer 接口，可以定制 Spring MVC 行为

    /**
     * 重写 addResourceHandlers 方法，配置静态资源映射
     * 此处将磁盘上的上传文件夹映射到网络路径，使浏览器能直接访问上传的文件
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 获取当前用户的工作目录（通常是项目根目录），并拼接 "uploads" 子目录
        // System.getProperty("user.dir") 返回应用程序启动时的当前工作路径
        Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads")
                .toAbsolutePath()  // 转换为绝对路径
                .normalize();      // 规范化路径，去掉多余的 "." 或 ".."
        
        // 添加一个资源处理器：
        // 将所有以 "/uploads/**" 开头的 HTTP 请求，映射到本地文件系统 uploadDir 对应的文件夹下
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir + "/"); // "file:" 前缀表示指向本地文件系统
    }
}

