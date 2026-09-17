"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  ["/", "Home"],
  ["/products", "Tools"],
  ["/lumber", "Lumber"],
  ["/steel", "Steel"],
  ["/services", "Services"],
  ["/contact", "Contact"],
] as const;

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("industrial-theme");

  if (stored === "dark") {
    return "dark";
  }

  if (stored === "light") {
    return "light";
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const preferredTheme = getPreferredTheme();

    setThemeState(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    document.documentElement.dataset.theme = theme;
  }, [theme, mounted]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 12) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function changeTheme() {
    const nextTheme: Theme =
      theme === "dark" ? "light" : "dark";

    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("industrial-theme", nextTheme);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  let headerClassName = "site-header";

  if (scrolled) {
    headerClassName = "site-header scrolled";
  }

  let navMenuClassName = "nav-menu";

  if (menuOpen) {
    navMenuClassName = "nav-menu open";
  }

  let themeLabel = "Theme";
  let themeAriaLabel = "Toggle theme";

  if (mounted) {
    if (theme === "dark") {
      themeLabel = "Light";
      themeAriaLabel = "Switch to light theme";
    } else {
      themeLabel = "Dark";
      themeAriaLabel = "Switch to dark theme";
    }
  }

  return (
    <header
      className={headerClassName}
      data-header
    >
      <nav
        className="nav-shell"
        aria-label="Main navigation"
      >
        <Link
          className="brand"
          href="/"
          aria-label="Home"
          onClick={closeMenu}
        >
          <span
            className="brand-mark"
            aria-hidden="true"
          >
            TT
          </span>

          <span>
            <strong>Company Name</strong>
            <small>
              Materials · Sawmill · Haulage
            </small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span />
          <span />
          <span />

          <span className="sr-only">
            {menuOpen
              ? "Close menu"
              : "Open menu"}
          </span>
        </button>

        <div
          className={navMenuClassName}
          id="nav-menu"
        >
          {navItems.map(
            ([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href
                    ? "page"
                    : undefined
                }
                onClick={closeMenu}
              >
                {label}
              </Link>
            )
          )}

          <button
            className="theme-toggle"
            type="button"
            aria-label={themeAriaLabel}
            onClick={changeTheme}
          >
            {themeLabel}
          </button>

          <Link
            className="nav-cta"
            href="/quote"
            onClick={closeMenu}
          >
            Request a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}

