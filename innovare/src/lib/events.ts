"use client";
import type { SubjectId } from "@/content/site";

/** Pequeno barramento de eventos entre CTAs e componentes (formulário, diagnóstico). */
export const EVENTS = { subject: "innovare:subject", uf: "innovare:uf" } as const;

export function preselectSubject(subject: SubjectId) {
  window.dispatchEvent(new CustomEvent(EVENTS.subject, { detail: subject }));
}
export function preselectUf(uf: string) {
  window.dispatchEvent(new CustomEvent(EVENTS.uf, { detail: uf }));
}
