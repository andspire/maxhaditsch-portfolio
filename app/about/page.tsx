"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const firstParaRef  = useRef<HTMLParagraphElement>(null);
  const secondParaRef = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const photoRef      = useRef<HTMLDivElement>(null);
  const rightColRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Alle Elemente initial verstecken
    const targets = [
      labelRef.current,
      firstParaRef.current,
      photoRef.current,
      secondParaRef.current,
      rightColRef.current,
    ].filter(Boolean);

    gsap.set(targets, { opacity: 0, y: 28 });

    // Headline-Wörter initial aus dem Sichtbereich schieben
    const words = headlineRef.current?.querySelectorAll<HTMLSpanElement>(".word") ?? [];
    if (words.length) gsap.set(words, { y: "110%" });

    // ── Eingangsanimation ──────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.05 });

    // Label
    tl.to(labelRef.current, {
      opacity: 1, y: 0,
      duration: 0.7, ease: "power3.out",
    });

    // Headline wortweise — identisch zur H1 auf der Startseite
    if (words.length) {
      tl.to(words, {
        y: "0%",
        duration: 1.0,
        stagger: 0.07,
        ease: "power4.out",
      }, "-=0.4");
    }

    // Erster Absatz — wie hero-sub auf der Startseite
    tl.to(firstParaRef.current, {
      opacity: 1, y: 0,
      duration: 0.9, ease: "power3.out",
    }, "-=0.6");

    // Foto
    tl.to(photoRef.current, {
      opacity: 1, y: 0,
      duration: 0.8, ease: "power3.out",
    }, "-=0.5");

    // Zweiter Absatz (direkt unter Foto — geringer Abstand)
    tl.to(secondParaRef.current, {
      opacity: 1, y: 0,
      duration: 0.8, ease: "power3.out",
    }, "-=0.4");

    // Rechte Spalte
    tl.to(rightColRef.current, {
      opacity: 1, y: 0,
      duration: 0.7, ease: "power3.out",
    }, "-=0.6");

  }, []);

  return (
    <main style={{ paddingTop: "5.5rem", minHeight: "100vh" }}>
      <section
        style={{
          padding: "0 2.5rem 7.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "1.5rem",
        }}
      >
        {/* ── LINKE SPALTE ────────────────────────────── */}
        <div style={{ gridColumn: "1 / 7" }}>

          {/* Label */}
          <p
            ref={labelRef}
            className="label"
            style={{ marginBottom: "2rem" }}
          >
            About
          </p>

          {/* Headline — wortweise für Startseiten-Animation */}
          <h1
            ref={headlineRef}
            style={{ overflow: "hidden", marginBottom: "2.5rem" }}
          >
            {["Max", "Haditsch"].map(word => (
              <span
                key={word}
                className="word"
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  marginRight: "0.35em",
                  verticalAlign: "bottom",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Erster Absatz — hoch positioniert, viel above fold sichtbar */}
          <p
            ref={firstParaRef}
            className="copy"
            style={{ maxWidth: "480px", marginBottom: "2.5rem" }}
          >
            Max Haditsch is a multidisciplinary brand designer & strategist
            based in Vienna, Austria. With years of experience as a graphic
            designer and art director he brings both strategic thinking and
            hands-on craft to every project.
          </p>

          {/* Foto-Slot */}
          <div
            ref={photoRef}
            style={{
              width: "100%",
              aspectRatio: "4/5",
              maxWidth: "420px",
              background: "var(--color-surface)",
              overflow: "hidden",
              marginBottom: "1.25rem", /* reduzierter Abstand zum zweiten Absatz */
            }}
          >
            {/* Wird via Sanity befüllt — Placeholder */}
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="label">Photo</span>
            </div>
          </div>

          {/* Zweiter Absatz — geringer Abstand zum Foto */}
          <div ref={secondParaRef} style={{ maxWidth: "480px" }}>
            <p className="copy">
              His holistic approach and branding process translates strategic
              positioning into compelling visual identities and consistent brand
              experiences across all touchpoints.
            </p>
          </div>
        </div>

        {/* ── RECHTE SPALTE ───────────────────────────── */}
        <div ref={rightColRef} style={{ gridColumn: "8 / 13", paddingTop: "10rem" }}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2rem" }}>
            <p className="label" style={{ marginBottom: "1rem" }}>
              Approach
            </p>
            {[
              "Identity-Based Brand Management",
              "Neuromarketing & Emotional Positioning",
              "Multisensory Brand Experience",
            ].map(item => (
              <p
                key={item}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1.8,
                  borderBottom: "1px solid var(--color-border)",
                  padding: "0.75rem 0",
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
