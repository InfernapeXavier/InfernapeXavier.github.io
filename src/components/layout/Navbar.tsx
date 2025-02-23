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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rose-pine-surface/80 backdrop-blur-md border-b border-rose-pine-highlight/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-rose-pine-text hover:text-rose-pine-foam transition-all duration-300"
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
                })}
              >
                {link.icon && (
                  <span className="mr-2 group-hover:scale-110 transition-transform inline-block">
                    {link.icon}
                  </span>
                )}
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
        } md:hidden bg-rose-pine-surface/90 backdrop-blur-md border-b border-rose-pine-highlight/50`}
        id="mobile-menu"
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
              })}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && (
                <span className="mr-2 group-hover:scale-110 transition-transform inline-block">
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
