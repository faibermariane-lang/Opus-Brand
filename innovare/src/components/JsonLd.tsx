import { contact, fill, meta, services } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/** JSON-LD AccountingService. Endereço completo entra quando `fill.address` for preenchido. */
export function JsonLd() {
  const url = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: meta.brandName,
    description: meta.description,
    slogan: meta.signature,
    url,
    logo: `${url}/brand/logo-green.svg`,
    image: `${url}/opengraph-image.png`,
    telephone: `+${contact.whatsappNumber}`,
    ...(fill.email ? { email: fill.email } : {}),
    areaServed: { "@type": "Country", name: "BR" },
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.city,
      addressRegion: contact.stateShort,
      addressCountry: "BR",
      ...(fill.address ? { streetAddress: fill.address } : {}),
    },
    sameAs: [contact.instagramUrl],
    ...(fill.cnpj ? { taxID: fill.cnpj } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: services.eyebrow,
      itemListElement: services.items.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.summary } })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
