import { NextResponse } from "next/server";
import { contact, subjects } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 1000 * 60 * 60 * 6;

const json = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "anon").trim();
}

/** Aceita só requisições vindas do próprio site (bloqueia envio a partir de outros domínios). */
function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function sendEmail(data: Omit<ContactInput, "website" | "startedAt">) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contato] RESEND_API_KEY ausente — mensagem não enviada (ambiente de desenvolvimento).");
      return true;
    }
    console.error("[contato] RESEND_API_KEY não configurada: configure a variável na Vercel.");
    return false;
  }
  const subject = subjects.find((s) => s.id === data.subject)?.label ?? "Contato";
  const rows: [string, string][] = [
    ["Nome", data.name],
    ["Empresa", data.company || "—"],
    ["E-mail", data.email],
    ["WhatsApp", data.whatsapp],
    ["Assunto", subject],
  ];
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#09281C">
<h2 style="font-weight:normal">Nova mensagem pelo site</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#677351">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;border-top:1px solid #D5B26F;padding-top:12px">${escapeHtml(data.message)}</p></div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Site Innovare <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? contact.email],
      reply_to: data.email,
      subject: `Site Innovare · ${subject} · ${data.name}`.slice(0, 180),
      html,
      text,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!res?.ok) {
    console.error("[contato] falha no envio do e-mail", res?.status ?? "sem resposta");
    return false;
  }
  return true;
}

/** Recebe o formulário de contato e envia por e-mail (Resend). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false }, 403);
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return json({ ok: false }, 415);
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) return json({ ok: false }, 413);
  if (!rateLimit(clientIp(req), 8, 10 * 60 * 1000)) return json({ ok: false }, 429);

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return json({ ok: false }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, error: "validation" }, 422);

  const { website, startedAt, ...data } = parsed.data;
  // Robôs: honeypot preenchido ou formulário enviado rápido demais → finge sucesso e descarta.
  const elapsed = startedAt ? Date.now() - startedAt : 0;
  if (website || !startedAt || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return json({ ok: true });

  const sent = await sendEmail(data);
  return sent ? json({ ok: true }) : json({ ok: false }, 502);
}

export function GET() {
  return json({ ok: false }, 405);
}
