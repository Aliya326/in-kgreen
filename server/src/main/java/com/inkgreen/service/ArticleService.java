package com.inkgreen.service;

import java.time.LocalDate;
import com.inkgreen.entity.Article;
import com.inkgreen.mapper.ArticleMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleMapper articleMapper;

    public ArticleService(ArticleMapper articleMapper) {
        this.articleMapper = articleMapper;
    }

    public List<Article> findAll() {
        return articleMapper.findAll();
    }

    public Article findById(Integer id) {
        return articleMapper.findById(id);
    }

    public Article addArticle(Article article) {
        article.setPublishTime(LocalDate.now());
        articleMapper.insert(article);
        return article;
    }
}
