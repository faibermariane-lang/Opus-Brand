"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** prefers-reduced-motion confiável (lê o matchMedia diretamente; false no servidor). */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
