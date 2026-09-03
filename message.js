/* ============================================
  <script src="https://giscus.app/client.js"
        data-repo="3495257035-prog/AlesWeb"
        data-repo-id="R_kgDOUNjATA"
        data-category="General"
        data-category-id="DIC_kwDOUNjATM4DE0wi"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script> 留言板页面脚本：
   1. 把 diary.js 里的日记渲染成卡片
   2. 访客评论区（giscus，基于 GitHub Discussions）
      —— 部署到 GitHub Pages 后，按 README 里的步骤
         填好 GISCUS_CONFIG，评论框就会自动出现
   ============================================ */

// ↓↓↓ 部署后按 README 教程填写这三项（在 giscus.app 上生成）↓↓↓
const GISCUS_CONFIG = {
  repo: "",        // 例如 "3495257035-prog/3495257035-prog.github.io"
  repoId: "",      // giscus.app 会生成
  categoryId: "",  // giscus.app 会生成
};
// ↑↑↑ 填好之后评论区自动启用 ↑↑↑

document.addEventListener("DOMContentLoaded", () => {
  renderDiary();
  initComments();
});

/* ---------- 日记渲染 ---------- */
function renderDiary() {
  const list = document.getElementById("diaryList");
  if (!list) return;

  // 数据文件里新的写在前面的，直接按顺序渲染
  DIARY_ENTRIES.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "diary-card reveal";

    const meta = document.createElement("div");
    meta.className = "diary-meta";
    meta.innerHTML =
      '<span class="diary-date">' + entry.date + "</span>" +
      '<span class="diary-mood">' + entry.mood + "</span>";

    const title = document.createElement("h3");
    title.textContent = entry.title;

    card.appendChild(meta);
    card.appendChild(title);

    entry.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.className = "diary-text";
      p.textContent = text;
      card.appendChild(p);
    });

    list.appendChild(card);
  });
}

/* ---------- 访客评论区 ---------- */
function initComments() {
  const box = document.getElementById("giscusBox");
  if (!box) return;

  const ready = GISCUS_CONFIG.repo && GISCUS_CONFIG.repoId && GISCUS_CONFIG.categoryId;

  if (!ready) {
    // 还没配置：显示引导提示，不影响页面其它部分
    box.innerHTML =
      '<div class="comment-hint">' +
      "<h3>💬 评论区待启用</h3>" +
      "<p>评论功能基于 GitHub Discussions，等网站部署上线后，" +
      "按项目 README 里的《开启访客留言》三步配置即可启用。</p>" +
      "</div>";
    return;
  }

  // 已配置：插入 giscus 评论组件
  box.innerHTML = "";
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.setAttribute("data-repo", GISCUS_CONFIG.repo);
  script.setAttribute("data-repo-id", GISCUS_CONFIG.repoId);
  script.setAttribute("data-category", "Announcements");
  script.setAttribute("data-category-id", GISCUS_CONFIG.categoryId);
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", "light");
  script.setAttribute("data-lang", "zh-CN");
  script.setAttribute("crossorigin", "anonymous");
  box.appendChild(script);
}
