"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExploreItem {
  id: string;
  title: string;
  sub: string;
  tags: string[];
  imageUrl?: string;
  linkedProject?: {
    _id: string;
    title: string;
    brand?: string;
    agency?: string;
    year?: string;
    tags?: string[];
    description?: string;
  } | null;
}

interface LayoutItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// ─── Seeded pseudo-random (deterministisch, kein Layout-Shift) ────────────────
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─── Auto-Platzierung + Größen-Randomizing ────────────────────────────────────
// Neue CMS-Items werden automatisch auf dem Canvas platziert.
// Position + Größe sind deterministisch (kein Layout-Shift beim Reload).
function computeLayout(items: ExploreItem[]): LayoutItem[] {
  const COLS      = 5;
  const BASE_W    = 175;
  const BASE_H    = 135;
  const GAP_X     = 65;
  const GAP_Y     = 75;
  const OFFSET_X  = 65;
  const OFFSET_Y  = 65;
  const VARIATION = 0.28;

  return items.map((item, i) => {
    const rng  = seededRandom(i * 7 + 13);
    const col  = i % COLS;
    const row  = Math.floor(i / COLS);

    const jitterX = (rng() - 0.5) * GAP_X * 0.7;
    const jitterY = (rng() - 0.5) * GAP_Y * 0.5;

    const wVariance = 1 + (rng() - 0.5) * 2 * VARIATION;
    const hVariance = 1 + (rng() - 0.5) * 2 * VARIATION;

    return {
      id:  item.id,
      x:   Math.round(OFFSET_X + col * (BASE_W + GAP_X) + jitterX),
      y:   Math.round(OFFSET_Y + row * (BASE_H + GAP_Y) + jitterY),
      w:   Math.round(BASE_W * wVariance),
      h:   Math.round(BASE_H * hVariance),
    };
  });
}

// ─── Tags aus Items sammeln ───────────────────────────────────────────────────
function collectTags(items: ExploreItem[]): string[] {
  const set = new Set<string>();
  items.forEach(it => it.tags?.forEach(t => set.add(t)));
  return Array.from(set).sort();
}

// ─── Keine Platzhalter — nur echte CMS-Items ─────────────────────────────────
const CMS_ITEMS: ExploreItem[] = [];

// ─────────────────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const canvasRef    = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const startY       = useRef(0);
  const scrollLeft   = useRef(0);
  const scrollTop    = useRef(0);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatedRef  = useRef(false);

  const [overlay, setOverlay]       = useState<ExploreItem | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [items]                     = useState<ExploreItem[]>(CMS_ITEMS);

  const allTags      = collectTags(items);
  const visibleItems = activeTags.length === 0
    ? items
    : items.filter(it => activeTags.some(t => it.tags?.includes(t)));

  const layout  = computeLayout(visibleItems);
  const canvasW = Math.max(1600, layout.reduce((m, l) => Math.max(m, l.x + l.w + 120), 0));
  const canvasH = Math.max(900,  layout.reduce((m, l) => Math.max(m, l.y + l.h + 120), 0));

  // ── Tag-Selektion ──────────────────────────────────────────────────────────
  // ALL → alle deselektieren; Tag → togglen (ALL deaktiviert sich automatisch)
  const handleTagClick = useCallback((tag: string) => {
    if (tag === "all") {
      setActiveTags([]);
    } else {
      setActiveTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    }
  }, []);

  // ── Eingangsanimation: Elemente von links nach rechts ─────────────────────
  useEffect(() => {
    if (animatedRef.current || visibleItems.length === 0) return;
    animatedRef.current = true;

    const sorted = visibleItems
      .map((item, i) => ({ i, x: layout[i]?.x ?? 0 }))
      .sort((a, b) => a.x - b.x);

    sorted.forEach(({ i }, order) => {
      const el = itemRefs.current[i];
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.86, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, delay: 0.04 + order * 0.055, ease: "power3.out" }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  // ── Drift-Animation ────────────────────────────────────────────────────────
  useEffect(() => {
    visibleItems.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, {
        y: `+=${6 + (i % 3) * 3}`,
        x: `+=${3 + (i % 2) * 2}`,
        duration: 5 + i * 0.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  // ── Parallax auf Vorschaubilder (wie Projektvorschau Startseite) ──────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleScroll = () => {
      const sy = canvas.scrollTop;
      parallaxRefs.current.forEach((inner, i) => {
        if (!inner) return;
        gsap.to(inner, {
          yPercent: sy * 0.016 * (i % 2 === 0 ? 1 : -0.6),
          duration: 0.5,
          ease: "none",
          overwrite: "auto",
        });
      });
    };
    canvas.addEventListener("scroll", handleScroll, { passive: true });
    return () => canvas.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Drag-to-Pan ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current     = e.pageX - el.offsetLeft;
      startY.current     = e.pageY - el.offsetTop;
      scrollLeft.current = el.scrollLeft;
      scrollTop.current  = el.scrollTop;
      el.style.cursor    = "grabbing";
    };
    const onUp = () => {
      isDragging.current = false;
      el.style.cursor    = "grab";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current);
      el.scrollTop  = scrollTop.current  - (e.pageY - el.offsetTop  - startY.current);
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", top: "7rem", left: "2.5rem", zIndex: 10, pointerEvents: "none" }}>
        <p className="label" style={{ marginBottom: "0.5rem" }}>Explore</p>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-muted)" }}>
          Drag to navigate · Click to open
        </p>
      </div>

      {/* ── Tags-Filter ────────────────────────────────────────────────────── */}
      {allTags.length > 0 && (
        <div
          style={{
            position: "absolute", top: "7rem", right: "2.5rem", zIndex: 10,
            display: "flex", flexWrap: "wrap", gap: "0.4rem",
            maxWidth: "50vw", justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => handleTagClick("all")}
            className={`tag${activeTags.length === 0 ? " active" : ""}`}
            style={{ cursor: "none" }}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag${activeTags.includes(tag) ? " active" : ""}`}
              style={{ cursor: "none" }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* ── Infinite Canvas ────────────────────────────────────────────────── */}
      <div
        ref={canvasRef}
        style={{
          width: "100%", height: "100%", overflow: "auto",
          cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative",
        }}
      >
        <div style={{ width: canvasW, height: canvasH, position: "relative" }}>

          {/* Subtle grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px", opacity: 0.3, pointerEvents: "none",
          }} />

          {visibleItems.map((item, i) => (
            <ExploreCard
              key={item.id}
              item={item}
              pos={layout[i]}
              itemRef={el => { itemRefs.current[i] = el; }}
              parallaxRef={el => { parallaxRefs.current[i] = el; }}
              onClick={() => setOverlay(item)}
            />
          ))}

          {/* Leer-State */}
          {visibleItems.length === 0 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <p className="label">
                {activeTags.length > 0
                  ? "Keine Elemente für diese Tags"
                  : "Explore-Elemente werden im Sanity Studio hinzugefügt"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail-Overlay ─────────────────────────────────────────────────── */}
      {overlay && <ExploreOverlay item={overlay} onClose={() => setOverlay(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ExploreCard — Kachel mit Parallax + Hover-Frame-Expand
// ─────────────────────────────────────────────────────────────────────────────
function ExploreCard({
  item, pos, itemRef, parallaxRef, onClick,
}: {
  item: ExploreItem;
  pos: LayoutItem;
  itemRef: (el: HTMLDivElement | null) => void;
  parallaxRef: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!frameRef.current) return;
    // Parallax-Frame vergrößern → mehr Bild sichtbar (kein Element-Scale)
    gsap.to(frameRef.current, { width: pos.w + 20, height: pos.h + 20, duration: 0.35, ease: "power2.out" });
    const label = frameRef.current.querySelector<HTMLElement>(".card-label");
    if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, { width: pos.w, height: pos.h, duration: 0.4, ease: "power2.inOut" });
    const label = frameRef.current.querySelector<HTMLElement>(".card-label");
    if (label) gsap.to(label, { opacity: 0, y: 6, duration: 0.2 });
  };

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "absolute", left: pos.x, top: pos.y, width: pos.w, height: pos.h, cursor: "none" }}
    >
      {/* Parallax-Frame (overflow:hidden zeigt beim Hover mehr Bild) */}
      <div
        ref={frameRef}
        style={{
          width: pos.w, height: pos.h,
          overflow: "hidden", position: "relative",
          background: "var(--color-surface)",
          // Kein Border — keine Kontur um Bilder
        }}
      >
        {/* Parallax-Inner — größer als Frame */}
        <div
          ref={parallaxRef}
          style={{
            position: "absolute", inset: "-10%",
            backgroundImage:    item.imageUrl ? `url(${item.imageUrl})` : undefined,
            backgroundColor:    item.imageUrl ? undefined : "var(--color-surface)",
            backgroundSize:     "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Label on Hover */}
        <div
          className="card-label"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding:  "0.75rem",
            background: "linear-gradient(transparent, rgba(8,8,8,0.88))",
            opacity: 0, transform: "translateY(6px)",
          }}
        >
          <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.3 }}>
            {item.title}
          </span>
          <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-muted)", marginTop: "0.2rem" }}>
            {item.sub}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ExploreOverlay — Detail-Popup (eigenes Element oder verknüpftes Projekt)
// ─────────────────────────────────────────────────────────────────────────────
function ExploreOverlay({ item, onClose }: { item: ExploreItem; onClose: () => void }) {
  const proj = item.linkedProject;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)",
        zIndex: 800, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(640px, 90vw)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          padding: "2.5rem",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <p className="label" style={{ marginBottom: "0.5rem" }}>
              {proj ? (proj.brand ?? proj.title) : item.sub}
            </p>
            <h2>{proj ? proj.title : item.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="btn"
            style={{ fontSize: "0.875rem", color: "var(--color-muted)", background: "none", border: "none", marginTop: "0.5rem", cursor: "none" }}
          >
            [ close ]
          </button>
        </div>

        {/* Bild */}
        <div style={{ background: "var(--color-bg)", aspectRatio: "16/9", marginBottom: "1.5rem", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {item.imageUrl
            ? <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span className="label">{proj ? "Projekt-Bilder via Sanity" : "Bilder via Sanity"}</span>
          }
        </div>

        {/* Meta (nur bei verknüpftem Projekt) */}
        {proj && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
            {[["Client", proj.brand ?? "—"], ["Agency", proj.agency ?? "—"], ["Year", proj.year ?? "—"]].map(([label, val]) => (
              <div key={label}>
                <p className="label" style={{ marginBottom: "0.25rem" }}>{label}</p>
                <p style={{ fontSize: "0.9375rem", fontWeight: 700 }}>{val}</p>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="copy">
          {proj
            ? (proj.description ?? "Projektbeschreibung wird via Sanity CMS befüllt.")
            : "Beschreibung wird via Sanity CMS befüllt."}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.5rem" }}>
          {(proj?.tags ?? item.tags ?? []).map((tag: string) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
