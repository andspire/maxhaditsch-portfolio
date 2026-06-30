"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor with smooth follow + hover expand.
 * Scales up and shows a ring on interactive elements.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const curX   = useRef(-100);
  const curY   = useRef(-100);
  const rafId  = useRef<number>(0);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    const onLeave = () => el.style.opacity = "0";
    const onEnter = () => el.style.opacity = "1";

    const addHover = (node: Element) => {
      node.addEventListener("mouseenter", () => el.classList.add("cursor-hover"));
      node.addEventListener("mouseleave", () => el.classList.remove("cursor-hover"));
    };

    // Add hover state to all interactive elements
    const tags = ["a", "button", "input", "textarea", ".work-item"];
    tags.forEach(sel => document.querySelectorAll(sel).forEach(addHover));

    // Re-run on DOM changes (navigation)
    const observer = new MutationObserver(() => {
      tags.forEach(sel => document.querySelectorAll(sel).forEach(addHover));
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth follow loop
    function tick() {
      curX.current += (mouseX.current - curX.current) * 0.14;
      curY.current += (mouseY.current - curY.current) * 0.14;
      el!.style.transform = `translate(${curX.current}px, ${curY.current}px) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        #custom-cursor {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--color-text);
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transition:
            width  0.25s cubic-bezier(0.16,1,0.3,1),
            height 0.25s cubic-bezier(0.16,1,0.3,1),
            background 0.2s ease,
            border  0.2s ease;
        }
        #custom-cursor.cursor-hover {
          width: 48px; height: 48px;
          background: transparent;
          border: 1px solid var(--color-text);
          mix-blend-mode: difference;
        }
      `}</style>
      <div ref={cursorRef} id="custom-cursor" />
    </>
  );
}
