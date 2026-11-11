"use client";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { Icon, type IconName } from "./Icon";
import { preselectSubject, preselectUf } from "@/lib/events";
import type { SubjectId } from "@/content/site";

type Variant = "gold" | "outline-light" | "outline-dark" | "dark" | "cream";

const BASE =
  "group/btn relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-[0.01em] transition-[color,border-color,box-shadow] duration-700 ease-[var(--ease-out)] focus-visible:outline-offset-4";

const VARIANTS: Record<Variant, { cls: string; fill: string }> = {
  gold: { cls: "bg-gold text-green-900 hover:text-cream", fill: "bg-green-700" },
  "outline-light": { cls: "border border-cream/30 text-cream hover:text-green-900 hover:border-gold", fill: "bg-gold" },
  "outline-dark": { cls: "border border-green-900/25 text-green-900 hover:text-green-900 hover:border-gold", fill: "bg-gold" },
  dark: { cls: "bg-green-900 text-cream hover:text-green-900", fill: "bg-gold" },
  cream: { cls: "bg-cream text-green-900 hover:text-green-900", fill: "bg-gold" },
};

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  icon?: IconName;
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  /** Pré-seleciona o assunto do formulário de contato ao clicar. */
  subject?: SubjectId;
  /** Pré-seleciona a UF no diagnóstico ao clicar. */
  uf?: string;
  cursorLabel?: string;
  ariaLabel?: string;
};

/**
 * Botão em pílula. Preenchimento desliza no hover; versão magnética desloca até 6px
 * em direção ao cursor (desligado em touch e com movimento reduzido).
 */
export function Button({
  children, href, external, variant = "gold", icon, magnetic = false, className = "", type = "button",
  disabled, onClick, subject, uf, cursorLabel, ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });
  const v = VARIANTS[variant];

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(dx * 6);
    y.set(dy * 6);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  const handleClick = () => {
    if (subject) preselectSubject(subject);
    if (uf) preselectUf(uf);
    onClick?.();
  };

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-left scale-x-0 rounded-full ${v.fill} transition-transform duration-700 ease-[var(--ease-out)] group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100`}
      />
      <span className="relative">{children}</span>
      {icon ? (
        <Icon name={icon} className="relative size-[1.1rem] transition-transform duration-700 ease-[var(--ease-out)] group-hover/btn:translate-x-1" />
      ) : null}
    </>
  );

  const common = {
    className: `${BASE} ${v.cls} ${disabled ? "pointer-events-none opacity-60" : ""} ${className}`,
    style: { x, y },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    onClick: handleClick,
    "data-cursor": cursorLabel ?? "",
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...common}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type={type} disabled={disabled} {...common}>
      {inner}
    </motion.button>
  );
}
