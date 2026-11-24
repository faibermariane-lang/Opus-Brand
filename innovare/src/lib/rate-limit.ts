/**
 * Limite simples de requisições por IP, em memória.
 * Em ambiente serverless cada instância tem a sua memória, então ele é um freio
 * complementar (junto com honeypot, tempo mínimo e checagem de origem). Para um
 * limite global, troque por Upstash/Vercel KV.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return true;
}
