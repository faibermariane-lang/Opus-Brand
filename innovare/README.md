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

## 1. Publicar (Vercel) — passo a passo

1. Na Vercel, importe o repositório e defina **Root Directory = `innovare`** (Framework: Next.js).
2. Em **Settings → Environment Variables**, cadastre:
   | Variável | Obrigatória | O que é |
   | --- | --- | --- |
   | `RESEND_API_KEY` | **Sim** | Chave do [Resend](https://resend.com), serviço que entrega as mensagens do formulário por e-mail. Sem ela o formulário mostra erro e oferece o WhatsApp. |
   | `NEXT_PUBLIC_SITE_URL` | Recomendada | Domínio final, ex.: `https://www.innovarecontabilidade.com.br` (sem barra no fim). Sem ela, a Vercel usa o domínio de produção do projeto. |
   | `CONTACT_TO` | Não | Destinatário das mensagens. Padrão: `innovarecontabilidadee@gmail.com`. |
   | `CONTACT_FROM` | Não | Remetente de um domínio verificado no Resend, ex.: `Site Innovare <site@seudominio.com.br>`. |
3. **Resend em 2 minutos:** crie a conta com o e-mail `innovarecontabilidadee@gmail.com` e gere uma API key. Sem domínio próprio, o remetente padrão (`onboarding@resend.dev`) já entrega para o e-mail da própria conta. Com domínio próprio, verifique o domínio no Resend e preencha `CONTACT_FROM`.
4. Faça o deploy e envie uma mensagem de teste pelo formulário.

Conteúdo, dados da equipe e registros (CRC/CRA), e-mail e textos legais ficam em **`src/content/site.ts`**.

## 2. Trocar as fontes

As fontes usadas são equivalentes livres (OFL), auto-hospedadas em `src/fonts/`: **Newsreader** nos títulos e **Inter** no texto e na interface. Para usar as fontes licenciadas originais do brand overview:

1. coloque os `.woff2` em `src/fonts/`;
2. atualize os caminhos em `src/app/fonts.ts`.

Os componentes só usam `--font-display` e `--font-sans`, então não é preciso mexer em mais nada.

## 3. Formulário de contato

`src/app/api/contato/route.ts` recebe o formulário e envia por e-mail via Resend (API REST, sem dependência extra). O e-mail chega com "responder para" apontando para quem escreveu.

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
  content/site.ts toda a copy, equipe, registros e textos legais
  components/
    brand/        Logo, SymbolMark, SymbolDraw (desenho com o scroll), paths gerados
    ui/           Button (magnético), Icon (conjunto próprio, traço 1.5), Reveal, RevealText,
                  SectionHeading, GoldLine, Photo, Accordion
    interactive/  BrazilMap, Diagnostic, Timeline (GSAP), Cursor, WhatsAppFab, Preloader,
                  SmoothScroll (Lenis), ContactForm, Lazy (carregamento sob demanda), PurposeTrio, HeroParallax
    sections/     uma seção por arquivo, na ordem do textual
  lib/            whatsapp, eventos (pré-seleção de assunto/UF), esquema do formulário, tokens de movimento
```

Os tokens de design (cores, raios, sombras, easing) estão em `src/app/globals.css`, no bloco `@theme`. No Tailwind v4, esse bloco substitui o `tailwind.config`.

## 6. Segurança

- **Cabeçalhos HTTP** (`next.config.ts`): Content-Security-Policy restrita ao próprio domínio (sem scripts, fontes ou imagens de terceiros), HSTS, `X-Frame-Options: DENY` (impede o site de ser embutido em outros), `nosniff`, `Referrer-Policy`, `Permissions-Policy` (câmera, microfone, localização etc. bloqueados) e `Cross-Origin-Opener-Policy`.
- **Formulário / API:**
  - aceita só `POST` com JSON vindo do próprio site (checagem de `Origin`);
  - corpo limitado a 16 KB;
  - limite de 8 envios por IP a cada 10 minutos;
  - anti-robô: campo invisível (honeypot) e tempo mínimo de preenchimento;
  - validação rigorosa no servidor (zod), recusando quebras de linha e caracteres de controle (bloqueia injeção em cabeçalhos de e-mail);
  - conteúdo escapado no HTML do e-mail;
  - erros genéricos (sem detalhes internos) e nenhum dado pessoal gravado em log em produção.
- **Sem banco de dados, sem login, sem cookies** e sem ferramentas de rastreamento: superfície de ataque mínima.
- **Dependências:** `npm audit` sem vulnerabilidades.
- **Segredos:** a chave do Resend fica só nas variáveis da Vercel; arquivos `.env*` estão no `.gitignore`.
- O limite por IP fica na memória de cada instância. Para um limite global sob ataque, troque por Upstash/Vercel KV (`src/lib/rate-limit.ts`). A Vercel também tem proteção contra DDoS e um firewall configurável.

## 7. Desempenho e telas

- Testado em 360, 390, 768, 1024, 1280 e 1920 px, sem rolagem lateral. Todos os alvos de toque têm 24 px ou mais.
- Lighthouse: no computador, desempenho 99; no celular com limitação real de rede e CPU, 87–90. Acessibilidade, boas práticas e SEO: 100.
- Formulário e diagnóstico só carregam quando o visitante se aproxima deles. O desenho do mapa vem pronto do servidor.
- Rolagem suave e abertura animada só em computador; no celular a rolagem é a nativa.
- Fotos servidas em AVIF/WebP no tamanho de cada tela.

## 8. Acessibilidade e movimento

- Com `prefers-reduced-motion`, ficam desligados: preloader, parallax, cursor customizado, rotação do símbolo, rolagem suave e scrub da linha do tempo. Restam apenas fades curtos.
- Acordeões, diagnóstico (fieldset/legend com rádios nativos) e menu mobile (foco preso, Esc fecha) funcionam por teclado.
- O mapa tem uma alternativa em `select` de UF e anuncia o estado escolhido numa região *aria-live*.

## 9. Créditos e licenças

- Mapa do Brasil por estados: [`@svg-maps/brazil`](https://github.com/VictorCazanave/svg-maps), licença **CC BY 4.0**.
- Newsreader e Inter: SIL Open Font License, via Fontsource.
