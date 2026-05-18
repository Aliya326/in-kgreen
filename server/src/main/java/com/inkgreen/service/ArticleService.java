package com.inkgreen.service;

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
}
