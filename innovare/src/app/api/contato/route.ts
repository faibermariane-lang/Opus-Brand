import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Recebe o formulário de contato.
 * Hoje: valida (zod), descarta spam (honeypot) e registra em log.
 *
 * TODO(integração): enviar o e-mail de verdade. Opções:
 *  - Resend: `npm i resend` e `await new Resend(process.env.RESEND_API_KEY).emails.send({...})`
 *  - Formspree: `await fetch("https://formspree.io/f/<id>", { method: "POST", body: JSON.stringify(data) })`
 *  - SMTP (nodemailer) ou um webhook do CRM.
 * Guarde as chaves em variáveis de ambiente na Vercel (nunca no código).
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot preenchido → finge sucesso e ignora.
  if (body && typeof body === "object" && "website" in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: parsed.error.issues.map((i) => i.path.join(".")) },
      { status: 422 },
    );
  }

  const { website: _hp, ...data } = parsed.data;
  void _hp;
  console.info("[contato] nova mensagem", { ...data, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
