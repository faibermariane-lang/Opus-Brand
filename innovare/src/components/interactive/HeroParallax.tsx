"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion, useScroll, useTransform } from "motion/react";

/** Parallax leve (≤ 8%) para elementos decorativos. */
export function HeroParallax({ children, className, amount = 8 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], ["0%", `${amount}%`]);
  return (
    <motion.div className={className} style={reduce ? undefined : { y }} aria-hidden="true">
      {children}
    </motion.div>
  );
}
