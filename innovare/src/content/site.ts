/**
 * Innovare Contabilidade — conteúdo do site.
 *
 * Toda a copy do site vive aqui (fonte: "Textual completo do site institucional").
 * Nenhum texto fixo fica dentro dos componentes.
 *
 * ▸ PARA O CLIENTE: preencha os itens do objeto `fill` logo abaixo.
 *   Tudo que estiver `null` aparece no site como um marcador discreto "a preencher".
 *   Nada foi inventado: só o escritório tem esses dados.
 *
 * Nos textos, `{chave}` é substituído pelo valor de `fill[chave]`.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. DADOS A PREENCHER  ([PREENCHER] do textual)
// ─────────────────────────────────────────────────────────────────────────────
export const fill = {
  /** URL pública do site, sem barra no final. Ex.: "https://www.innovare.com.br". Também aceita NEXT_PUBLIC_SITE_URL. */
  siteUrl: null as string | null,

  /** Fundadoras: nome e cargo de cada uma (legendas das fotos). */
  founders: [
    { name: null as string | null, role: null as string | null },
    { name: null as string | null, role: null as string | null },
  ],

  /** CNPJ e registro no CRC (rodapé). */
  cnpj: null as string | null,
  crc: null as string | null,

  /** Faixa de números — só use dados reais. Para exibir, preencha e ligue `showNumbers`. */
  yearsActive: null as string | null,
  companiesServed: null as string | null,
  statesWithClients: null as string | null,

  /** Texto jurídico da Política de Privacidade (LGPD). Parágrafos separados por linha em branco. */
  privacyPolicy: null as string | null,
  /** Texto dos Termos de uso. */
  termsOfUse: null as string | null,
};

/** Liga a versão "com dados" da faixa de números (seção 10). Mantenha `false` enquanto não houver números reais. */
export const showNumbers = false;

/** Rótulos dos marcadores exibidos enquanto um campo não for preenchido. */
export const fillHints: Record<string, string> = {
  founders: "nome e cargo de cada fundadora",
  cnpj: "CNPJ",
  crc: "CRC",
  yearsActive: "anos",
  companiesServed: "nº",
  statesWithClients: "nº",
  privacyPolicy: "texto jurídico conforme LGPD",
  termsOfUse: "texto dos termos de uso",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONTATO
// ─────────────────────────────────────────────────────────────────────────────
export const contact = {
  /**
   * ATENÇÃO: o número veio como "+55 49 9957-4160" (8 dígitos após o DDD).
   * Celulares no Brasil têm 9 dígitos. Confirmar antes de publicar.
   */
  whatsappDisplay: "+55 49 9957-4160",
  whatsappNumber: "554999574160",
  whatsappDefaultMessage: "Olá, Innovare! Vim pelo site e gostaria de conversar sobre a minha empresa.",
  instagramHandle: "@innovare_contabilidadee",
  instagramUrl: "https://www.instagram.com/innovare_contabilidadee",
  city: "Chapecó",
  state: "Santa Catarina",
  stateShort: "SC",
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. COPY
// ─────────────────────────────────────────────────────────────────────────────
export const meta = {
  title: "Innovare Contabilidade | Contabilidade boutique, 100% online para todo o Brasil",
  description:
    "Contabilidade empresarial, gestão contábil e administrativa e assessoria em licitações. Atendimento 100% online, direto do seu celular, com a atenção de um escritório boutique. Sede em Chapecó-SC.",
  signature: "Aqui criamos novas oportunidades.",
  promise: "Mais do que organizar números, ajudamos a organizar decisões.",
  lang: "pt-BR",
  brandName: "Innovare Contabilidade",
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Licitações", href: "#licitacoes" },
  { label: "Perguntas", href: "#perguntas" },
  { label: "Contato", href: "#contato" },
];

export const header = {
  cta: "Falar com a Innovare",
  mobileMenuTitle: "Menu",
  mobileMenuFooter: "Atendimento 100% online · Todo o Brasil",
  // Microcopy de acessibilidade (não visível)
  a11y: { openMenu: "Abrir menu", closeMenu: "Fechar menu", home: "Innovare Contabilidade, início", skip: "Pular para o conteúdo" },
};

export const hero = {
  eyebrow: "CONTABILIDADE BOUTIQUE · CHAPECÓ-SC · TODO O BRASIL",
  title: "Mais do que organizar números, organizamos decisões.",
  subtitle:
    "Contabilidade boutique, 100% online, para empresas de todo o Brasil. Gestão contábil e administrativa com método, clareza e a atenção de quem conhece o seu negócio.",
  ctaPrimary: "Falar com a Innovare",
  ctaSecondary: "Conhecer os serviços",
  seal: "Atendimento 100% online · Todo o Brasil",
  scroll: "Role para conhecer",
};

export const pillars = [
  { icon: "phone", title: "Contabilidade online", text: "descomplicada" },
  { icon: "building", title: "Contabilidade empresarial", text: "do abrir ao crescer" },
  { icon: "seal", title: "Assessoria em licitações", text: "para vender ao setor público" },
  { icon: "globe", title: "Atendimento 100% online", text: "todo o Brasil" },
] as const;

export const about = {
  eyebrow: "SOBRE A INNOVARE",
  title: "Uma contabilidade com a atenção de quem conhece o seu nome.",
  photo: {
    src: "/images/fundadoras-01.jpg" as string | null,
    alt: "As duas fundadoras da Innovare no escritório",
    width: 2000,
    height: 1116,
  },
  manifesto: [
    "Uma empresa não se sustenta por acaso. Sustenta-se por decisões tomadas com informação confiável, no tempo certo.",
    "Trabalhamos com números porque eles descrevem o que a rotina esconde. Organizamos, verificamos e explicamos, para que a conversa com o empresário seja sobre escolhas, não sobre planilhas.",
    "Não temos pressa em prometer. Temos método para entregar. Trabalhamos há tempo suficiente para saber que reputação se constrói por continuidade.",
  ],
  support:
    "A Innovare nasceu em Chapecó para romper o padrão de uma área historicamente tradicional e genérica. Somos um escritório boutique, construído sobre anos de relacionamento de confiança com grandes nomes da região, com carteira cuidada, atendimento próximo e soluções desenhadas para a realidade de cada empresa.",
  pillars: [
    { title: "Propósito.", text: "Traduzir números em informação útil para a gestão." },
    { title: "Missão.", text: "Dar ao empresário do Oeste condições de decidir com segurança." },
    { title: "Promessa.", text: "Mais do que organizar números, ajudamos a organizar decisões." },
  ],
  notPromised:
    "Não prometemos velocidade. Não prometemos resultados extraordinários. Não prometemos revolucionar a sua empresa. Prometemos método e continuidade.",
  values: [
    { icon: "check", title: "Rigor.", text: "Cada lançamento, prazo e obrigação conferidos com método." },
    { icon: "eye", title: "Clareza.", text: "Você entende o que está acontecendo no seu negócio, sem tradução." },
    { icon: "people", title: "Presença.", text: "Um time de verdade, que responde e acompanha de perto." },
  ],
  symbol: {
    eyebrow: "O SÍMBOLO",
    title: "Valor, confiança e organização, desde a origem.",
    paragraphs: [
      "No centro da marca está um símbolo inspirado no Jiaozi, considerado o primeiro papel-moeda da história, criado na China durante a dinastia Song. Mais do que dinheiro, o Jiaozi nasceu como parte de um sistema de cobrança tributária, um dos elos mais antigos entre valor, confiança e organização fiscal de que se tem registro.",
      "Assim como o Jiaozi marcou a origem da relação entre pessoas, valor e Estado, a Innovare representa hoje a ponte entre os nossos clientes e a gestão inteligente do seu patrimônio.",
    ],
    link: { label: "Conheça nossa forma de trabalhar →", href: "#como-funciona" },
  },
};

/** Assuntos do formulário de contato (também usados para pré-selecionar a partir dos CTAs). */
export const subjects = [
  { id: "gestao", label: "Gestão contábil e administrativa" },
  { id: "online", label: "Contabilidade online" },
  { id: "empresarial", label: "Contabilidade empresarial" },
  { id: "licitacoes", label: "Assessoria em licitações" },
  { id: "outro", label: "Outro assunto" },
] as const;
export type SubjectId = (typeof subjects)[number]["id"];

export const services = {
  eyebrow: "NOSSOS SERVIÇOS",
  title: "O essencial do seu negócio, em boas mãos.",
  subtitle: "Quatro frentes pensadas para que você cuide da empresa e a gente cuide do resto.",
  items: [
    {
      number: "01",
      icon: "ledger",
      subject: "gestao" as SubjectId,
      title: "Gestão Contábil e Administrativa",
      summary: "A rotina contábil, fiscal e administrativa da sua empresa organizada em um só lugar.",
      details: [
        "Escrituração contábil e fiscal",
        "Apuração e acompanhamento de impostos",
        "Folha de pagamento e obrigações trabalhistas",
        "Relatórios gerenciais claros e periódicos",
        "Apoio na organização administrativa e financeira",
      ],
      closing: "Menos burocracia no seu dia. Mais visão sobre o seu negócio.",
      cta: "Quero organizar minha gestão",
    },
    {
      number: "02",
      icon: "phone",
      subject: "online" as SubjectId,
      title: "Contabilidade online, descomplicada",
      summary: "Documentos, dúvidas e acompanhamento pelo celular, sem papel, sem fila, sem deslocamento.",
      details: [
        "Envio de documentos digital e seguro",
        "Comunicação direta com o seu contador",
        "Acompanhamento de prazos e guias",
        "Processos simples, linguagem simples",
      ],
      closing: "Contabilidade que cabe no seu bolso, no seu celular e na sua rotina.",
      cta: "Quero uma contabilidade online",
    },
    {
      number: "03",
      icon: "building",
      subject: "empresarial" as SubjectId,
      title: "Contabilidade empresarial",
      summary: "Da abertura à expansão, suporte contábil completo para empresas de diferentes portes e segmentos.",
      details: [
        "Abertura, alteração e encerramento de empresas",
        "Planejamento tributário",
        "Regularização e organização contábil",
        "Acompanhamento ao longo do crescimento do negócio",
      ],
      closing: "Decisões tributárias melhores começam com uma contabilidade bem feita.",
      cta: "Quero falar sobre minha empresa",
    },
    {
      number: "04",
      icon: "seal",
      subject: "licitacoes" as SubjectId,
      title: "Assessoria em licitações",
      summary: "Apoio técnico para empresas que querem participar de licitações e vender ao setor público com segurança.",
      details: [
        "Análise de editais e documentação exigida",
        "Organização de certidões, balanços e índices contábeis",
        "Apoio na habilitação econômico-financeira",
        "Acompanhamento das etapas do processo",
      ],
      closing: "Menos risco de inabilitação. Mais confiança para disputar.",
      cta: "Quero participar de licitações",
    },
  ],
  footer: { text: "Não encontrou o que procura? Conte o que você precisa.", cta: "Falar com a Innovare" },
};

export const howItWorks = {
  eyebrow: "COMO FUNCIONA",
  title: "Simples de começar. Tranquilo de manter.",
  steps: [
    { title: "Conversa inicial", text: "Você nos conta sobre a sua empresa, seus desafios e o que espera da contabilidade. Sem compromisso." },
    { title: "Diagnóstico", text: "Entendemos o seu momento, o regime tributário e as obrigações envolvidas, e desenhamos a melhor solução." },
    { title: "Implantação", text: "Cuidamos da transição de ponta a ponta: documentos, acessos e organização. Você não precisa se preocupar com a mudança." },
    { title: "Acompanhamento", text: "Rotina em dia, relatórios claros e um contador à disposição para as suas dúvidas e decisões." },
  ],
  stepLabel: "Passo",
  closing: "Do primeiro contato à rotina em dia, tudo pelo celular.",
  cta: "Começar agora",
};

export const brazil = {
  eyebrow: "ONDE VOCÊ ESTIVER",
  title: "Todo o Brasil, direto do seu celular.",
  text: "Nossa sede é em Chapecó-SC, mas o atendimento não tem fronteira. Atendemos empresas de todo o Brasil por meio de processos 100% digitais: documentos, reuniões e acompanhamento sem que você precise sair da sua rotina.",
  highlights: [
    { icon: "paper", title: "Sem papel.", text: "Documentos enviados e assinados digitalmente." },
    { icon: "video", title: "Sem distância.", text: "Reuniões por vídeo e conversa direta pelo WhatsApp." },
    { icon: "check", title: "Sem complicação.", text: "Tudo organizado, acessível e seguro." },
  ],
  instruction: "Passe o mouse ou toque em um estado",
  tooltip: "{uf} · Atendemos sua empresa 100% online",
  tooltipHQ: "Santa Catarina · Nossa sede, em Chapecó",
  hqMarker: "Sede em Chapecó",
  cta: "Atender minha empresa",
  a11y: { selectLabel: "Estado", mapLabel: "Mapa do Brasil por estados" },
};

export const tenders = {
  eyebrow: "ASSESSORIA EM LICITAÇÕES",
  title: "Venda para o setor público com segurança contábil.",
  paragraphs: [
    "Participar de licitações exige mais do que preço competitivo. Exige documentação em ordem, índices contábeis consistentes e atenção a cada exigência do edital.",
    "A Innovare acompanha a sua empresa nesse caminho, cuidando da parte contábil e documental para que você dispute com confiança.",
  ],
  deliverables: [
    { icon: "search", text: "Análise contábil do edital" },
    { icon: "ledger", text: "Organização de balanço e índices" },
    { icon: "paper", text: "Certidões e documentos de habilitação" },
    { icon: "compass", text: "Orientação técnica durante o processo" },
  ],
  card: { text: "Vai participar de um edital? Fale com a gente antes.", cta: "Conversar sobre licitações" },
};

export const audience = {
  eyebrow: "PARA QUEM",
  title: "Para quem leva o próprio negócio a sério.",
  profiles: [
    { icon: "key", strong: "Quem está abrindo uma empresa", text: "e quer começar do jeito certo" },
    { icon: "growth", strong: "Empresas em crescimento", text: "que precisam de organização e planejamento" },
    { icon: "people", strong: "Negócios que querem sair de uma contabilidade distante", text: "e ser bem atendidos" },
    { icon: "seal", strong: "Empresas que vendem para o governo", text: "e precisam de suporte em licitações" },
    { icon: "phone", strong: "Empresários de qualquer lugar do Brasil", text: "que preferem resolver tudo pelo celular" },
  ],
};

export const numbers = {
  /** Versão com dados (só aparece com showNumbers = true). `{chave}` vem de `fill`. */
  withData: [
    { value: "{yearsActive}", suffix: "+", label: "anos de atuação" },
    { value: "{companiesServed}", suffix: "+", label: "empresas atendidas" },
    { value: "{statesWithClients}", suffix: "", label: "estados com clientes" },
    { value: "100", suffix: "%", label: "online" },
  ],
  qualitative: [
    { strong: "Atendimento próximo", text: "com contador de referência" },
    { strong: "Processos digitais", text: "sem papel e sem fila" },
    { strong: "Todo o Brasil", text: "sem barreira de distância" },
    { strong: "Rigor técnico", text: "em cada obrigação" },
  ],
  a11yTitle: "A Innovare em números",
};

export const team = {
  eyebrow: "QUEM ESTÁ POR TRÁS",
  title: "Relações que se constroem com cuidado.",
  photo: {
    src: "/images/fundadoras-02.jpg" as string | null,
    alt: "As duas fundadoras da Innovare conversando à mesa do escritório",
    width: 2000,
    height: 1116,
  },
  text: "Por trás da Innovare há uma equipe que acompanha cada cliente de perto. Aqui, você fala com quem conhece o seu negócio e responde pelas decisões do escritório.",
  cta: "Conversar com a equipe",
};

export const faq = {
  title: "Perguntas frequentes",
  items: [
    {
      q: "A Innovare atende empresas fora de Santa Catarina?",
      a: "Sim. Nosso atendimento é 100% online e cobre todo o Brasil. Você conversa com a equipe por vídeo e WhatsApp e envia seus documentos de forma digital e segura.",
    },
    {
      q: "Como funciona a troca de contabilidade?",
      a: "Nós cuidamos da transição. Solicitamos as informações necessárias, organizamos a documentação e conduzimos o processo junto ao contador anterior, para que você não tenha retrabalho nem interrupção.",
    },
    { q: "Preciso enviar documentos em papel?", a: "Não. Todo o fluxo é digital: você envia pelo celular e acompanha tudo de forma organizada." },
    {
      q: "Quanto custa a contabilidade?",
      a: "Depende do porte, do regime tributário e das necessidades da sua empresa. Fazemos um diagnóstico inicial e apresentamos uma proposta clara, sem surpresas.",
    },
    {
      q: "Vocês ajudam a abrir uma empresa?",
      a: "Sim. Orientamos desde a escolha do enquadramento até o registro e o início da operação, para que você comece com a estrutura certa.",
    },
    {
      q: "Como funciona a assessoria em licitações?",
      a: "Analisamos o edital sob a ótica contábil, organizamos a documentação de habilitação e acompanhamos as etapas para reduzir o risco de inabilitação.",
    },
    {
      q: "Com quem eu falo no dia a dia?",
      a: "Com uma equipe que conhece a sua empresa. Você tem um canal direto com a Innovare, sem robôs, sem protocolo e sem ter que repetir a sua história.",
    },
  ],
};

export const diagnostic = {
  eyebrow: "CONVERSA RÁPIDA",
  title: "Em 4 perguntas, entendemos o seu momento.",
  support: "Responda em menos de um minuto e já falamos com você com o contexto certo.",
  questions: [
    {
      id: "phase",
      label: "Em que fase está a sua empresa?",
      options: [
        // `service` preenche o [serviço escolhido] da tela final.
        { value: "Vou abrir uma empresa", service: "contabilidade empresarial" },
        { value: "Já tenho empresa e quero trocar de contabilidade", service: "contabilidade online" },
        { value: "Quero organizar a gestão contábil e administrativa", service: "gestão contábil e administrativa" },
        { value: "Quero participar de licitações", service: "assessoria em licitações" },
      ],
    },
    {
      id: "size",
      label: "Qual é o porte aproximado?",
      options: [{ value: "MEI" }, { value: "Microempresa" }, { value: "Pequena empresa" }, { value: "Média empresa" }],
    },
    { id: "uf", label: "Em que estado a empresa atua?", options: [] as { value: string; service?: string }[] },
    {
      id: "channel",
      label: "Como prefere ser atendido?",
      options: [{ value: "WhatsApp" }, { value: "Videochamada" }, { value: "E-mail" }],
    },
  ],
  ufPlaceholder: "UF",
  progress: "Pergunta {n} de 4",
  back: "Voltar",
  next: "Próxima",
  result: {
    title: "Obrigado. Já entendemos o seu momento.",
    text: "Com base nas suas respostas, vamos preparar uma conversa objetiva sobre {service}. Clique abaixo para falar com a gente.",
    cta: "Continuar no WhatsApp",
  },
  whatsappTemplate:
    "Olá, Innovare! Vim pelo site. Minha empresa está na fase: {phase}, porte: {size}, atua em: {uf}. Prefiro atendimento por {channel}. Podemos conversar?",
};

export const finalCta = {
  title: "Aqui criamos novas oportunidades.",
  subtitle: "Sua contabilidade merece método e cuidado de verdade.",
  text: "Vamos conversar sobre a sua empresa. Sem compromisso, sem burocracia, direto do seu celular.",
  primary: "Falar com a Innovare",
  secondary: "Enviar mensagem",
};

export const contactSection = {
  title: "Fale com a Innovare",
  text: "Conte um pouco sobre a sua empresa.",
  form: {
    name: "Nome",
    company: "Empresa",
    email: "E-mail",
    whatsapp: "WhatsApp",
    subject: "Sobre o que você quer falar?",
    message: "Mensagem",
    consent: { before: "Concordo em ser contatado(a) e com a ", link: "Política de Privacidade", after: "." },
    submit: "Enviar mensagem",
    sending: "Enviando…",
  },
  states: {
    success: "Mensagem enviada. Em breve entraremos em contato.",
    fieldError: "Confira este campo para continuarmos.",
    generalError: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
  },
  details: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    hq: "Sede",
  },
  footerLine: "Atendimento 100% online · Todo o Brasil",
};

export const footer = {
  phrase: "Aqui criamos novas oportunidades.",
  subphrase: "Contabilidade boutique, 100% online, para todo o Brasil.",
  columns: { nav: "Navegação", services: "Serviços", contact: "Contato" },
  services: [
    "Gestão Contábil e Administrativa",
    "Contabilidade online",
    "Contabilidade empresarial",
    "Assessoria em licitações",
  ],
  hqShort: "Chapecó-SC",
  rights: "© {year} Innovare Contabilidade. Todos os direitos reservados.",
  legal: "CNPJ {cnpj} · CRC {crc}",
  privacy: "Política de Privacidade",
  terms: "Termos de uso",
};

export const whatsappFab = { label: "Fale com a Innovare" };

export const legalPages = {
  privacy: { title: "Política de Privacidade", body: "{privacyPolicy}" },
  terms: { title: "Termos de uso", body: "{termsOfUse}" },
  back: "Voltar ao início",
};

export const preloader = { skip: "Pular" };

/** Estados (nome + sigla) — usado no mapa e no diagnóstico. */
export const ufs = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"], ["BA", "Bahia"], ["CE", "Ceará"],
  ["DF", "Distrito Federal"], ["ES", "Espírito Santo"], ["GO", "Goiás"], ["MA", "Maranhão"], ["MT", "Mato Grosso"],
  ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"], ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"],
  ["PE", "Pernambuco"], ["PI", "Piauí"], ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"],
  ["RS", "Rio Grande do Sul"], ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"], ["SP", "São Paulo"],
  ["SE", "Sergipe"], ["TO", "Tocantins"],
] as const;
