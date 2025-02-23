"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaFilePdf, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
  {
    href: "https://bit.ly/rohitcresume",
    label: "Resume",
    icon: <FaFilePdf className="inline-block" />,
    external: true,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isDark, toggleTheme, isReducedMotion } = useTheme();

  // Handle keyboard navigation
  useKeyboardNav({
    onEscape: () => setIsMenuOpen(false),
    onTab: (event) => {
      if (isMenuOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button[type="button"]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-rose-pine-surface/80 backdrop-blur-md border-b border-rose-pine-highlight/50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-rose-pine-text hover:text-rose-pine-foam transition-all duration-300"
              aria-label="Home"
            >
              <span className="text-gradient font-mono">RC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link group ${
                  pathname === link.href ? "nav-link-active" : ""
                }`}
                {...(link.external && {
                  target: "_blank",
                  rel: "noreferrer",
                  "aria-label": `${link.label} (opens in new tab)`,
                })}
              >
                {link.icon && (
                  <span
                    className="mr-2 group-hover:scale-110 transition-transform inline-block"
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                )}
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="nav-link"
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {isDark ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="nav-link"
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {isDark ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>
            <button
              type="button"
              className="nav-link"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`${
          isMenuOpen
            ? isReducedMotion
              ? "block"
              : "animate-slide-down"
            : "hidden"
        } md:hidden bg-rose-pine-surface/90 backdrop-blur-md border-b border-rose-pine-highlight/50`}
        id="mobile-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link block group ${
                pathname === link.href ? "nav-link-active" : ""
              }`}
              {...(link.external && {
                target: "_blank",
                rel: "noreferrer",
                "aria-label": `${link.label} (opens in new tab)`,
              })}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              {link.icon && (
                <span
                  className="mr-2 group-hover:scale-110 transition-transform inline-block"
                  aria-hidden="true"
                >
                  {link.icon}
                </span>
              )}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
