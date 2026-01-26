"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isReducedMotion: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "theme-preference";

// External store for theme - syncs with localStorage
function getThemeSnapshot(): boolean {
  const stored = localStorage.getItem(THEME_KEY);
  return stored !== "light"; // Default to dark
}

function getThemeServerSnapshot(): boolean {
  return true; // Default to dark on server
}

function subscribeToTheme(callback: () => void): () => void {
  // Listen for storage events from other tabs
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// External store for reduced motion preference
function getMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot(): boolean {
  return false; // Default to no reduced motion on server
}

function subscribeToMotion(callback: () => void): () => void {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const isReducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, newTheme);
    // Dispatch storage event for our own tab (storage events don't fire for same tab)
    window.dispatchEvent(new StorageEvent("storage", { key: THEME_KEY }));
  }, [isDark]);

  // Sync theme class with document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

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
