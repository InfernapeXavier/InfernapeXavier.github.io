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

const THEME_KEY = "theme-preference";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true); // Default to dark theme
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get stored theme preference
    const storedTheme = localStorage.getItem(THEME_KEY);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Set initial theme - always default to dark unless explicitly set to light
    setIsDark(storedTheme !== "light");
    setIsReducedMotion(prefersReducedMotion);
    setIsInitialized(true);

    // Listen for system preference changes
    const motionListener = (e: MediaQueryListEvent) =>
      setIsReducedMotion(e.matches);

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionMedia.addEventListener("change", motionListener);

    return () => {
      motionMedia.removeEventListener("change", motionListener);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Update CSS classes and store preference
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark, isInitialized]);

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
