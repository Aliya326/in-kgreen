package com.inkgreen.controller;

import com.inkgreen.entity.Article;
import com.inkgreen.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/list")
    public List<Article> list() {
        return articleService.findAll();
    }

    @GetMapping("/{id}")
    public Article detail(@PathVariable Integer id) {
        return articleService.findById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody Article article) {
        articleService.addArticle(article);
    }
}
