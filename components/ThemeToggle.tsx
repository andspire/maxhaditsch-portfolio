"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Sync with what the inline script already set on <html>
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      sessionStorage.setItem("theme", next);
    } catch (e) {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        fontSize: "0.875rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--color-muted)",
        background: "none",
        border: "none",
        lineHeight: 1,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
    >
      {theme === "dark" ? "[ light ]" : "[ dark ]"}
    </button>
  );
}
