"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Writing archive" },
  { href: "/uses", label: "Uses" },
  { href: "/anime", label: "Media atlas" },
  { href: "/#contact", label: "Contact" },
  { href: "https://bit.ly/rohitcresume", label: "Resume", external: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { isDark, isReducedMotion, toggleTheme } = useTheme();

  function handleSectionNavigation(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (
      pathname !== "/" ||
      !href.startsWith("/#") ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const section = document.querySelector(href.slice(1));
    if (!section) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    section.scrollIntoView({
      behavior: isReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    if (!isMenuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        aria-label="Main navigation"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setIsMenuOpen(false);
        }}
      >
        <div className={styles.bar}>
          <Link
            href="/"
            className={styles.identity}
            aria-label="Rohit Choudhari — Home"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mark}>
              rc<span>✳</span>
            </span>
            <span>Rohit Choudhari</span>
          </Link>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={toggleTheme}
              className={styles.theme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              <FiSun
                aria-hidden="true"
                className={!isDark ? styles.selected : ""}
              />
              <FiMoon
                aria-hidden="true"
                className={isDark ? styles.selected : ""}
              />
            </button>
            <button
              ref={menuButton}
              type="button"
              className={styles.menuButton}
              aria-controls="main-links"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX aria-hidden="true" />
              ) : (
                <FiMenu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <div
          id="main-links"
          className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              prefetch={
                link.href === "/anime" || link.href === "/manga"
                  ? false
                  : undefined
              }
              className={link.external ? styles.resume : undefined}
              aria-current={pathname === link.href ? "page" : undefined}
              {...(link.external && {
                target: "_blank",
                rel: "noreferrer",
                "aria-label": "Resume (opens in new tab)",
              })}
              onClick={(event) => {
                handleSectionNavigation(event, link.href);
                setIsMenuOpen(false);
              }}
            >
              {link.label}
              {link.external && <FiArrowUpRight aria-hidden="true" />}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
