"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * Page transition:
 *   Navigate → dark panel sweeps in from bottom → page mounts → panel sweeps out.
 *
 * Works with Next.js App Router by watching pathname changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const pathname  = usePathname();
  const isFirst   = useRef(true);

  useEffect(() => {
    // Skip transition on initial load (Loader handles that)
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    // Panel sweeps out (page just arrived)
    gsap.fromTo(
      panel,
      { yPercent: 0, display: "block" },
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        onComplete: () => { panel.style.display = "none"; },
      }
    );
  }, [pathname]);

  // Intercept link clicks to show panel before navigation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link || !link.href) return;

      // Only internal links
      try {
        const url = new URL(link.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
      } catch { return; }

      e.preventDefault();
      const href = link.getAttribute("href")!;
      const panel = panelRef.current;
      if (!panel) return;

      panel.style.display = "block";
      gsap.fromTo(
        panel,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => {
            window.location.href = href;
          },
        }
      );
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {children}
      {/* Transition panel */}
      <div
        ref={panelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-bg)",
          zIndex: 5000,
          display: "none",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
