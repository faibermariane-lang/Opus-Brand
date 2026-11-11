import localFont from "next/font/local";

/**
 * Fontes equivalentes livres (OFL), auto-hospedadas, subset latin, display: swap.
 * Para usar as fontes licenciadas originais do brand overview, troque os arquivos
 * aqui — os componentes usam apenas --font-display / --font-sans.
 */
export const display = localFont({
  src: [
    { path: "../fonts/newsreader-latin-wght-normal.woff2", style: "normal", weight: "200 800" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-display-family",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: [{ path: "../fonts/inter-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-sans-family",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
