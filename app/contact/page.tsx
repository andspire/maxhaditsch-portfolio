"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ paddingTop: "8rem", minHeight: "100vh" }}>
      <section style={{ padding: "0 2.5rem" }}>
        <p style={{ fontSize: "0.875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "4rem" }}>
          Contact
        </p>

        <Link
          href="mailto:hello@maxhaditsch.com"
          style={{
            display: "block",
            fontSize: "clamp(1.5rem, 6vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--color-muted)",
            marginBottom: "5rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          hello@maxhaditsch.com
        </Link>

        <div style={{ display: "flex", gap: "3rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          {[["Instagram", "#"], ["LinkedIn", "#"]].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="hover-line"
              style={{ fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
