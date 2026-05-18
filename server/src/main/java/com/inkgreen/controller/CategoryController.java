package com.inkgreen.controller;

import com.inkgreen.entity.Category;
import com.inkgreen.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/list")
    public List<Category> list() {
        return categoryService.findAll();
    }
}
