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

    @Select("""
            <script>
            SELECT COUNT(1)
            FROM articles
            <where>
              <if test="keyword != null and keyword != ''">
                AND (
                  title LIKE CONCAT('%', #{keyword}, '%')
                  OR content LIKE CONCAT('%', #{keyword}, '%')
                  OR intro_md LIKE CONCAT('%', #{keyword}, '%')
                  OR category LIKE CONCAT('%', #{keyword}, '%')
                )
              </if>
              <if test="category != null and category != ''">
                AND category = #{category}
              </if>
              <if test="month != null and month != ''">
                AND DATE_FORMAT(publish_time, '%Y-%m') = #{month}
              </if>
            </where>
            </script>
            """)
    long countByFilter(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("month") String month
    );

    @Select("""
            <script>
            SELECT id, title, content, publish_time, category, cover_image, intro_md, download_url
            FROM articles
            <where>
              <if test="keyword != null and keyword != ''">
                AND (
                  title LIKE CONCAT('%', #{keyword}, '%')
                  OR content LIKE CONCAT('%', #{keyword}, '%')
                  OR intro_md LIKE CONCAT('%', #{keyword}, '%')
                  OR category LIKE CONCAT('%', #{keyword}, '%')
                )
              </if>
              <if test="category != null and category != ''">
                AND category = #{category}
              </if>
              <if test="month != null and month != ''">
                AND DATE_FORMAT(publish_time, '%Y-%m') = #{month}
              </if>
            </where>
            ORDER BY publish_time DESC, id DESC
            LIMIT #{limit} OFFSET #{offset}
            </script>
            """)
    @Results({
            @Result(column = "publish_time", property = "publishTime"),
            @Result(column = "cover_image", property = "coverImage"),
            @Result(column = "intro_md", property = "introMd"),
            @Result(column = "download_url", property = "downloadUrl")
    })
    List<Article> findPageByFilter(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("month") String month,
            @Param("limit") int limit,
            @Param("offset") int offset
    );
}
