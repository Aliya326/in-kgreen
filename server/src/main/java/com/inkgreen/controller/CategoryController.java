package com.inkgreen.controller;  // 声明当前类所在的包路径，用于组织代码和依赖管理

import com.inkgreen.entity.Category;  // 导入实体类，代表分类对象，与数据库表对应
import com.inkgreen.service.CategoryService;  // 导入业务逻辑层的服务类，处理分类相关的操作
import org.springframework.web.bind.annotation.*;  // 导入 Spring MVC 中用于定义 REST 控制器的注解

import java.util.List;  // 导入 Java 集合框架中的 List 接口，用于返回分类列表

@RestController  // 标识当前类是一个 REST 风格的控制器，
                // 相当于同时使用了 @Controller 和 @ResponseBody，
                // 表示类中所有方法的返回值都会自动序列化为 JSON/XML 并写入 HTTP 响应体
@RequestMapping("/categories")  // 定义当前控制器下所有接口的基础路径，
                                // 例如访问列表接口的完整路径是 /categories/list
public class CategoryController {

    // 通过 final 关键字确保依赖在对象创建后不会被更改，提高安全性
    private final CategoryService categoryService;

    // Spring 会自动寻找一个 CategoryService 类型的 Bean 注入到构造器中（从 Spring 4.3 开始，单构造器不需要 @Autowired 注解）
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/list")  // 映射 GET 请求，完整路径为 /categories/list，用于查询所有分类
    public List<Category> list() {
        // 调用服务层方法，获取数据库中所有的 Category 记录，并直接返回列表
        // Spring 会利用 @RestController 的特性将 List 自动转换为 JSON 数组
        return categoryService.findAll();
    }

    @DeleteMapping("/{id:\\d+}")  // 映射 DELETE 请求，路径中包含动态参数 id，并使用正则 \d+ 限制 id 必须为数字
    public void delete(@PathVariable Integer id) {  // @PathVariable 表示从 URL 路径中获取 {id} 的值并赋值给方法参数
        // 调用服务层方法，根据主键 id 删除分类数据
        categoryService.deleteById(id);
    }

    @PostMapping("/add")  // 映射 POST 请求，完整路径为 /categories/add，用于新增分类
    public void add(@RequestBody Category category) {  // @RequestBody 表示将请求体中的 JSON/XML 数据自动绑定到 Category 对象
        // 调用服务层方法，将传入的 Category 对象持久化到数据库
        categoryService.addCategory(category);
    }
}
