import { z } from "zod";
import { subjects } from "@/content/site";

const subjectIds = subjects.map((s) => s.id) as [string, ...string[]];

/** Esquema compartilhado entre o formulário (cliente) e a rota /api/contato (servidor). */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, { message: "invalid" }),
  subject: z.enum(subjectIds),
  message: z.string().trim().min(5).max(4000),
  consent: z.literal(true),
  /** Honeypot: precisa chegar vazio. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
