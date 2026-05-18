package com.inkgreen.mapper;

import com.inkgreen.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @Select("SELECT id, label, value FROM categories")
    List<Category> findAll();
}
