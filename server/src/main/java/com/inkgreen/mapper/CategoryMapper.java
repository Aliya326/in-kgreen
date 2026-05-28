package com.inkgreen.mapper; // 声明当前文件所属的包路径，通常按照项目结构组织，mapper包用于存放数据库映射接口

import com.inkgreen.entity.Category; // 导入实体类 Category，对应数据库中的 categories 表，用于承载查询结果或传递数据
import org.apache.ibatis.annotations.Delete; // 导入 MyBatis 的 @Delete 注解，用来标注删除操作的 SQL 语句
import org.apache.ibatis.annotations.Insert; // 导入 @Insert 注解，用来标注插入操作的 SQL 语句
import org.apache.ibatis.annotations.Mapper; // 导入 @Mapper 注解，标识该接口是 MyBatis 的映射器，Spring 会自动生成其实现类
import org.apache.ibatis.annotations.Select; // 导入 @Select 注解，用来标注查询操作的 SQL 语句

import java.util.List; // 导入 List 集合类，用于存放多条查询结果

// @Mapper 是 MyBatis 提供的注解，告诉框架这是一个数据访问层接口（Mapper）
// Spring 启动时会自动扫描并创建该接口的代理对象，无需手动写实现类
@Mapper
public interface CategoryMapper {

    // @Select 注解内直接编写 SQL 查询语句，查询 categories 表中的 id, label, value 三列
    // 方法返回值 List<Category> 表示将查询到的每一行记录自动封装成 Category 对象，并放入一个列表中
    // 这个方法的作用是获取分类表中的所有记录
    @Select("SELECT id, label, value FROM categories")
    List<Category> findAll();

    // @Delete 注解用于执行删除操作，SQL 语句中的 #{id} 是 MyBatis 的参数占位符
    // #{id} 会在运行时被方法参数 id 的值替换，相当于预编译 SQL 中的 ? 占位符，可以防止 SQL 注入
    // 该方法根据传入的主键 id 删除 categories 表中的对应记录，没有返回值
    @Delete("DELETE FROM categories WHERE id = #{id}")
    void deleteById(Integer id);

    // @Insert 注解用于执行插入操作，将数据新增到 categories 表中
    // SQL 中的 #{label} 和 #{value} 会分别调用传入的 Category 对象的 getLabel() 和 getValue() 方法，获取属性值
    // 这里没有插入 id 字段，通常意味着 id 在数据库表中被设置为自增主键，由数据库自动生成
    // 该方法没有返回值，插入成功后表里会多一条记录
    @Insert("INSERT INTO categories (label, value) VALUES (#{label}, #{value})")
    void insert(Category category);
}
