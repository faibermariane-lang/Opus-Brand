# Innovare Contabilidade — site institucional

Site de página única (`/`) com navegação por âncoras, mais `/politica-de-privacidade` e `/termos-de-uso`.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · GSAP + ScrollTrigger (só na linha do tempo) · Lenis · react-hook-form + zod.

```bash
cd innovare
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint     # ESLint (flat config do Next)
npm start        # serve o build
```

> O repositório tem outro projeto na raiz. Este site vive em `innovare/`. Na Vercel, configure **Root Directory = `innovare`** (Framework: Next.js; o resto fica no padrão).

---

## 1. Onde preencher os dados (para o cliente)

**Tudo fica em `src/content/site.ts`.** No topo do arquivo, o objeto `fill` reúne todos os itens `[PREENCHER]` do textual. Enquanto um campo estiver `null`, o site mostra um marcador discreto *"a preencher: …"*. Nada foi inventado.

| Campo | Onde aparece |
| --- | --- |
| `siteUrl` (ou a env `NEXT_PUBLIC_SITE_URL`) | Open Graph, sitemap, robots, JSON-LD |
| `founders[].name` / `founders[].role` | Legendas das fotos (Sobre e "Quem está por trás") |
| `responseTime` (ex.: `"no mesmo dia útil"`) | Contato ("Retornamos …") e FAQ 8 |
| `email` | Contato e rodapé |
| `address`, `hours` | Contato (e JSON-LD, no caso do endereço) |
| `cnpj`, `crc` | Rodapé (e JSON-LD, no caso do CNPJ) |
| `yearsActive`, `companiesServed`, `statesWithClients` | Faixa de números. **Só com dados reais.** Depois de preencher, mude `showNumbers` para `true` |
| `privacyPolicy`, `termsOfUse` | Páginas legais (parágrafos separados por linha em branco) |

Outros pontos do mesmo arquivo:

- **`contact.whatsappNumber`**: o número veio como `+55 49 9957-4160`, com só 8 dígitos depois do DDD. Confirme o número antes de publicar.
- **Foto `fundadoras-02`**: não foi entregue. Coloque o arquivo em `public/images/fundadoras-02.jpg` e troque `team.photo.src` para `"/images/fundadoras-02.jpg"` (ajuste `width`/`height`). Sem o arquivo, a seção mostra um fallback com o símbolo.
- **`diagnostic.questions[0].options[].service`**: o serviço citado na tela final do diagnóstico ("[serviço escolhido]").

Toda a copy está em `site.ts`. Nenhum texto fica fixo nos componentes.

## 2. Trocar as fontes

As fontes usadas são equivalentes livres (OFL), auto-hospedadas em `src/fonts/`: **Newsreader** nos títulos e **Inter** no texto e na interface. Para usar as fontes licenciadas originais do brand overview:

1. coloque os `.woff2` em `src/fonts/`;
2. atualize os caminhos em `src/app/fonts.ts`.

Os componentes só usam `--font-display` e `--font-sans`, então não é preciso mexer em mais nada.

## 3. Formulário de contato (integrar o e-mail)

`src/app/api/contato/route.ts` já valida os dados (mesmo esquema zod do cliente, em `src/lib/contact-schema.ts`), descarta spam pelo honeypot e registra em log. O `TODO(integração)` no arquivo mostra onde ligar Resend, Formspree, SMTP ou CRM. As chaves vão em variáveis de ambiente na Vercel.

## 4. Marca

- `public/brand/`: SVGs gerados a partir do PDF vetorial (`assets-marca/Logo-INNOVARE.pdf`):
  - `logo-*`: logotipo + CONTABILIDADE;
  - `wordmark-*`: só "Innovare";
  - `logo-symbol-*`: símbolo + logotipo na horizontal;
  - `logo-stacked-*`: símbolo + logotipo empilhados;
  - `symbol-*`: símbolo isolado.

  Cada um existe nas versões `green`, `gold` e `cream`.
- O **logotipo** usa os contornos originais do arquivo (não é recomposto com fonte).
- O **símbolo** foi redesenhado como **traço** (círculo, 4 lentes e losango côncavo), medido sobre o original, para poder ser desenhado com `stroke-dasharray`.
- Para regenerar: `python3 -I scripts/build-brand.py assets-marca/logo-innovare-pdf-p1.svg`.

## 5. Estrutura

```
src/
  app/            layout, página, /api/contato, páginas legais, sitemap, robots, ícone e imagem OG
  content/site.ts toda a copy + dados a preencher
  components/
    brand/        Logo, SymbolMark, SymbolDraw (desenho com o scroll), paths gerados
    ui/           Button (magnético), Icon (conjunto próprio, traço 1.5), Reveal, RevealText,
                  SectionHeading, GoldLine, Photo, Accordion, Pending/Filled
    interactive/  BrazilMap, Diagnostic, Timeline (GSAP), Cursor, WhatsAppFab, Preloader,
                  SmoothScroll (Lenis), ContactForm, Counter, HeroParallax
    sections/     uma seção por arquivo, na ordem do textual
  lib/            whatsapp, eventos (pré-seleção de assunto/UF), esquema do formulário, tokens de movimento
```

Os tokens de design (cores, raios, sombras, easing) estão em `src/app/globals.css`, no bloco `@theme`. No Tailwind v4, esse bloco substitui o `tailwind.config`.

## 6. Acessibilidade e movimento

- Com `prefers-reduced-motion`, ficam desligados: preloader, parallax, cursor customizado, rotação do símbolo, rolagem suave e scrub da linha do tempo. Restam apenas fades curtos.
- Acordeões, diagnóstico (fieldset/legend com rádios nativos) e menu mobile (foco preso, Esc fecha) funcionam por teclado.
- O mapa tem uma alternativa em `select` de UF e anuncia o estado escolhido numa região *aria-live*.

## 7. Créditos e licenças

- Mapa do Brasil por estados: [`@svg-maps/brazil`](https://github.com/VictorCazanave/svg-maps), licença **CC BY 4.0**.
- Newsreader e Inter: SIL Open Font License, via Fontsource.
