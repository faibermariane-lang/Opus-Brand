"use client";
import type { SubjectId } from "@/content/site";

/** Pequeno barramento de eventos entre CTAs e componentes (formulário, diagnóstico). */
export const EVENTS = { subject: "innovare:subject", uf: "innovare:uf" } as const;

/** Última escolha feita, para componentes que carregam depois do clique (carregamento sob demanda). */
export const lastChoice: { subject: SubjectId | null; uf: string | null } = { subject: null, uf: null };

export function preselectSubject(subject: SubjectId) {
  lastChoice.subject = subject;
  window.dispatchEvent(new CustomEvent(EVENTS.subject, { detail: subject }));
}
export function preselectUf(uf: string) {
  lastChoice.uf = uf;
  window.dispatchEvent(new CustomEvent(EVENTS.uf, { detail: uf }));
}
