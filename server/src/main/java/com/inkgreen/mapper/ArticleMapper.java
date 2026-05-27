package com.inkgreen.mapper;

import com.inkgreen.entity.Article;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ArticleMapper {

    @Select("SELECT id, title, content, publish_time, category, cover_image, intro_md, download_url FROM articles")
    @Results({
            @Result(column = "publish_time", property = "publishTime"),
            @Result(column = "cover_image", property = "coverImage"),
            @Result(column = "intro_md", property = "introMd"),
            @Result(column = "download_url", property = "downloadUrl")
    })
    List<Article> findAll();

    @Select("SELECT id, title, content, publish_time, category, cover_image, intro_md, download_url FROM articles WHERE id = #{id}")
    @Results({
            @Result(column = "publish_time", property = "publishTime"),
            @Result(column = "cover_image", property = "coverImage"),
            @Result(column = "intro_md", property = "introMd"),
            @Result(column = "download_url", property = "downloadUrl")
    })
    Article findById(Integer id);

    @Insert("INSERT INTO articles (title, content, publish_time, category, cover_image, intro_md, download_url) VALUES (#{title}, #{content}, #{publishTime}, #{category}, #{coverImage}, #{introMd}, #{downloadUrl})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Article article);

    @Delete("DELETE FROM articles WHERE id = #{id}")
    void deleteById(Integer id);

    @Update("UPDATE articles SET title = #{title}, content = #{content}, publish_time = #{publishTime}, category = #{category}, cover_image = #{coverImage}, intro_md = #{introMd}, download_url = #{downloadUrl} WHERE id = #{id}")
    void update(Article article);
}
