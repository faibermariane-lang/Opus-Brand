"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion, type Variants } from "motion/react";
import { EASE } from "@/lib/motion";

/** Fade + sobe 24px ao entrar na tela, com stagger entre irmãos (use <RevealGroup>). */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p" | "span" | "section" | "article";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11 } } };
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export function RevealGroup({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" | "ol" | "dl" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={revealItem}>
      {children}
    </Comp>
  );
}
