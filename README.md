# Lulu — a luz que brilha diferente · Landing page

Landing page interativa de vendas do livro infantil **Lulu — a luz que brilha diferente** e do kit de recursos visuais.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Lucide · fontes auto-hospedadas (Fontsource).

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

O build usa caminhos relativos (`base: './'`), então `dist/` pode ser publicado em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, S3…).

---

## Onde configurar as informações comerciais

Tudo fica em **`src/config/site.ts`**. Campos sem definição ficam como `null` e a página mostra um estado neutro ("em breve"), **sem inventar valores**.

| Campo | O que é |
| --- | --- |
| `offer.price`, `offer.compareAtPrice` | Preço (texto livre, ex.: `"R$ 00,00"`) |
| `offer.paymentConditions` | Condições de pagamento |
| `offer.shipping` | Frete / entrega |
| `offer.format` | Formato físico ou digital |
| `offer.availability` | Disponibilidade / prazo |
| `purchase.checkoutUrl` | Link do checkout. Quando preenchido, o botão de compra leva até ele |
| `purchase.whatsappNumber` | Usado como destino do botão de compra se não houver checkout |
| `analytics.gaMeasurementId` | Google Analytics 4. O script só é carregado se preenchido |
| `analytics.metaPixelId` | Meta Pixel. O script só é carregado se preenchido |
| `showPendingMarkers` | Mostra os selos "a definir" nos campos pendentes. Use `false` para escondê-los |
| `experience.*` | Seção 08 (experiência com a Ama Oeste). Veja abaixo |
| `contact.*` | E-mail e Instagram exibidos no rodapé |

As integrações também podem ser preenchidas por variáveis de ambiente (veja `.env.example`), que têm prioridade.

Respostas do FAQ que dependem dessas definições estão marcadas com `pending: true` em `src/content/content.ts`.

### Eventos de conversão

`src/lib/analytics.ts` envia todos os eventos para `window.dataLayer` (compatível com GTM) e, quando configurados, também para o GA4 (`gtag`) e o Meta Pixel (`fbq`).

| Evento | Quando dispara | Meta Pixel |
| --- | --- | --- |
| `cta_primary_click` | CTAs de navegação (hero, após a história, após o kit, CTA final, header, menu) | custom |
| `cta_purchase_click` | Botão de compra no card da oferta | `AddToCart` |
| `checkout_start` | Clique de compra com checkout configurado | `InitiateCheckout` |
| `whatsapp_click` | Clique de compra que abre o WhatsApp | `Contact` |
| `kit_item_explore` | Seleção de um recurso do kit | `ViewContent` |
| `universe_item_explore` | Abertura de um card do universo da Lulu | custom |
| `book_page_view` | Troca de página em "Espie o livro" | custom |
| `faq_interaction` | Abrir ou fechar uma pergunta do FAQ | custom |

Cada evento leva o parâmetro `location` (ou `item`/`question`) para identificar a origem.

---

## Assets: origem e fidelidade

Todas as imagens vêm do PDF original (`Lulu (digital)`, Adobe Illustrator, 17 páginas, totalmente vetorial) e dos mockups enviados. Nenhuma ilustração foi redesenhada ou gerada.

```
public/assets/
  lulu/            recortes da personagem com fundo transparente (WebP 480/960)
  illustrations/   páginas completas do livro (WebP 800/1600), nomeadas pelo número da página no PDF
  products/        mockups fotográficos do livro (WebP 800/1600)
  decorative/      elementos gráficos originais: corações, nuvens, notas musicais, letras, brilhos, flor
  og-image.jpg     imagem de compartilhamento (1200×630)
  favicon-192.png
```

| Recorte | Página do PDF |
| --- | --- |
| `lulu-cover-smile` | 01 (capa) |
| `lulu-full-crayon` | 02 |
| `lulu-worried` | 05 |
| `lulu-reading` | 06 |
| `lulu-thinking` | 07 |
| `lulu-calm-desk` | 12 |
| `lulu-happy-arms` | 13 |
| `lulu-peek` | 17 (contracapa) |

Os recortes foram feitos a partir de renderizações a 200 dpi. Só o fundo foi removido; o traço e as cores ficaram intactos. `src/lib/assetManifest.ts` guarda as dimensões de cada imagem para evitar layout shift.

**Paleta:** amostrada do PDF e registrada como tokens em `src/index.css` (`--color-blush-100`, `--color-magenta`, `--color-navy`…).
**Tipografia:** o PDF usa *Chaloops Bold* (títulos) e *Margot* (texto), que não têm licença web livre. Na web usamos **Grandstander** (títulos, arredondada e manuscrita) e **Nunito** (texto, de alta legibilidade). Se houver licença web das fontes originais, troque `--font-display` em `src/index.css`.

### Recursos do kit sem fotos ainda

Ainda não existem fotos dos cinco recursos do kit. Por isso, cada um é apresentado com ilustrações originais do livro e uma legenda que deixa isso claro, como "Representação ilustrativa" ou "Cena do livro". Quando as fotos existirem:

1. Coloque os arquivos em `public/assets/products/` (de preferência `nome-800.webp` e `nome-1600.webp`).
2. Regere `src/lib/assetManifest.ts`, ou acrescente a entrada à mão.
3. Preencha `photo` do item em `src/content/content.ts`.

---

## Seção 08 — Experiência com a Ama Oeste

Por padrão, a seção **não exibe** nome, idade, diagnóstico nem imagem da criança. Ela traz só um relato anônimo e sem caráter clínico.
- Confirme a autorização para citar a instituição (`experience.partnerName`), ou use `null`.
- Fotos e depoimentos entram em `experience.photos` e `experience.testimonials` **somente com autorização expressa**.
- `experience.enabled: false` oculta a seção inteira.

---

## Estrutura

```
src/
  config/site.ts           configuração comercial e integrações
  content/content.ts       textos: páginas do livro, universo, kit, público, FAQ
  lib/analytics.ts         eventos e carregamento condicional de GA4 / Meta Pixel
  lib/img.ts, assetManifest.ts
  components/ui/           Button, PurchaseButton, Img, Decor, Reveal, SectionHeading, Pending
  components/sections/     Header, Hero, Story, LuluUniverse, Book, Kit, Experience,
                           Audience, Testimonial, Offer, FAQ, FinalCTA, Footer
```

## Acessibilidade e movimento

- `prefers-reduced-motion`: a página troca deslocamentos por fades, e flutuações e parallax ficam desativados.
- Sem sons, sem flashes e sem autoplay.
- Link "Pular para o conteúdo", foco visível, abas do kit com setas, Home e End, accordion com `aria-expanded`, menu mobile com Escape e retorno de foco.
- As páginas do livro têm texto alternativo com o texto original de cada página.

## Antes de publicar

- [ ] Preencher a oferta, o checkout e/ou o WhatsApp em `site.ts`
- [ ] Definir `VITE_SITE_URL`, trocar `og:image` por uma URL absoluta e adicionar `<link rel="canonical">` em `index.html`
- [ ] Confirmar a autorização da Ama Oeste e revisar a seção 08
- [ ] Atualizar as respostas pendentes do FAQ (faixa etária, compra/entrega, venda separada)
- [ ] `showPendingMarkers: false`, se preferir esconder os selos
