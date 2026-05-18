CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  publish_time DATE,
  category VARCHAR(50),
  cover_image VARCHAR(500),
  intro_md TEXT
);

INSERT INTO categories (label, value) VALUES
    ('全部', '全部'),
    ('分类1', '分类1'),
    ('分类2', '分类2'),
    ('分类3', '分类3');

INSERT INTO articles (id, title, content, publish_time, category, cover_image, intro_md) VALUES
  (1, '第一个', '卢本伟', '2024-06-01', '分类1', 'https://img.zhaoyl.com/2024/06/01/64b8c9e1a0c3f.jpg', '# 标题\n\n这是简介的 **Markdown** 内容\n\n- 要点1\n- 要点2'),
  (2, '第二个', '这是第二个的简介', '2024-06-02', '分类2', 'https://img.zhaoyl.com/2024/06/02/64b8c9e2a0c3f.jpg', '# 标题\n\n这是简介的 **Markdown** 内容\n\n- 要点1\n- 要点2'),
  (3, '第三个', '这是第三个的简介', '2024-06-03', '分类1', 'https://img.zhaoyl.com/2024/06/03/64b8c9e3a0c3f.jpg', '# 标题\n\n这是简介的 **Markdown** 内容\n\n- 要点1\n- 要点2'),
  (4, '第四个', '这是第四个的简介', '2024-06-04', '分类2', 'https://img.zhaoyl.com/2024/06/04/64b8c9e4a0c3f.jpg', '# 标题\n\n这是简介的 **Markdown** 内容\n\n- 要点1\n- 要点2'),
  (5, '第五个', '这是第五个的简介', '2024-06-05', '分类1', 'https://img.zhaoyl.com/2024/06/05/64b8c9e5a0c3f.jpg', '# 标题\n\n这是简介的 **Markdown** 内容\n\n- 要点1\n- 要点2');
