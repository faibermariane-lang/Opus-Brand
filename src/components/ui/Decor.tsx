import type { CSSProperties } from 'react';
import type { AssetKey } from '../../lib/assetManifest';
import { imgProps } from '../../lib/img';

type Props = {
  asset: AssetKey;
  className?: string;
  /** rotação base em graus */
  rotate?: number;
  /** atraso da animação em segundos */
  delay?: number;
  motion?: 'float' | 'float-slow' | 'twinkle' | 'none';
  style?: CSSProperties;
};

/** Elemento decorativo original do livro, puramente visual (aria-hidden). */
export function Decor({ asset, className = '', rotate = 0, delay = 0, motion = 'float', style }: Props) {
  const anim =
    motion === 'float' ? 'animate-float' : motion === 'float-slow' ? 'animate-float-slow' : motion === 'twinkle' ? 'animate-twinkle' : '';
  const { src, width, height } = imgProps(asset);
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`pointer-events-none absolute select-none ${anim} ${className}`}
      style={{ ['--r' as string]: `${rotate}deg`, transform: `rotate(${rotate}deg)`, animationDelay: `${delay}s`, ...style }}
    />
  );
}
