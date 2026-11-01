/**
 * CONFIGURAÇÃO COMERCIAL E DE INTEGRAÇÕES
 * ------------------------------------------------------------------
 * Tudo que ainda não foi definido está como `null`.
 * Enquanto um campo estiver `null`, a página mostra um estado neutro
 * ("em breve") e NUNCA inventa valores.
 *
 * Integrações (checkout, WhatsApp, Google Analytics, Meta Pixel) podem ser
 * preenchidas aqui OU pelas variáveis de ambiente do arquivo `.env`
 * (veja `.env.example`). As variáveis de ambiente têm prioridade.
 */

const env = import.meta.env;
const fromEnv = (v: string | undefined): string | null => (v && v.trim() ? v.trim() : null);

export type OfferConfig = {
  productName: string;
  description: string;
  /** Ex.: "R$ 000,00". Deixe `null` até o preço ser definido. */
  price: string | null;
  /** Ex.: preço "de" para ancoragem. Opcional. */
  compareAtPrice: string | null;
  /** Ex.: "em até 0x sem juros no cartão". */
  paymentConditions: string | null;
  /** Ex.: "Frete grátis para todo o Brasil" ou "Calculado no checkout". */
  shipping: string | null;
  /** Ex.: "Livro físico + kit impresso" / "Versão digital (PDF)". */
  format: string | null;
  /** Ex.: "Envio em até X dias úteis". */
  availability: string | null;
};

export const siteConfig = {
  name: 'Lulu — a luz que brilha diferente',
  shortName: 'Lulu',
  tagline: 'Cada criança tem sua própria maneira de iluminar o mundo.',
  /** URL pública final do site (usada em metadados/SEO). */
  siteUrl: fromEnv(env.VITE_SITE_URL),

  /**
   * Mostra pequenos selos "a definir" nos campos comerciais pendentes.
   * Útil durante a configuração. Mude para `false` antes de publicar
   * se preferir esconder os marcadores.
   */
  showPendingMarkers: true,

  purchase: {
    /** Link do checkout (Hotmart, Shopify, Mercado Pago, etc.). */
    checkoutUrl: fromEnv(env.VITE_CHECKOUT_URL) ?? (null as string | null),
    /** Número com DDI e DDD, só dígitos. Ex.: 5511999999999 */
    whatsappNumber: fromEnv(env.VITE_WHATSAPP_NUMBER) ?? (null as string | null),
    whatsappMessage: 'Olá! Quero conhecer o kit da Lulu.',
  },

  offer: {
    productName: 'Kit Lulu — livro + recursos visuais',
    description:
      'O livro "Lulu — a luz que brilha diferente" acompanhado de cinco recursos visuais complementares, pensados para continuar a história no dia a dia.',
    price: null,
    compareAtPrice: null,
    paymentConditions: null,
    shipping: null,
    format: null,
    availability: null,
  } satisfies OfferConfig as OfferConfig,

  analytics: {
    /** Ex.: G-XXXXXXXXXX — o script só é carregado se preenchido. */
    gaMeasurementId: fromEnv(env.VITE_GA_MEASUREMENT_ID) ?? (null as string | null),
    /** Ex.: 123456789012345 — o pixel só é carregado se preenchido. */
    metaPixelId: fromEnv(env.VITE_META_PIXEL_ID) ?? (null as string | null),
  },

  /**
   * SEÇÃO 08 — Experiência de aplicação.
   * Só publique fotos e depoimentos com autorização expressa por escrito.
   * Nada identificável da criança é exibido por padrão.
   */
  experience: {
    enabled: true,
    /** Nome da instituição parceira. Confirme a autorização para citá-la. */
    partnerName: 'Ama Oeste' as string | null,
    /** Fotos autorizadas: { src, alt }. Vazio = nenhuma foto é exibida. */
    photos: [] as { src: string; alt: string }[],
    /** Depoimentos autorizados. Vazio = nenhum depoimento é exibido. */
    testimonials: [] as { quote: string; author: string; context?: string }[],
  },

  contact: {
    email: null as string | null,
    instagram: null as string | null,
  },
};

export type SiteConfig = typeof siteConfig;
