import { useEffect, useCallback } from "react";

interface KeyboardNavOptions {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
  onTab?: (event: KeyboardEvent) => void;
}

export function useKeyboardNav(options: KeyboardNavOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          options.onArrowUp?.();
          break;
        case "ArrowDown":
          event.preventDefault();
          options.onArrowDown?.();
          break;
        case "ArrowLeft":
          event.preventDefault();
          options.onArrowLeft?.();
          break;
        case "ArrowRight":
          event.preventDefault();
          options.onArrowRight?.();
          break;
        case "Escape":
          options.onEscape?.();
          break;
        case "Enter":
          options.onEnter?.();
          break;
        case "Tab":
          options.onTab?.(event);
          break;
      }
    },
    [options]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
