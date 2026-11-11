import { fill } from "@/content/site";

export function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (fill.siteUrl ?? fromEnv ?? (vercel ? `https://${vercel}` : "http://localhost:3000")).replace(/\/$/, "");
}
