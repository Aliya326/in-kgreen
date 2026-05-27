package com.inkgreen.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
public class Article {

    private Integer id;

    private String title;

    private String content;

    @JsonProperty("publishDate")
    private LocalDate publishTime;

    private String category;

    @JsonProperty("cover_image")
    private String coverImage;

    @JsonProperty("intro_md")
    private String introMd;

    @JsonProperty("download_url")
    private String downloadUrl;
}
