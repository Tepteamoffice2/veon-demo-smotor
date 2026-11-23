// Disclosure menus built on <details> (work without JS): one open at a time, Esc and a tap outside close,
// a link inside the menu closes it before the page scrolls to the anchor.
const menus = Array.from(document.querySelectorAll<HTMLDetailsElement>("details[data-dd]"));

const closeAll = (except?: HTMLDetailsElement) => {
  for (const d of menus) if (d !== except && d.open) d.open = false;
};

for (const d of menus) {
  d.addEventListener("toggle", () => {
    if (d.open) closeAll(d);
    if (d.classList.contains("menu")) document.documentElement.classList.toggle("menu-open", d.open);
  });
  d.querySelectorAll<HTMLAnchorElement>("a[href^='#'], a[data-close]").forEach((a) =>
    a.addEventListener("click", () => { d.open = false; }),
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = menus.find((d) => d.open);
  if (open) {
    open.open = false;
    open.querySelector<HTMLElement>("summary")?.focus();
  }
});

document.addEventListener("click", (e) => {
  const t = e.target as Node;
  for (const d of menus) if (d.open && !d.contains(t)) d.open = false;
});

// Close the menus when the layout switches to desktop.
window.matchMedia("(min-width: 75rem)").addEventListener("change", () => closeAll());
