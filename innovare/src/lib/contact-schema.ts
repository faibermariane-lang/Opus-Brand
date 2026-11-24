import { z } from "zod";
import { subjects } from "@/content/site";

// Sem compilação JIT do zod: evita o teste de `eval` (bloqueado pela CSP do site).
z.config({ jitless: true });

const subjectIds = subjects.map((s) => s.id) as [string, ...string[]];

/** Campos de uma linha: sem quebras de linha nem caracteres de controle (evita injeção em cabeçalhos de e-mail). */
const singleLine = (v: string) => !/[\u0000-\u001f\u007f]/.test(v);
const noControl = (v: string) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v);

/** Esquema compartilhado entre o formulário (cliente) e a rota /api/contato (servidor). */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120).refine(singleLine),
  company: z.string().trim().max(160).refine(singleLine).optional().or(z.literal("")),
  email: z.string().trim().max(200).email().refine(singleLine),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-.\s]+$/)
    .refine((v) => v.replace(/\D/g, "").length >= 10, { message: "invalid" }),
  subject: z.enum(subjectIds),
  message: z.string().trim().min(5).max(4000).refine(noControl),
  consent: z.literal(true),
  /** Honeypot: precisa chegar vazio. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Momento em que o formulário foi aberto (ms). Envios rápidos demais são de robôs. */
  startedAt: z.number().int().positive().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
