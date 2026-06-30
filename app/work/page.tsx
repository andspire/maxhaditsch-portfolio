"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Project data (replace with Sanity) ──────────────────────────────────────
const WORKS = [
  {
    num: "01",
    title: "Andspire Brand Identity",
    tags: ["Brand Strategy", "Identity Design", "Web"],
    agency: "Independent",
    brand: "Andspire e.U.",
    year: "2024",
    bg: "#161612",
    href: "/work/andspire",
  },
  {
    num: "02",
    title: "Visual Identity System",
    tags: ["Identity Design", "Art Direction"],
    agency: "Studio XYZ",
    brand: "Undisclosed",
    year: "2023",
    bg: "#1A1612",
    href: "/work/visual-identity",
  },
  {
    num: "03",
    title: "Wayfinding & Signage System",
    tags: ["Wayfinding", "Environmental Design", "Typography"],
    agency: "Undisclosed",
    brand: "Undisclosed",
    year: "2022",
    bg: "#121618",
    href: "/work/wayfinding",
  },
  {
    num: "04",
    title: "Editorial Brand Design",
    tags: ["Brand Design", "Art Direction", "Print"],
    agency: "Studio XYZ",
    brand: "Undisclosed",
    year: "2022",
    bg: "#181516",
    href: "/work/editorial",
  },
  {
    num: "05",
    title: "Digital Brand Experience",
    tags: ["Brand Strategy", "Web Design", "Motion"],
    agency: "Independent",
    brand: "Undisclosed",
    year: "2021",
    bg: "#141618",
    href: "/work/digital-experience",
  },
];

export default function WorkPage() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from(titleRef.current, {
        y: "80%",
        duration: 1.1,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.35,
      });

      // Scroll-triggered reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Parallax on thumbnails
      parallaxRefs.current.forEach(img => {
        if (!img) return;
        gsap.to(img, {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ paddingTop: "8rem", minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 1100px) {
          .work-item {
            grid-template-columns: 1fr !important;
          }
          .work-num {
            display: none;
          }
          .work-thumb-wrap {
            grid-column: 1 / -1 !important;
          }
          .work-meta {
            grid-column: 1 / -1 !important;
            padding-left: 0 !important;
          }
        }
      `}</style>

      {/* ── HEADER ───────────────────────────────── */}
      <section style={{ padding: "0 2.5rem 6rem", display: "grid", gridTemplateColumns: "repeat(12, 1fr)", columnGap: "1.5rem", alignItems: "end" }}>

        <div style={{ gridColumn: "1 / 9", overflow: "hidden" }}>
          <h1
            ref={titleRef}
            style={{
              fontSize: "clamp(3rem, 9vw, 8.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              display: "inline-block",
            }}
          >
            Case Studies
          </h1>
        </div>

        <div style={{ gridColumn: "10 / 13", alignSelf: "end", paddingBottom: "0.4rem" }}>
          <p
            ref={subtitleRef}
            style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--color-muted)", letterSpacing: "0.04em" }}
          >
            Selected projects —<br />brand strategy, identity,<br />art direction &amp; web.
          </p>
        </div>
      </section>

      {/* ── WORK LIST ────────────────────────────── */}
      <section style={{ padding: "0 2.5rem 7.5rem" }}>

        {/* Column header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "1.5rem",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0.6rem 0",
          marginBottom: "0",
        }}>
          <span style={{ gridColumn: "1 / 2", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}>Nr.</span>
          <span style={{ gridColumn: "2 / 7", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}>Project</span>
          <span style={{ gridColumn: "7 / 12", paddingLeft: "2rem", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}>Details</span>
        </div>

        {WORKS.map((work, i) => (
          <div
            key={work.num}
            className="reveal work-item"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              columnGap: "1.5rem",
              borderBottom: "1px solid var(--color-border)",
              padding: "4rem 0",
              alignItems: "stretch",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            {/* Number */}
            <span className="work-num" style={{
              gridColumn: "1 / 2",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              paddingTop: "0.15rem",
              letterSpacing: "0.06em",
            }}>
              {work.num}
            </span>

            {/* Thumbnail */}
            <div
              className="work-thumb-wrap"
              style={{
                gridColumn: i % 2 === 0 ? "2 / 7" : "4 / 9",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                position: "relative",
                background: "var(--color-surface)",
              }}
            >
              <div
                ref={el => { parallaxRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: "-15%",
                  background: work.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>

            {/* Meta */}
            <div
              className="work-meta"
              style={{
                gridColumn: i % 2 === 0 ? "7 / 12" : "9 / 13",
                paddingLeft: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}>
                {work.title}
              </h3>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                {work.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <dl style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 2.2 }}>
                <dt style={{ display: "inline", letterSpacing: "0.06em", marginRight: "0.5rem" }}>Agency</dt>
                <dd style={{ display: "inline", color: "var(--color-text)", marginRight: "2rem" }}>{work.agency}</dd>
                <dt style={{ display: "inline", letterSpacing: "0.06em", marginRight: "0.5rem" }}>Brand</dt>
                <dd style={{ display: "inline", color: "var(--color-text)", marginRight: "2rem" }}>{work.brand}</dd>
                <dt style={{ display: "inline", letterSpacing: "0.06em", marginRight: "0.5rem" }}>Year</dt>
                <dd style={{ display: "inline", color: "var(--color-text)" }}>{work.year}</dd>
              </dl>

              {/* Link */}
              <Link
                href={work.href}
                className="hover-line"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                  marginTop: "auto",
                  paddingTop: "1.5rem",
                  borderBottom: "1px solid var(--color-border)",
                  paddingBottom: "0.2rem",
                  alignSelf: "flex-start",
                  transition: "border-color 0.2s ease",
                }}
              >
                View Case Study →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", letterSpacing: "0.06em" }}>
          © Max Haditsch 2025 — Vienna, Austria
        </p>
        <nav style={{ display: "flex", gap: "2rem" }}>
          {[["Email", "mailto:hello@maxhaditsch.com"], ["LinkedIn", "#"], ["Instagram", "#"]].map(([label, href]) => (
            <Link key={label} href={href} className="hover-line" style={{ fontSize: "0.875rem", color: "var(--color-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {label}
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}
