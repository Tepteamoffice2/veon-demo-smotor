// Services switcher (phones and tablets) and the phone call bar. Everything works without this script:
// all three price groups are shown in order and the call bar stays visible.

// 1. Switcher: tabs only below 64rem; on desktop the three columns are plain lists.
const root = document.querySelector<HTMLElement>("[data-tabs]");
if (root) {
  const list = root.querySelector<HTMLElement>("[data-tablist]")!;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-tab]"));
  const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
  const mq = window.matchMedia("(min-width: 64rem)");
  let current = 0;

  const select = (i: number, focus = false, animate = true) => {
    current = i;
    list.style.setProperty("--tab-index", String(i));
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(j === i));
      t.tabIndex = j === i ? 0 : -1;
    });
    panels.forEach((p, j) => {
      const show = j === i;
      p.hidden = !show;
      if (show && animate) {
        p.classList.remove("is-entering");
        void p.offsetWidth;
        p.classList.add("is-entering");
      }
    });
    if (focus) tabs[i]?.focus();
  };

  const setMode = () => {
    if (mq.matches) {
      list.removeAttribute("role");
      tabs.forEach((t) => { t.removeAttribute("role"); t.removeAttribute("aria-controls"); });
      panels.forEach((p) => { p.hidden = false; p.removeAttribute("role"); p.removeAttribute("aria-labelledby"); p.removeAttribute("tabindex"); });
    } else {
      list.setAttribute("role", "tablist");
      tabs.forEach((t) => { t.setAttribute("role", "tab"); t.setAttribute("aria-controls", `group-${t.dataset.tab}`); });
      panels.forEach((p) => { p.setAttribute("role", "tabpanel"); p.setAttribute("aria-labelledby", `tab-${p.dataset.panel}`); p.tabIndex = 0; });
      select(current, false, false);
    }
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const n = tabs.length;
      const go = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
      if (go >= 0) { e.preventDefault(); select(go, true); }
    });
  });
  mq.addEventListener("change", setMode);
  setMode();
}

// 2. Call bar: slides in once the hero call buttons have left the screen.
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const heroActions = document.querySelector<HTMLElement>("[data-hero-actions]");
if (bar && heroActions && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => {
    const passed = !e.isIntersecting && e.boundingClientRect.top < 0;
    bar.classList.toggle("is-shown", passed);
    if (!passed) bar.querySelector<HTMLDetailsElement>("details")?.removeAttribute("open");
  }).observe(heroActions);
} else if (bar) {
  bar.classList.add("is-shown");
}
