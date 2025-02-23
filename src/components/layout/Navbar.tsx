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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider hover:text-gray-300 transition-colors"
            >
              Rohit Choudhari
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors
                  ${
                    pathname === link.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition-colors
                ${
                  pathname === link.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300"
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
