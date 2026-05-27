package com.inkgreen.controller;

import com.inkgreen.entity.Article;
import com.inkgreen.service.ArticleService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
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

    @GetMapping("/{id:\\d+}")
    public Article detail(@PathVariable Integer id) {
        return articleService.findById(id);
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Article add(
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("content") String content,
            @RequestParam(value = "intro_md", required = false) String introMd,
            @RequestPart(value = "coverFile", required = false) MultipartFile coverFile
    ) throws IOException {
        Article article = new Article();
        article.setTitle(title);
        article.setCategory(category);
        article.setContent(content);
        article.setIntroMd(introMd);

        if (coverFile != null && !coverFile.isEmpty()) {
            String contentType = coverFile.getContentType();
            if (contentType != null && !MediaType.IMAGE_JPEG_VALUE.equals(contentType) && !MediaType.IMAGE_PNG_VALUE.equals(contentType)) {
                throw new IllegalArgumentException("Only JPG/PNG images are supported");
            }

            Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");
            Files.createDirectories(uploadDir);

            String originalName = coverFile.getOriginalFilename();
            String ext = "";
            if (originalName != null) {
                int dot = originalName.lastIndexOf('.');
                if (dot >= 0 && dot < originalName.length() - 1) {
                    ext = originalName.substring(dot);
                }
            }

            String fileName = UUID.randomUUID() + ext;
            Path dest = uploadDir.resolve(fileName).normalize();
            coverFile.transferTo(dest);

            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            article.setCoverImage(baseUrl + "/uploads/" + fileName);
        }

        return articleService.addArticle(article);
    }

    @DeleteMapping("/{id:\\d+}")
    public void delete(@PathVariable Integer id) {
        articleService.deleteById(id);
    }
}
