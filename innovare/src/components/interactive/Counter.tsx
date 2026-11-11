"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Contador sereno (2,4s, sem "ansiedade"). Só anima valores numéricos. */
export function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const target = Number(value.replace(/\D/g, ""));
  const numeric = /^\d+$/.test(value.trim());
  const [n, setN] = useState(numeric && !reduce ? 0 : target);

  useEffect(() => {
    if (!inView || !numeric || reduce) return;
    const c = animate(0, target, { duration: 2.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, numeric, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {numeric ? n.toLocaleString("pt-BR") : value}
      {suffix}
    </span>
  );
}
