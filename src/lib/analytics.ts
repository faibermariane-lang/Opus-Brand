import { siteConfig } from '../config/site';

/**
 * Camada de eventos de conversão.
 * - Todo evento vai para `window.dataLayer` (compatível com Google Tag Manager).
 * - Se o GA4 estiver configurado, o evento também é enviado via `gtag`.
 * - Se o Meta Pixel estiver configurado, eventos-chave são mapeados para `fbq`.
 * Nenhum script de terceiros é carregado sem um ID configurado.
 */

export type TrackEvent =
  | 'cta_primary_click'
  | 'cta_purchase_click'
  | 'kit_item_explore'
  | 'universe_item_explore'
  | 'book_page_view'
  | 'faq_interaction'
  | 'checkout_start'
  | 'whatsapp_click';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void; push?: unknown };
    _fbq?: unknown;
  }
}

const META_EVENT_MAP: Partial<Record<TrackEvent, string>> = {
  cta_purchase_click: 'AddToCart',
  checkout_start: 'InitiateCheckout',
  whatsapp_click: 'Contact',
  kit_item_explore: 'ViewContent',
};

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (window.gtag && siteConfig.analytics.gaMeasurementId) window.gtag('event', event, params);
  const metaEvent = META_EVENT_MAP[event];
  if (window.fbq && siteConfig.analytics.metaPixelId) {
    if (metaEvent) window.fbq('track', metaEvent, params);
    else window.fbq('trackCustom', event, params);
  }
  if (import.meta.env.DEV) console.info('[track]', event, params);
}

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Inicializa integrações somente quando os IDs reais forem configurados. */
export function initAnalytics() {
  const { gaMeasurementId, metaPixelId } = siteConfig.analytics;
  window.dataLayer = window.dataLayer || [];

  if (gaMeasurementId) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`);
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId);
  }

  if (metaPixelId && !window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    } as NonNullable<Window['fbq']>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }
}

/** Resolve o destino do botão de compra a partir da configuração. */
export function getPurchaseTarget(): { href: string; kind: 'checkout' | 'whatsapp' | 'pending'; external: boolean } {
  const { checkoutUrl, whatsappNumber, whatsappMessage } = siteConfig.purchase;
  if (checkoutUrl) return { href: checkoutUrl, kind: 'checkout', external: true };
  if (whatsappNumber)
    return {
      href: `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`,
      kind: 'whatsapp',
      external: true,
    };
  return { href: '#oferta', kind: 'pending', external: false };
}
