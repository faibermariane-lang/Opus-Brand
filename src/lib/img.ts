import { ASSETS, type AssetKey } from './assetManifest';

const BASE = import.meta.env.BASE_URL;

/** Monta src/srcSet/dimensões de um asset a partir do manifesto. */
export function imgProps(key: AssetKey, sizes = '100vw') {
  const a = ASSETS[key];
  const widths = a.widths as readonly number[];
  if (!widths.length) return { src: `${BASE}${key}.webp`, width: a.w, height: a.h };
  const largest = widths[widths.length - 1];
  return {
    src: `${BASE}${key}-${largest}.webp`,
    srcSet: widths.map((w) => `${BASE}${key}-${w}.webp ${w}w`).join(', '),
    sizes,
    width: a.w,
    height: a.h,
  };
}
