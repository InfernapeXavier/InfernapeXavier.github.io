"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaFilePdf } from "react-icons/fa";

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
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rose-pine-surface/80 backdrop-blur-md border-b border-rose-pine-highlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider text-rose-pine-text hover:text-rose-pine-foam transition-colors"
            >
              <span className="text-gradient">Rohit Choudhari</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${
                  pathname === link.href ? "nav-link-active" : ""
                }`}
                {...(link.external && {
                  target: "_blank",
                  rel: "noreferrer",
                })}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
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
        className={`${
          isMenuOpen ? "animate-slide-down" : "hidden"
        } md:hidden bg-rose-pine-surface/80 backdrop-blur-md border-b border-rose-pine-highlight`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link block ${
                pathname === link.href ? "nav-link-active" : ""
              }`}
              {...(link.external && {
                target: "_blank",
                rel: "noreferrer",
              })}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
