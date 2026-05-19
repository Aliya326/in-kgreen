package com.inkgreen.mapper;

import com.inkgreen.entity.Category;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @Select("SELECT id, label, value FROM categories")
    List<Category> findAll();

    @Delete("DELETE FROM categories WHERE id = #{id}")
    void deleteById(Integer id);

    @Insert("INSERT INTO categories (label, value) VALUES (#{label}, #{value})")
    void insert(Category category);
}
