/* 甘嘉乐 · 个人主页 交互脚本 */

// 标记 JS 已加载：滚动渐入动画只在有 JS 时启用，
// 禁用 JS 的浏览器仍能看到全部内容
document.documentElement.classList.add("js");

// 页面加载完成后再启动，避免动画抢跑
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSubnav();
  initReveal();
  initParallax();
});

/* ---------- 导航栏：滚动后加深背景 ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 手机端：点按钮展开 / 收起菜单
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });

  // 点击菜单里的链接后自动收起菜单
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      links.classList.remove("open");
    })
  );
}

/* ---------- 快捷传送条 / 导航：根据当前页面自动高亮 ---------- */
function initSubnav() {
  const page = document.body.dataset.page; // 每个页面的 <body> 上标了 data-page
  if (!page) return;

  // 高亮快捷传送条里的当前板块胶囊
  document.querySelectorAll(".subnav a[data-nav]").forEach((a) => {
    if (a.dataset.nav === page) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // 同步高亮顶部导航里的当前板块链接
  document.querySelectorAll(".nav-links a[data-nav]").forEach((a) => {
    if (a.dataset.nav === page) {
      a.classList.add("active");
    }
  });
}

/* ---------- 滚动渐入：元素进入视口时浮现 ---------- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // 出现过一次就不再重复播放
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // 元素露出 15% 时触发
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ---------- 首屏视差：鼠标移动时，光斑与文字轻微错位 ---------- */
function initParallax() {
  // 首页的大首屏和留言板的紧凑标题区都支持视差
  const heroes = [document.getElementById("hero"), document.querySelector(".page-hero")]
    .filter(Boolean);
  if (heroes.length === 0) return;

  // 只在"精确指针"（鼠标）且用户没有要求减少动效时启用
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!finePointer || reduceMotion) return;

  heroes.forEach((hero) => {
    const layers = hero.querySelectorAll("[data-parallax]");

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      // 光标在首屏内的相对位置：-0.5 ~ 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((el) => {
        // data-parallax 越大移动越多；负值反向移动，形成前后层次
        const factor = parseFloat(el.dataset.parallax) || 0;
        el.style.transform =
          "translate3d(" + (-x * factor).toFixed(1) + "px, " +
          (-y * factor).toFixed(1) + "px, 0)";
      });
    });

    // 鼠标离开后缓慢归位
    hero.addEventListener("mouseleave", () => {
      layers.forEach((el) => {
        el.style.transform = "translate3d(0, 0, 0)";
      });
    });
  });
}
