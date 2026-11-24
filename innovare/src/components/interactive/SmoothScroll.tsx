"use client";
import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Rolagem suave (Lenis). Desligada com prefers-reduced-motion e em telas de toque. */
export function SmoothScroll() {
  useEffect(() => {
    // Só em computador com mouse/trackpad: no toque a rolagem nativa é melhor e mais leve.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -88 }, autoRaf: true });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
