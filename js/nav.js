document.querySelectorAll('a[href^="http"], a[href^="mailto:"]').forEach((link) => {
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Fechar" : "Menu";
  });
}
