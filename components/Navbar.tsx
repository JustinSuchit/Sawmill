"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { business } from "@/lib/business";

const navItems = [
  ["/", "Home"],
  ["/products", "Tools"],
  ["/lumber", "Lumber"],
  ["/steel", "Sleepers"],
  ["/services", "Services"],
  ["/contact", "Contact"],
] as const;

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem("industrial-theme");
  } catch {
    // System preference still works when browser storage is unavailable.
  }

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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 1100px)");
    const resetMenu = () => setMenuOpen(false);
    breakpoint.addEventListener("change", resetMenu);
    return () => breakpoint.removeEventListener("change", resetMenu);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") || [])].filter((item): item is HTMLElement => Boolean(item));
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("keydown", handleKey); };
  }, [menuOpen]);

  useEffect(() => {
    const preferredTheme = getPreferredTheme();

    document.documentElement.dataset.theme = preferredTheme;

    const mountTimer = window.setTimeout(() => {
      setThemeState(preferredTheme);
      setMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(mountTimer);
    };
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
    try {
      window.localStorage.setItem("industrial-theme", nextTheme);
    } catch {
      // Keep the selected theme for this page even without persistent storage.
    }
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

  const darkModeOn = mounted && theme === "dark";

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
            JC
          </span>

          <span>
            <strong>{business.name}</strong>
            <small>
              Materials · Sawmill · Haulage
            </small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          ref={toggleRef}
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
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}

          <span className="sr-only">
            {menuOpen
              ? "Close menu"
              : "Open menu"}
          </span>
        </button>

        <div
          className={navMenuClassName}
          ref={menuRef}
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

          <div className="theme-toggle-wrap">
            <span className="theme-toggle-label">Theme</span>
            <button
              className="theme-toggle"
              type="button"
              role="switch"
              aria-checked={darkModeOn}
              aria-label="Dark mode"
              title="Toggle dark mode"
              onClick={changeTheme}
            >
              <span className="theme-switch" aria-hidden="true">
                <span className="theme-switch-thumb" />
              </span>
            </button>
          </div>

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
