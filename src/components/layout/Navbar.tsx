"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaFilePdf, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";

const navLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/uses", label: "Uses" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isDark, toggleTheme, isReducedMotion } = useTheme();

  useKeyboardNav({
    onEscape: () => setIsMenuOpen(false),
    onTab: (event) => {
      if (!isMenuOpen || !menuRef.current) return;
      const elements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button[type="button"]'
      );
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    },
  });

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-theme-highlight bg-theme-base/90 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Rohit Choudhari, home"
        >
          <span className="grid h-9 w-9 place-items-center bg-theme-text font-mono text-xs font-bold text-theme-base">
            RC
          </span>
          <span className="hidden font-mono text-xs font-semibold uppercase tracking-[0.16em] text-theme-text sm:block">
            Rohit Choudhari
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://bit.ly/rohitcresume"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            aria-label="Resume (opens in a new tab)"
          >
            <FaFilePdf aria-hidden="true" /> Resume
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 grid h-10 w-10 place-items-center border border-theme-highlight hover:border-theme-text"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {isDark ? (
              <FaSun aria-hidden="true" />
            ) : (
              <FaMoon aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center border border-theme-highlight"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {isDark ? (
              <FaSun aria-hidden="true" />
            ) : (
              <FaMoon aria-hidden="true" />
            )}
          </button>
          <button
            id="mobile-menu-button"
            type="button"
            className="grid h-10 w-10 place-items-center border border-theme-highlight"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle main menu</span>
            {isMenuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-button"
        className={`${isMenuOpen ? (isReducedMotion ? "block" : "animate-slide-down") : "hidden"} border-t border-theme-highlight bg-theme-base px-6 py-5 md:hidden`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://bit.ly/rohitcresume"
            target="_blank"
            rel="noreferrer"
            className="nav-link py-3"
          >
            <FaFilePdf aria-hidden="true" /> Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
