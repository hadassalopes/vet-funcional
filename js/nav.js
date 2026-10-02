document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]').forEach((link) => {
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const drop = document.querySelector(".menu-drop");
const dropBtn = document.querySelector(".menu-drop-btn");

function closeDrop() {
  if (!drop || !dropBtn) return;
  drop.classList.remove("is-open");
  dropBtn.setAttribute("aria-expanded", "false");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (!open) closeDrop();
  });
}

if (drop && dropBtn) {
  dropBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = drop.classList.toggle("is-open");
    dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!drop.contains(event.target)) closeDrop();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrop();
  });
}
