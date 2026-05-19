package com.inkgreen.service;

import com.inkgreen.entity.Category;
import com.inkgreen.mapper.CategoryMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    public List<Category> findAll() {
        return categoryMapper.findAll();
    }

    public void deleteById(Integer id) {
        categoryMapper.deleteById(id);
    }

    public void addCategory(Category category) {
        if(category.getValue() == null || category.getValue().isEmpty()){
            category.setValue(category.getLabel());
        }
        categoryMapper.insert(category);
    }
}
