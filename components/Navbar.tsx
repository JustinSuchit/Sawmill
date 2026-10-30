"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
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
          <Image className="brand-logo" src="/images/jagmohan-sawmill-logo-transparent.webp" alt="Jagmohan Sawmill logo" width={64} height={64} unoptimized loading="eager" />

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

          <div className="nav-contact-links">
            <a className="nav-contact-icon nav-whatsapp" href={business.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Jagmohan Sawmill on WhatsApp (opens in a new tab)" title="Chat on WhatsApp" onClick={closeMenu}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16 3a12 12 0 0 0-10.3 18.2L4 28l7-1.6A12 12 0 1 0 16 3Zm0 2a10 10 0 1 1-4.5 18.9l-.4-.2-4.3 1 1-4.1-.3-.4A10 10 0 0 1 16 5Zm-4.7 5.2c-.3 0-.6.1-.8.4-.7.7-1 1.5-1 2.4 0 2.2 2 4.6 2.4 5 1.4 1.7 3.3 3 5.4 3.5 1.1.3 2.4.1 3.1-.6.5-.5.9-1.3.8-1.7 0-.2-.2-.3-.5-.5l-2.1-1c-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1-1.5-.6-2.7-1.7-3.5-3-.2-.3-.2-.4 0-.6l.6-.8c.2-.3.2-.5.1-.8l-.9-2.2c-.2-.5-.4-.5-.7-.5h-.7Z" />
              </svg>
              <span className="nav-contact-label">WhatsApp</span>
            </a>
            <a className="nav-contact-icon nav-call" href={`tel:${business.telephone}`} aria-label={`Call Jagmohan Sawmill on ${business.phone}`} title={`Call ${business.phone}`} onClick={closeMenu}>
              <Phone size={20} aria-hidden="true" />
              <span className="nav-contact-label">Call {business.phone}</span>
            </a>
          </div>

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
