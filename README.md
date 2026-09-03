# 甘嘉乐 · 个人主页

一个纯手写的自我介绍网站：HTML + CSS + JavaScript，无需任何构建工具，可直接部署到 GitHub Pages。

## 本地预览

直接双击 `index.html` 用浏览器打开即可。

## 目录结构

```
my-website/
├── index.html    首页（大屏开场 + 各板块入口卡片）
├── about.html    关于我
├── hobbies.html  兴趣爱好
├── learning.html 正在学习
├── portfolio.html 作品集（占位）
├── college.html  大学生活
├── message.html  留言板页面
├── contact.html  联系我
├── style.css     样式（Apple 风格：毛玻璃导航、浅灰配色、光斑视差、快捷传送条）
├── script.js     交互（导航、快捷传送条高亮、手机端菜单、滚动渐入、视差）
├── diary.js      电子日记数据（发新日记就在这里写）
└── message.js    留言板逻辑（日记渲染 + giscus 评论配置）
```

## 如何修改内容

- **改某个板块的文字**：每个板块是独立页面（如 `about.html`），直接改对应文件即可。
- **发新日记**：打开 `diary.js`，在 `DIARY_ENTRIES` 数组最前面复制一条，改日期、心情、标题和正文，保存推送后网页上就会出现在最上面。
- **改颜色**：`style.css` 顶部的 `:root` 变量区统一管理颜色和圆角。
- **加新板块页**：复制一个现有板块页（如 `about.html`），改内容；再在所有页面的顶部导航和"快捷传送条"（`subnav`）里各加一个链接，并给新页面的 `<body>` 标上 `data-page="你的板块名"`（导航高亮靠它识别）。

## 开启访客留言（giscus，三步）

留言评论基于 GitHub Discussions，不需要服务器，评论数据保存在你仓库里：

1. 创建 GitHub 仓库（例如 `3495257035-prog.github.io`），**设为 Public**，并在仓库 Settings → General → Features 里勾选 **Discussions**。
2. 访问 https://github.com/apps/giscus 安装 giscus App 并授权给你的仓库。
3. 打开 https://giscus.app/zh-CN ，填入仓库名，Discussion 分类选 **Announcements**（只有你能发起讨论，访客只能回复，页面更干净），页面底部会生成 `data-repo`、`data-repo-id`、`data-category-id` 三个值，把它们填进 `message.js` 顶部的 `GISCUS_CONFIG`，推送后评论框自动出现。

> 说明：访客发表评论需要登录 GitHub 账号；你自己发日记则是通过修改 `diary.js` 完成——这正好也是练习 Git 工作流的机会。如果以后想支持微信/QQ 等登录方式的评论，那就需要一台服务器或云函数了，到时候再升级也不迟。
