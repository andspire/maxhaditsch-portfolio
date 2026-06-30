"use client";

/**
 * Search.tsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Volltextsuche für Portfolio:
 * - Sucht in Projekten (title, brand, agency, tags, description)
 * - Sucht in Explore-Elementen (title, sub/category, tags)
 * - Öffnet via ⌘K / Ctrl+K (integriert mit bestehender CommandPalette-Logik)
 * - Kann auch standalone über das `open`-Prop gesteuert werden
 *
 * Verwendung in layout.tsx oder auf Seiten, wo die Suche verfügbar sein soll:
 *   import { Search } from "@/components/Search"
 *   <Search />
 *
 * Daten-Anbindung:
 * Ersetze PROJECTS und EXPLORE_ITEMS unten mit echten Sanity-Daten.
 * z.B. via React Query, useSWR, oder direktem fetch in einem Server Component
 * das die Daten als Props übergibt.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// ─── Typen ────────────────────────────────────────────────────────────────────
interface SearchResult {
  id:       string;
  title:    string;
  subtitle: string;
  type:     "project" | "explore";
  tags:     string[];
  href?:    string;
}

// ─── Statische Daten (werden durch Sanity-Daten ersetzt) ─────────────────────
// Projekte: aus Sanity via getProjects()
const PROJECTS: SearchResult[] = [
  // { id: "wurmb", title: "Wurmb", subtitle: "Brand Identity", type: "project", tags: ["Identity Design", "Logo Design"], href: "/work/wurmb" },
  // Weitere Projekte hier oder via Sanity-Fetch
];

// Explore-Items: aus Sanity via getExploreItems()
const EXPLORE_ITEMS: SearchResult[] = [
  // { id: "saigon-logo", title: "Saigon Logo", subtitle: "Logo", type: "explore", tags: ["Logo Design"] },
];

// Alle suchbaren Items
const ALL_SEARCH_ITEMS: SearchResult[] = [...PROJECTS, ...EXPLORE_ITEMS];

// ─── Volltext-Score (Relevanz) ────────────────────────────────────────────────
function score(item: SearchResult, query: string): number {
  const q   = query.toLowerCase().trim();
  if (!q) return 1;

  let s = 0;
  const title    = item.title.toLowerCase();
  const subtitle = item.subtitle.toLowerCase();
  const tags     = item.tags.map(t => t.toLowerCase());

  // Exakter Treffer im Titel → höchste Priorität
  if (title === q)                           s += 100;
  // Beginnt mit Query
  if (title.startsWith(q))                  s += 60;
  // Titel enthält Query
  if (title.includes(q))                    s += 40;
  // Subtitle enthält Query
  if (subtitle.includes(q))                 s += 20;
  // Tag exakter Treffer
  if (tags.some(t => t === q))              s += 50;
  // Tag enthält Query
  if (tags.some(t => t.includes(q)))        s += 25;

  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
export function Search({
  externalItems,
  open: externalOpen,
  onClose: externalOnClose,
}: {
  externalItems?: SearchResult[];
  open?: boolean;
  onClose?: () => void;
} = {}) {
  const items = externalItems ?? ALL_SEARCH_ITEMS;

  const [open, setOpen]         = useState(externalOpen ?? false);
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);
  const overlayRef              = useRef<HTMLDivElement>(null);
  const panelRef                = useRef<HTMLDivElement>(null);

  // Sync mit externem open-Prop
  useEffect(() => {
    if (externalOpen !== undefined) setOpen(externalOpen);
  }, [externalOpen]);

  const closeSearch = useCallback(() => {
    if (externalOnClose) externalOnClose();
    else setOpen(false);
    setQuery("");
    setSelected(0);
  }, [externalOnClose]);

  // ⌘K / Ctrl+K öffnen (wenn kein externes open-Prop übergeben)
  useEffect(() => {
    if (externalOpen !== undefined) return; // Extern gesteuert → eigene Shortcuts deaktivieren
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        // Nicht mit bestehender CommandPalette kollidieren:
        // Search nur öffnen wenn Shift gedrückt, sonst CommandPalette
        if (e.shiftKey) {
          e.preventDefault();
          setOpen(v => !v);
        }
      }
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [externalOpen, closeSearch]);

  // Focus bei Öffnen + Animations
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      if (overlayRef.current && panelRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        gsap.fromTo(panelRef.current, { opacity: 0, y: -16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" });
      }
    }
  }, [open]);

  // Gefilterte + sortierte Ergebnisse
  const results = items
    .map(item => ({ item, s: score(item, query) }))
    .filter(r => query === "" || r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map(r => r.item)
    .slice(0, 12);

  // Tastaturnavigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      const r = results[selected];
      if (r?.href) {
        window.location.href = r.href;
        closeSearch();
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={closeSearch}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(8,8,8,0.7)",
        backdropFilter: "blur(8px)",
        zIndex: 900,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
      }}
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(560px, 90vw)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        {/* Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKey}
            placeholder="Projekte, Explore-Elemente, Tags durchsuchen…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "0.9375rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              color: "var(--color-text)",
              cursor: "none",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="label"
              style={{ background: "none", border: "none", cursor: "none", fontSize: "0.75rem" }}
            >
              clear
            </button>
          )}
        </div>

        {/* Ergebnisse */}
        <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {results.length === 0 ? (
            <div style={{ padding: "2rem 1.25rem", textAlign: "center" }}>
              <p className="label">Keine Ergebnisse für „{query}"</p>
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.id}
                onClick={() => { if (r.href) window.location.href = r.href; closeSearch(); }}
                onMouseEnter={() => setSelected(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "0.85rem 1.25rem",
                  background: selected === i ? "var(--color-border)" : "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--color-border)",
                  cursor: "none",
                  textAlign: "left",
                  transition: "background 0.15s ease",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {r.title}
                  </p>
                  <p className="label" style={{ marginTop: "0.15rem", fontSize: "0.75rem" }}>
                    {r.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
                  {r.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag" style={{ fontSize: "0.7rem", padding: "0.15rem 0.4rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Typ-Badge */}
                <span className="label" style={{ fontSize: "0.7rem", flexShrink: 0 }}>
                  {r.type === "project" ? "Projekt" : "Explore"}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            padding: "0.75rem 1.25rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {[["↑↓", "navigieren"], ["↵", "öffnen"], ["esc", "schließen"]].map(([key, label]) => (
            <span key={key} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <kbd style={{
                fontSize: "0.7rem", fontFamily: "var(--font-sans)", fontWeight: 700,
                padding: "0.15rem 0.4rem",
                border: "1px solid var(--color-border)",
                borderRadius: "2px",
                color: "var(--color-muted)",
              }}>
                {key}
              </kbd>
              <span className="label" style={{ fontSize: "0.7rem" }}>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Export: Suchbare Items-Typen für externe Verwendung ─────────────────────
export type { SearchResult };
