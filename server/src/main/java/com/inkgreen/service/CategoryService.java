package com.inkgreen.service;

// 导入实体类 Category，代表分类对象
import com.inkgreen.entity.Category;
// 导入 CategoryMapper 接口，用于数据库操作
import com.inkgreen.mapper.CategoryMapper;
// 导入 Spring 的 @Service 注解，标记该类为服务层组件
import org.springframework.stereotype.Service;

// 导入 List 集合，用于返回分类列表
import java.util.List;

// @Service 注解表示该类是 Spring 管理的服务层组件，负责业务逻辑处理
@Service
public class CategoryService {

    // 声明一个不可变的 CategoryMapper 成员变量，用于数据库访问
    private final CategoryMapper categoryMapper;

    // 构造函数注入 CategoryMapper，Spring 会自动传入实例
    public CategoryService(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    /**
     * 查询所有分类信息
     * @return 包含所有 Category 对象的列表
     */
    public List<Category> findAll() {
        // 调用 CategoryMapper 的 findAll 方法，执行数据库查询
        return categoryMapper.findAll();
    }

    /**
     * 根据 ID 删除指定的分类
     * @param id 要删除的分类的唯一标识符
     */
    public void deleteById(Integer id) {
        // 调用 CategoryMapper 的 deleteById 方法，执行数据库删除操作
        categoryMapper.deleteById(id);
    }

    /**
     * 新增一个分类
     * 如果分类的 value 属性为空，则使用 label 属性作为默认值
     * @param category 要添加的分类对象
     */
    public void addCategory(Category category) {
        // 检查分类对象的 value 是否为空（null 或空字符串）
        if(category.getValue() == null || category.getValue().isEmpty()){
            // 如果为空，将 label 的值赋予 value，确保 value 字段有内容
            category.setValue(category.getLabel());
        }
        // 调用 CategoryMapper 的 insert 方法，将分类数据插入数据库
        categoryMapper.insert(category);
    }
}