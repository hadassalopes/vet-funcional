document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]').forEach((link) => {
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const drops = [...document.querySelectorAll(".menu-drop")];

function closeDrop(except) {
  drops.forEach((drop) => {
    if (drop === except) return;
    drop.classList.remove("is-open");
    const btn = drop.querySelector(".menu-drop-btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (!open) closeDrop();
  });
}

function rowWidth() {
  const headerStyle = getComputedStyle(header);
  const headerGap = parseFloat(headerStyle.columnGap) || parseFloat(headerStyle.gap) || 0;
  const pad = parseFloat(headerStyle.paddingLeft) + parseFloat(headerStyle.paddingRight);
  const logo = header.querySelector(".logo").offsetWidth;
  const agende = header.querySelector(".btn-agende").offsetWidth;
  const navStyle = getComputedStyle(nav);
  const navGap = parseFloat(navStyle.columnGap) || parseFloat(navStyle.gap) || 0;
  const kids = [...nav.children];
  let links = 0;
  kids.forEach((el, index) => {
    links += el.offsetWidth;
    if (index) links += navGap;
  });
  return pad + logo + links + agende + headerGap * 2;
}

function fitMenu() {
  if (!header || !nav) return;
  const wasOpen = nav.classList.contains("is-open");
  header.classList.remove("is-compact");
  const compact = rowWidth() > header.clientWidth + 1;
  header.classList.toggle("is-compact", compact);
  if (!compact && wasOpen && toggle) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    closeDrop();
  }
}

fitMenu();
window.addEventListener("resize", fitMenu);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitMenu);

drops.forEach((drop) => {
  const btn = drop.querySelector(".menu-drop-btn");
  if (!btn) return;

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const open = !drop.classList.contains("is-open");
    closeDrop();
    drop.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-drop")) closeDrop();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrop();
});
