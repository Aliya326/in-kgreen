package com.inkgreen.service;

import java.time.LocalDate;
import com.inkgreen.dto.PageResult;
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

    public void deleteById(Integer id) {
        articleMapper.deleteById(id);
    }

    public void update(Article article) {
        articleMapper.update(article);
    }

    public PageResult<Article> findPage(Integer pageNo, Integer pageSize, String keyword, String category, String month) {
        int pn = pageNo == null ? 1 : pageNo;
        int ps = pageSize == null ? 10 : pageSize;
        if (pn < 1) pn = 1;
        if (ps < 1) ps = 10;
        if (ps > 100) ps = 100;

        int offset = (pn - 1) * ps;
        long total = articleMapper.countByFilter(keyword, category, month);
        List<Article> list = total == 0 ? List.of() : articleMapper.findPageByFilter(keyword, category, month, ps, offset);

        PageResult<Article> res = new PageResult<>();
        res.setList(list);
        res.setTotal(total);
        res.setPageNo(pn);
        res.setPageSize(ps);
        return res;
    }
}
