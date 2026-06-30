"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "@/components/Loader";

gsap.registerPlugin(ScrollTrigger);

// ─── Placeholder project data (replace with Sanity) ─────────────────────────
const WORKS = [
  {
    num: "01",
    title: "Andspire Brand Identity",
    client: "Andspire e.U.",
    agency: null,
    year: "2024",
    tags: ["Brand Strategy", "Identity Design", "Web"],
    bg: "#161612",
    href: "/work/andspire",
  },
  {
    num: "02",
    title: "Visual Identity System",
    client: null,
    agency: "Studio XYZ",
    year: "2023",
    tags: ["Identity Design", "Art Direction"],
    bg: "#1A1612",
    href: "/work/project-alpha",
  },
  {
    num: "03",
    title: "Wayfinding & Signage System",
    client: "Undisclosed",
    agency: null,
    year: "2022",
    tags: ["Wayfinding", "Environmental Design", "Typography"],
    bg: "#121618",
    href: "/work/wayfinding",
  },
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const heroRef   = useRef<HTMLElement>(null);
  const wordsRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Run hero + page entry after loader completes
  function handleLoaderComplete() {
    setLoaded(true);

    // Reveal nav
    gsap.to("#site-nav", { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 });
    gsap.to("#nav-cmd",  { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 });

    // Hero headline words
    gsap.to(wordsRef.current, {
      y: "0%",
      duration: 1.1,
      stagger: 0.07,
      ease: "power4.out",
      delay: 0.15,
    });

    // Hero sub text
    gsap.to(".hero-sub", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.5,
    });

    // Scroll-triggered reveals
    setTimeout(() => {
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

      // Parallax thumbnails
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
    }, 300);
  }

  const HERO_WORDS = ["Brand", "Designer", "& Strategist"];

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />

      <main style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.01s" }}>

        {/* ── HERO ─────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "1.5rem",
            padding: "0 2.5rem",
            paddingBottom: "5rem",
            alignItems: "end",
          }}
        >
          {/* Headline */}
          <div style={{ gridColumn: "1 / 10", alignSelf: "end" }}>
            <h1 style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.92 }}>
              {HERO_WORDS.map((word, i) => (
                <span key={word} style={{ display: "block", overflow: "hidden" }}>
                  <span
                    ref={el => { wordsRef.current[i] = el; }}
                    style={{ display: "inline-block", transform: "translateY(110%)" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Sub */}
          <div
            className="hero-sub"
            style={{ gridColumn: "11 / 13", alignSelf: "end", paddingBottom: "0.25rem", opacity: 0, transform: "translateY(16px)" }}
          >
            <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--color-muted)", letterSpacing: "0.04em", maxWidth: "200px" }}>
              »It's not about the product or the service. It's about emotion. A part of your own identity that resonates with what you thought was just a company. And that's what makes it a brand.«
            </p>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────── */}
        <div style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "0.75rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
          <div className="animate-marquee" style={{ display: "inline-flex" }}>
            {["Brand Strategy", "Brand Identity", "Visual Systems", "Art Direction", "Motion Design", "Photography", "Wayfinding", "Web Design",
              "Brand Strategy", "Brand Identity", "Visual Systems", "Art Direction", "Motion Design", "Photography", "Wayfinding", "Web Design"
            ].map((item, i) => (
              <span key={i} style={{ fontSize: "0.875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-muted)", padding: "0 3rem" }}>
                {i > 0 ? "· " : ""}{item}
              </span>
            ))}
          </div>
        </div>

        {/* ── SELECTED WORKS ───────────────────────── */}
        <section id="works" style={{ padding: "7.5rem 2.5rem" }}>
          <SectionLabel text="Selected Work" />

          {WORKS.map((work, i) => (
            <div
              key={work.num}
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                columnGap: "1.5rem",
                borderTop: "1px solid var(--color-border)",
                padding: "2rem 0",
                alignItems: "start",
                opacity: 0,
                transform: "translateY(24px)",
              }}
            >
              {/* Number */}
              <span style={{ gridColumn: "1 / 2", fontSize: "0.875rem", color: "var(--color-muted)", paddingTop: "0.15rem", letterSpacing: "0.06em" }}>
                {work.num}
              </span>

              {/* Thumbnail */}
              <div
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
                  style={{ position: "absolute", inset: "-15%", background: work.bg }}
                />
              </div>

              {/* Meta */}
              <div style={{ gridColumn: i % 2 === 0 ? "7 / 12" : "9 / 13", paddingLeft: "2rem" }}>
                <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem" }}>
                  {work.title}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {work.tags.map(tag => (
                    <span key={tag} style={{ fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid var(--color-border)", padding: "0.25rem 0.6rem", color: "var(--color-muted)", borderRadius: "2px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <dl style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.8 }}>
                  {work.client && <><dt style={{ display: "inline" }}>Client </dt><dd style={{ display: "inline", color: "var(--color-text)", marginRight: "1.5rem" }}>{work.client}</dd></>}
                  {work.agency && <><dt style={{ display: "inline" }}>Agency </dt><dd style={{ display: "inline", color: "var(--color-text)", marginRight: "1.5rem" }}>{work.agency}</dd></>}
                  <dt style={{ display: "inline" }}>Year </dt><dd style={{ display: "inline", color: "var(--color-text)" }}>{work.year}</dd>
                </dl>
                <Link href={work.href} className="hover-line" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.2rem" }}>
                  View Case Study →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ── SERVICES ─────────────────────────────── */}
        <section id="services" style={{ padding: "7.5rem 2.5rem", borderTop: "1px solid var(--color-border)" }}>
          <SectionLabel text="Expertise" />
          <div style={{ display: "grid", gridTemplateColumns: "3fr 9fr", gap: "1.5rem", marginTop: "4rem" }}>
            <p className="reveal" style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "220px", opacity: 0, transform: "translateY(24px)" }}>
              Focused, holistic work — from the first strategic question to the last design decision.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
              {[
                { name: "Brand Strategy",   desc: "Identity-based positioning, competitive analysis, emotional targeting." },
                { name: "Brand Design",     desc: "Visual identities, design systems, art direction across touchpoints." },
                { name: "Web & Motion",     desc: "Interaction design, animated identities, digital brand experience." },
                { name: "Photography",      desc: "Brand imagery, editorial direction, campaign photography." },
                { name: "Wayfinding",       desc: "Environmental graphic design, spatial systems, signage." },
                { name: "Consulting",       desc: "Brand audits, strategic sparring, team workshops." },
              ].map(s => (
                <div key={s.name} className="reveal" style={{ borderTop: "1px solid var(--color-border)", padding: "1.5rem 0 1.5rem 1.5rem", opacity: 0, transform: "translateY(24px)" }}>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>{s.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPLORE TEASER ───────────────────────── */}
        <section id="explore-teaser" style={{ padding: "7.5rem 2.5rem", borderTop: "1px solid var(--color-border)", display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem", alignItems: "center" }}>
          <div style={{ gridColumn: "1 / 7" }}>
            <SectionLabel text="Explore" />
            <h2 className="reveal" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.95, margin: "2rem 0", opacity: 0, transform: "translateY(24px)" }}>
              A universe<br />of work
            </h2>
            <p className="reveal" style={{ fontSize: "0.9375rem", color: "var(--color-muted)", lineHeight: 1.8, maxWidth: "360px", marginBottom: "2.5rem", opacity: 0, transform: "translateY(24px)" }}>
              Photography, motion, wayfinding, brand design — collected, curated, and open to explore. Navigate freely.
            </p>
            <Link href="/explore" className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid var(--color-border)", padding: "0.75rem 1.5rem", color: "var(--color-muted)", borderRadius: "2px", opacity: 0, transform: "translateY(24px)" }}>
              Enter the space →
            </Link>
          </div>

          {/* Floating preview elements */}
          <div className="reveal" style={{ gridColumn: "7 / 13", height: "400px", position: "relative", overflow: "hidden", opacity: 0, transform: "translateY(24px)" }}>
            {[
              { label: "Photography", sub: "2021–2024",       w: 140, h: 90,  top: 30,  left: 20,  anim: "float-a" },
              { label: "Motion Design", sub: "Selected",      w: 180, h: 110, top: 140, left: 120, anim: "float-b" },
              { label: "Web",          sub: "Experiments",    w: 100, h: 100, top: 20,  right: 30, anim: "float-a" },
              { label: "Brand",        sub: "Fragments",      w: 120, h: 70,  bottom: 60, left: 40, anim: "float-b" },
              { label: "Type",         sub: "Explorations",   w: 90,  h: 90,  bottom: 80, right: 60, anim: "float-a" },
            ].map((el, i) => (
              <div
                key={i}
                className={`animate-${el.anim}`}
                style={{
                  position: "absolute",
                  width: el.w,
                  height: el.h,
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  letterSpacing: "0.06em",
                  textAlign: "center",
                  padding: "0.75rem",
                  animationDelay: `${i * 1.5}s`,
                  top: el.top,
                  left: (el as { left?: number }).left,
                  right: (el as { right?: number }).right,
                  bottom: (el as { bottom?: number }).bottom,
                }}
              >
                <span style={{ color: "var(--color-text)" }}>{el.label}</span>
                <span style={{ marginTop: "0.25rem" }}>{el.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── APPROACH ─────────────────────────────── */}
        <section id="approach" style={{ padding: "7.5rem 2.5rem", borderTop: "1px solid var(--color-border)" }}>
          <SectionLabel text="Approach" />
          <div className="flex flex-row gap-16 items-start">
            {/* Headline links */}
            <div className="flex-shrink-0 w-[28%]">
              <h2 className="reveal" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem", opacity: 0, transform: "translateY(24px)" }}>
                Strategy and design<br />as a single discipline.
              </h2>
              <p className="reveal" style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.9, opacity: 0, transform: "translateY(24px)" }}>
                Max Haditsch is a multidisciplinary brand designer & strategist based in Vienna, Austria. With years of experience as a graphic designer and art director he brings both strategic thinking and hands-on craft to every project.
              </p>
            </div>
            {/* Drei Textblöcke rechts nebeneinander */}
            <div className="flex-1 grid grid-cols-3 gap-8">
              {[
                { title: "Identity-Based Brand Management", desc: "Rooted in Burmann's framework — brand identity as the self-image that precedes and shapes all communication." },
                { title: "Neuromarketing & Emotional Positioning", desc: "Brands are processed emotionally before rationally. The limbic system guides every positioning decision." },
                { title: "Multisensory Brand Experience", desc: "Coherent across every touchpoint — visual, spatial, temporal. Brands that can be felt, not just seen." },
              ].map(p => (
                <div key={p.title} className="reveal" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", opacity: 0, transform: "translateY(24px)" }}>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "0.75rem" }}>{p.title}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.8 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
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
    </>
  );
}

/* ── Shared sub-component ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: "0.875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "4rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
      {text}
      <span style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
    </p>
  );
}
