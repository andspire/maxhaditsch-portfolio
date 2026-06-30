"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Page Loader
 *
 * Sequence:
 *   ©  →  © MH  →  © MAX HADITSCH
 *   + progress counter 000 → 100
 *   → Panel slides up, page reveals
 */
export function Loader({ onComplete }: LoaderProps) {
  const loaderRef     = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const copyRef       = useRef<HTMLSpanElement>(null);
  const initialsRef   = useRef<HTMLSpanElement>(null);
  const firstRef      = useRef<HTMLSpanElement>(null);
  const lastRef       = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // ── Step 1: © clips in ──────────────────
    tl.to(copyRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.5,
      ease: "power3.out",
    });

    // ── Step 2: counter 0→100 + © MH ───────
    tl.add(() => {
      let count = 0;
      const iv = setInterval(() => {
        count++;
        if (counterRef.current) {
          counterRef.current.textContent = String(count).padStart(3, "0");
        }
        if (lineRef.current) {
          lineRef.current.style.width = `${count}%`;
        }
        if (count >= 100) clearInterval(iv);
      }, 14);
    });

    tl.to(initialsRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.4,
      ease: "power3.out",
      delay: 0.35,
    });

    // ── Step 3: MH → MAX HADITSCH ───────────
    tl.to(initialsRef.current, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.22,
      ease: "power2.in",
      delay: 0.65,
    }).to(
      [firstRef.current, lastRef.current],
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
      "<0.08"
    );

    // ── Hold ────────────────────────────────
    tl.to({}, { duration: 0.55 });

    // ── Slide panel up ──────────────────────
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete,
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Logo mark */}
      <p
        className="font-bold tracking-widest uppercase"
        style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
      >
        <span
          ref={copyRef}
          className="inline-block"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          ©
        </span>
        <span
          ref={initialsRef}
          className="inline-block"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          &nbsp;MH
        </span>
        <span
          ref={firstRef}
          className="inline-block"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          &nbsp;MAX
        </span>
        <span
          ref={lastRef}
          className="inline-block"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          &nbsp;HADITSCH
        </span>
      </p>

      {/* Counter */}
      <span
        ref={counterRef}
        className="absolute bottom-8 right-10 font-variant-numeric-tabular"
        style={{
          fontSize: "0.875rem",
          letterSpacing: "0.06em",
          color: "var(--color-muted)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        000
      </span>

      {/* Progress line */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px w-0 transition-none"
        style={{ background: "var(--color-border)" }}
      />
    </div>
  );
}
