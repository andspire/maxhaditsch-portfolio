"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ALL_ITEMS = [
  { label: "Home",                        tag: "Page",    href: "/" },
  { label: "Work — Case Studies",         tag: "Page",    href: "/work" },
  { label: "Explore — Creative Universe", tag: "Page",    href: "/explore" },
  { label: "About",                       tag: "Page",    href: "/about" },
  { label: "Contact",                     tag: "Page",    href: "/contact" },
  { label: "Services",                    tag: "Section", href: "/#services" },
  { label: "Approach",                    tag: "Section", href: "/#approach" },
];

export function CommandPalette() {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router   = useRouter();

  const filtered = ALL_ITEMS.filter(item =>
    !query || item.label.toLowerCase().includes(query.toLowerCase())
  );

  // ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected(i => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected(i => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, selected, filtered]);

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center"
      style={{ background: "rgba(8,8,8,0.82)", backdropFilter: "blur(8px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[480px] overflow-hidden"
        style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)", borderRadius: "4px" }}
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(0); }}
          placeholder="Navigate or search projects…"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid var(--color-border)",
            color: "var(--color-text)",
            fontFamily: "inherit",
            fontSize: "0.9375rem",
            padding: "1rem 1.25rem",
            outline: "none",
          }}
        />
        <ul style={{ listStyle: "none", maxHeight: "280px", overflowY: "auto" }}>
          {filtered.map((item, i) => (
            <li
              key={item.href + item.label}
              onClick={() => navigate(item.href)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1.25rem",
                fontSize: "0.9375rem",
                borderBottom: "1px solid var(--color-border)",
                background: i === selected ? "var(--color-border)" : "transparent",
                color: i === selected ? "var(--color-text)" : "var(--color-muted)",
                transition: "background 0.1s ease, color 0.1s ease",
              }}
              onMouseEnter={() => setSelected(i)}
            >
              <span style={{ letterSpacing: "0.06em" }}>{item.label}</span>
              <span style={{ fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)" }}>
                {item.tag}
              </span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li style={{ padding: "1rem 1.25rem", fontSize: "0.9375rem", color: "var(--color-muted)" }}>
              No results
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
