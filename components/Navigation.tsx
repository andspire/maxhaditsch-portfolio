"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { num: "01", label: "Work",     href: "/work" },
  { num: "02", label: "Explore",  href: "/explore" },
  { num: "03", label: "Services", href: "/#services" },
  { num: "04", label: "About",    href: "/about" },
  { num: "05", label: "Contact",  href: "/contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const itemRefs    = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef   = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Expose toggle to ⌘K palette via custom event
  useEffect(() => {
    const handler = () => setOpen(v => !v);
    window.addEventListener("toggle-menu", handler);
    return () => window.removeEventListener("toggle-menu", handler);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (open) {
      // Reset transforms before animating in
      gsap.set(itemRefs.current, { y: "100%" });
      gsap.set(footerRef.current, { opacity: 0, y: 20 });
      gsap.set(closeBtnRef.current, { opacity: 0, y: -8 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      })
        .to(itemRefs.current, {
          y: "0%",
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
        }, "-=0.5")
        .to(footerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .to(closeBtnRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, "<");
    } else {
      const tl = gsap.timeline();
      tl.to(itemRefs.current, {
        y: "100%",
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.in",
      })
        .to(footerRef.current, { opacity: 0, y: 20, duration: 0.3 }, "<")
        .to(closeBtnRef.current, { opacity: 0, y: -8, duration: 0.3 }, "<")
        .to(overlayRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "power4.inOut",
        }, "-=0.1");
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Fixed top bar */}
      <nav
        id="site-nav"
        className="fixed top-0 left-0 right-0 z-[500] flex justify-between items-start px-10 pt-7"
        style={{ opacity: 0 }} // revealed by Loader after complete
      >
        <Link href="/" className="hover-line" style={{ fontSize: "0.875rem", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>
          © Max Haditsch
        </Link>

        <span id="nav-cmd" style={{ fontSize: "0.875rem", letterSpacing: "0.06em", color: "var(--color-muted)" }}>
          <kbd style={{ fontFamily: "inherit", fontSize: "0.875rem", border: "1px solid var(--color-border)", borderRadius: "3px", padding: "0.1em 0.35em" }}>⌘</kbd>
          <kbd style={{ fontFamily: "inherit", fontSize: "0.875rem", border: "1px solid var(--color-border)", borderRadius: "3px", padding: "0.1em 0.35em", marginLeft: "0.2em" }}>K</kbd>
        </span>

        <ThemeToggle />

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", background: "none", border: "none", lineHeight: 1, transition: "color 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          [ menu ]
        </button>
      </nav>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="fixed inset-0 z-[800] flex flex-col justify-end"
        style={{ background: "#050505", clipPath: "inset(0 0 100% 0)", padding: "3rem 2.5rem" }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-7 right-10"
          style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", background: "none", border: "none", opacity: 0, transform: "translateY(-8px)", transition: "color 0.2s ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          [ close ]
        </button>

        {/* Menu items */}
        <ul className="list-none mb-12" style={{ marginBottom: "3rem" }}>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href} style={{ overflow: "hidden", padding: "0.2rem 0" }}>
              <Link
                ref={el => { itemRefs.current[i] = el; }}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  fontSize: "clamp(2.5rem, 8vw, 6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "var(--color-muted)",
                  transform: "translateY(100%)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                <span style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.06em", verticalAlign: "super", marginRight: "0.5rem", color: "var(--color-muted)" }}>
                  {item.num}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer strip */}
        <div
          ref={footerRef}
          className="flex justify-between items-end"
          style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem", opacity: 0, transform: "translateY(20px)" }}
        >
          <FooterCol label="Based in" value="Vienna, Austria" />
          <FooterCol label="Available for" value="New Projects" />
          <FooterCol label="Contact" value="hello@maxhaditsch.com" right />
        </div>
      </div>
    </>
  );
}

function FooterCol({ label, value, right }: { label: string; value: string; right?: boolean }) {
  return (
    <div className="flex flex-col gap-1" style={{ textAlign: right ? "right" : "left" }}>
      <span style={{ fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)" }}>{label}</span>
      <span style={{ fontSize: "0.9375rem", color: "var(--color-text)" }}>{value}</span>
    </div>
  );
}
