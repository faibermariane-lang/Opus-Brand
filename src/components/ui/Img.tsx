import type { ImgHTMLAttributes } from 'react';
import type { AssetKey } from '../../lib/assetManifest';
import { imgProps } from '../../lib/img';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  asset: AssetKey;
  alt: string;
  sizes?: string;
  /** Imagens acima da dobra: carregamento prioritário. */
  priority?: boolean;
};

export function Img({ asset, alt, sizes, priority, ...rest }: Props) {
  return (
    <img
      {...imgProps(asset, sizes)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      draggable={false}
      {...rest}
    />
  );
}
