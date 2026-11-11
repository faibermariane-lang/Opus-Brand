"use client";
import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Rolagem suave (Lenis). Desligada com prefers-reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -88 }, autoRaf: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
