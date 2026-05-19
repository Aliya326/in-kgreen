package com.inkgreen.mapper;

import com.inkgreen.entity.Article;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ArticleMapper {

    @Select("SELECT id, title, content, publish_time, category, cover_image, intro_md FROM articles")
    @Results({
            @Result(column = "publish_time", property = "publishTime"),
            @Result(column = "cover_image", property = "coverImage"),
            @Result(column = "intro_md", property = "introMd")
    })
    List<Article> findAll();

    @Select("SELECT id, title, content, publish_time, category, cover_image, intro_md FROM articles WHERE id = #{id}")
    @Results({
            @Result(column = "publish_time", property = "publishTime"),
            @Result(column = "cover_image", property = "coverImage"),
            @Result(column = "intro_md", property = "introMd")
    })
    Article findById(Integer id);

    @Insert("INSERT INTO articles (title, content, publish_time, category, cover_image, intro_md) VALUES (#{title}, #{content}, #{publishTime}, #{category}, #{coverImage}, #{introMd})")
    void insert(Article article);
}
