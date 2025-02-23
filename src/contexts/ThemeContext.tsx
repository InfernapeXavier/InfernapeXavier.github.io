"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preferences
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setIsDark(prefersDark);
    setIsReducedMotion(prefersReducedMotion);

    // Listen for system preference changes
    const darkModeListener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    const motionListener = (e: MediaQueryListEvent) =>
      setIsReducedMotion(e.matches);

    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    darkModeMedia.addEventListener("change", darkModeListener);
    motionMedia.addEventListener("change", motionListener);

    return () => {
      darkModeMedia.removeEventListener("change", darkModeListener);
      motionMedia.removeEventListener("change", motionListener);
    };
  }, []);

  useEffect(() => {
    // Update CSS variables and classes based on theme
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isReducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
