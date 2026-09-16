const root = document.documentElement;
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const storedTheme = localStorage.getItem("industrial-theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("industrial-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}

setTheme(storedTheme || (preferredDark ? "dark" : "light"));

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = !menu.classList.contains("open");
  menu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    galleryItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

const form = document.querySelector("[data-quote-form]");
const status = document.querySelector("[data-form-status]");

function setError(field, message) {
  field.classList.add("error");
  field.setAttribute("aria-invalid", "true");
  status.textContent = message;
}

function clearErrors() {
  status.textContent = "";
  status.classList.remove("success");
  form.querySelectorAll(".error").forEach((field) => {
    field.classList.remove("error");
    field.removeAttribute("aria-invalid");
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const requiredFields = [...form.querySelectorAll("[required]")];
  const emptyField = requiredFields.find((field) => !field.value.trim());
  if (emptyField) {
    setError(emptyField, "Please complete all required fields before submitting.");
    emptyField.focus();
    return;
  }

  const email = form.elements.email;
  if (!email.validity.valid) {
    setError(email, "Please enter a valid email address.");
    email.focus();
    return;
  }

  status.textContent = "Your quote request is ready. Connect this form to email, CRM or backend handling before launch.";
  status.classList.add("success");
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
