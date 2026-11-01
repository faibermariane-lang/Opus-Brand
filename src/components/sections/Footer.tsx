import { siteConfig } from '../../config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-4xl font-extrabold text-heart">Lulu</p>
          <p className="font-display text-lg font-semibold text-white/80">a luz que brilha diferente</p>
          <p className="mt-4 max-w-sm leading-relaxed">
            Um livro infantil e um kit de recursos visuais para celebrar as muitas maneiras de sentir, aprender e se comunicar.
          </p>
          <p className="mt-6 font-display text-xl font-bold text-white">Obrigada!</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="mb-3 font-extrabold tracking-wider text-white/50 uppercase">Navegue</p>
          <ul className="grid gap-2 font-semibold">
            {[
              ['#historia', 'A história'],
              ['#universo', 'Universo da Lulu'],
              ['#kit', 'O kit'],
              ['#oferta', 'Oferta'],
              ['#faq', 'Perguntas frequentes'],
            ].map(([h, l]) => (
              <li key={h}>
                <a className="rounded hover:text-white" href={h}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-extrabold tracking-wider text-white/50 uppercase">Contato</p>
          <ul className="grid gap-2 font-semibold">
            {siteConfig.contact.email && (
              <li>
                <a className="hover:text-white" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
            )}
            {siteConfig.contact.instagram && (
              <li>
                <a className="hover:text-white" href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {!siteConfig.contact.email && !siteConfig.contact.instagram && <li className="text-white/50">Canais de contato em breve.</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-white/55 sm:px-6 lg:px-8">
          © {year} Lulu — a luz que brilha diferente. Material educativo e afetivo; não substitui acompanhamento profissional.
        </p>
      </div>
    </footer>
  );
}
