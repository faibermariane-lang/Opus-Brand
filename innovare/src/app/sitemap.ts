import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  const now = new Date();
  return [
    { url: `${url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${url}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${url}/termos-de-uso`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
