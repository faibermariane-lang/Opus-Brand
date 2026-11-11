import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, sans } from "./fonts";
import { Cursor } from "@/components/interactive/Cursor";
import { SmoothScroll } from "@/components/interactive/SmoothScroll";
import { WhatsAppFab } from "@/components/interactive/WhatsAppFab";
import { meta } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: meta.title, template: `%s | ${meta.brandName}` },
  description: meta.description,
  applicationName: meta.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: meta.brandName,
    title: meta.title,
    description: meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09281C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={meta.lang} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScroll />
        {children}
        <WhatsAppFab />
        <Cursor />
      </body>
    </html>
  );
}
