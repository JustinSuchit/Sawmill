"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["#products", "Products"],
  ["#services", "Services"],
  ["#about", "About"],
  ["#gallery", "Projects / Gallery"],
  ["#contact", "Contact"]
] as const;

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("industrial-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const nextTheme = getPreferredTheme();
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("industrial-theme", nextTheme);
  }

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} data-header>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">TT</span>
          <span>
            <strong>Company Name</strong>
            <small>Materials &middot; Sawmill &middot; Haulage</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
          <span className="sr-only">Open menu</span>
        </button>
        <div className={`nav-menu${menuOpen ? " open" : ""}`} id="nav-menu">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a className="nav-cta" href="#quote" onClick={() => setMenuOpen(false)}>Request a Quote</a>
        </div>
      </nav>
    </header>
  );
}
