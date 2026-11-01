import type { AssetKey } from '../lib/assetManifest';

/* ------------------------------------------------------------------
 * Páginas do livro exibidas na seção "Espie o livro".
 * O texto alternativo reproduz o texto original de cada página.
 * ------------------------------------------------------------------ */
export type BookSpread = { asset: AssetKey; alt: string; caption: string; bg: string };

export const bookSpreads: BookSpread[] = [
  {
    asset: 'assets/illustrations/p02-essa-e-a-lulu',
    caption: 'Essa é a Lulu.',
    alt: 'Página do livro: Lulu em pé, segurando um giz lilás. Texto: "Essa é a Lulu. Ela gosta de olhar para o céu, ouvir músicas suaves e ficar no balanço. E mais do que tudo... Ela ama desenhar!"',
    bg: '#cfe1f9',
  },
  {
    asset: 'assets/illustrations/p03-parede-da-sala',
    caption: 'Traços que se repetem.',
    alt: 'Página do livro: Lulu de costas desenhando flores na parede da sala. Texto: "A Lulu fica feliz ao desenhar, repetindo os traços com o lápis, e escutar sons baixinhos."',
    bg: '#f6f4cf',
  },
  {
    asset: 'assets/illustrations/p04-texturas-e-musicas',
    caption: 'Texturas macias, músicas baixinhas.',
    alt: 'Página do livro: notas musicais coloridas e o rosto da Lulu espiando. Texto: "Lulu ama texturas macias e músicas que dançam baixinho nos seus ouvidos. Seus desenhos são cheios de linhas que se repetem (com cuidado). Isso a acalma."',
    bg: '#f3e2c4',
  },
  {
    asset: 'assets/illustrations/p06-rotina-na-escola',
    caption: 'Uma rotina que acalma.',
    alt: 'Página do livro: Lulu lendo um livro cercada de letras. Texto: "Na escola, Lulu tem uma rotina. Isso a deixa tranquila. Ela sabe a hora do lanche, da leitura, do desenho. E isso faz seu coração bater mais calmo."',
    bg: '#cfedf3',
  },
  {
    asset: 'assets/illustrations/p10-cartao-da-professora',
    caption: 'Um cartão, mostrado devagar.',
    alt: 'Página do livro: a mão da professora mostra um cartão escrito "Vamos sair um pouco?". Texto: "A professora viu Lulu. Pegou um cartão e mostrou devagar. Lulu respirou fundo. Ela sabia que podia confiar."',
    bg: '#fff3e7',
  },
  {
    asset: 'assets/illustrations/p13-so-preciso-de-calma',
    caption: '"Eu só preciso de calma."',
    alt: 'Página do livro: Lulu sorrindo com os braços abertos. Texto: "— Eu só preciso de calma, disse Lulu. — Tudo bem, disseram os amigos. E continuaram desenhando, cada um do seu jeitinho."',
    bg: '#c8d7cd',
  },
  {
    asset: 'assets/illustrations/p14-luz-atras-das-nuvens',
    caption: 'Como a luz do sol atrás das nuvens.',
    alt: 'Página do livro: Lulu sentada na grama, sorrindo. Texto: "Lulu é como a luz do sol atrás das nuvens: sempre brilhando, mesmo em silêncio. Seu brilho tem cor, forma e sentimento."',
    bg: '#e7ede7',
  },
];

/* ------------------------------------------------------------------
 * SEÇÃO 03 — Universo da Lulu
 * ------------------------------------------------------------------ */
export type UniverseItem = {
  id: string;
  title: string;
  short: string;
  more: string;
  quote: string;
  asset: AssetKey;
  objectPosition: string;
  tint: string;
  accent: string;
};

export const universeItems: UniverseItem[] = [
  {
    id: 'arte',
    title: 'Arte e desenho',
    short: 'O lápis é uma das formas que a Lulu encontra para se expressar.',
    more: 'Desenhar, repetir traços e preencher o papel com linhas que se repetem é, para a Lulu, um jeito de organizar o que sente. Na história, é com um traço que ela volta a sorrir.',
    quote: '"E mais do que tudo... Ela ama desenhar!"',
    asset: 'assets/illustrations/p03-parede-da-sala',
    objectPosition: '82% 60%',
    tint: '#f6f4cf',
    accent: '#874599',
  },
  {
    id: 'texturas',
    title: 'Texturas e sensações',
    short: 'Algumas sensações acolhem. Outras incomodam muito.',
    more: 'Texturas macias deixam a Lulu confortável. Luzes fortes e barulhos altos podem ser demais. Reconhecer essas preferências é uma forma de respeito.',
    quote: '"Lulu ama texturas macias…"',
    asset: 'assets/illustrations/p04-texturas-e-musicas',
    objectPosition: '92% 50%',
    tint: '#f3e2c4',
    accent: '#7a4b1f',
  },
  {
    id: 'sons',
    title: 'Sons e tranquilidade',
    short: 'Músicas suaves, sons baixinhos e um tempo de silêncio.',
    more: 'Quando tudo acontece rápido demais, a Lulu precisa de calma. Na história, os amigos entendem e esperam — cada um respeitando o tempo do outro.',
    quote: '"Eu só preciso de calma."',
    asset: 'assets/illustrations/p13-so-preciso-de-calma',
    objectPosition: '85% 40%',
    tint: '#c8d7cd',
    accent: '#213f2d',
  },
  {
    id: 'rotina',
    title: 'Rotina e previsibilidade',
    short: 'Saber o que vem depois deixa o coração mais calmo.',
    more: 'A hora do lanche, da leitura, do desenho. Antecipar as atividades ajuda a Lulu a se sentir segura — e surpresas podem deixar tudo "bagunçado".',
    quote: '"E isso faz seu coração bater mais calmo."',
    asset: 'assets/illustrations/p06-rotina-na-escola',
    objectPosition: '80% 50%',
    tint: '#cfedf3',
    accent: '#213363',
  },
];

/* ------------------------------------------------------------------
 * SEÇÃO 05 — Kit de recursos visuais
 * `photo`: quando houver fotos reais do material, informe aqui o asset
 * e a composição ilustrativa será substituída automaticamente.
 * ------------------------------------------------------------------ */
export type KitItem = {
  id: string;
  number: string;
  title: string;
  summary: string;
  highlights: string[];
  color: string;
  soft: string;
  photo: AssetKey | null;
};

export const kitItems: KitItem[] = [
  {
    id: 'calendario',
    number: '01',
    title: 'Calendário visual de rotina',
    summary: 'Um recurso para organizar e antecipar atividades do cotidiano de maneira visual.',
    highlights: [
      'Organização das atividades',
      'Visualização da rotina',
      'Acompanhamento das tarefas realizadas',
      'Sistema de estrelas para marcar atividades concluídas',
    ],
    color: '#213363',
    soft: '#cfedf3',
    photo: null,
  },
  {
    id: 'caderno',
    number: '02',
    title: 'Caderno de atividades',
    summary: 'Uma extensão da história da Lulu, com propostas de interação, desenho e expressão.',
    highlights: ['Atividades interativas', 'Exploração visual', 'Expressão criativa', 'Continuidade da experiência do livro'],
    color: '#a3418f',
    soft: '#f9e7f3',
    photo: null,
  },
  {
    id: 'interacao',
    number: '03',
    title: 'Livro de interação entre adulto e criança',
    summary: 'Um material pensado para estimular momentos de leitura compartilhada, conversa e conexão.',
    highlights: [
      'Interação entre responsáveis e crianças',
      'Conversas sobre sentimentos e experiências',
      'Momentos de descoberta',
      'Fortalecimento dos vínculos',
    ],
    color: '#213f2d',
    soft: '#c8d7cd',
    photo: null,
  },
  {
    id: 'comunicacao',
    number: '04',
    title: 'Cartões de comunicação visual',
    summary: 'Recursos visuais para apoiar a expressão de necessidades, desejos e intenções.',
    highlights: [
      'Apoio à comunicação',
      'Representações visuais',
      'Possibilidades de uso no cotidiano',
      'Adaptação às necessidades individuais',
    ],
    color: '#3f577b',
    soft: '#e4edfb',
    photo: null,
  },
  {
    id: 'emocoes',
    number: '05',
    title: 'Cartas das emoções',
    summary: 'Cartas para facilitar conversas sobre sentimentos e emoções.',
    highlights: [
      'Reconhecimento das emoções',
      'Identificação de sentimentos',
      'Conversas sobre experiências',
      'Apoio à expressão emocional',
    ],
    color: '#874599',
    soft: '#f2e3f6',
    photo: null,
  },
];

/* ------------------------------------------------------------------
 * SEÇÃO 07 — Para quem é
 * ------------------------------------------------------------------ */
export const audiences = [
  {
    title: 'Famílias',
    text: 'Que desejam compartilhar histórias, conversar sobre diferenças e criar momentos de leitura juntos.',
    decor: 'assets/decorative/heart-pair-b' as AssetKey,
    bg: '#f9e7f3',
    ink: '#6e2a61',
  },
  {
    title: 'Crianças',
    text: 'Que se beneficiam de recursos visuais — sempre respeitando o ritmo, os interesses e as necessidades de cada uma.',
    decor: 'assets/decorative/note-green' as AssetKey,
    bg: '#e4edfb',
    ink: '#213363',
  },
  {
    title: 'Educadores',
    text: 'Que desejam trabalhar inclusão, empatia e respeito às diferenças com a turma, de um jeito leve e acolhedor.',
    decor: 'assets/decorative/letter-a' as AssetKey,
    bg: '#cfedf3',
    ink: '#213363',
  },
  {
    title: 'Profissionais',
    text: 'Que trabalham com desenvolvimento infantil e buscam materiais complementares para suas atividades.',
    decor: 'assets/decorative/sparkle' as AssetKey,
    bg: '#c8d7cd',
    ink: '#213f2d',
  },
];

/* ------------------------------------------------------------------
 * SEÇÃO 10 — FAQ
 * Respostas marcadas com `pending: true` dependem de definições comerciais.
 * ------------------------------------------------------------------ */
export type Faq = { q: string; a: string; pending?: boolean };

export const faqs: Faq[] = [
  {
    q: 'O que acompanha o livro da Lulu?',
    a: 'O kit reúne o livro "Lulu — a luz que brilha diferente" e cinco recursos visuais complementares: calendário visual de rotina, caderno de atividades, livro de interação entre adulto e criança, cartões de comunicação visual e cartas das emoções. O formato de cada item será informado junto às condições de compra.',
  },
  {
    q: 'Para qual faixa etária o material foi desenvolvido?',
    a: 'A história tem linguagem simples, frases curtas e ilustrações acolhedoras, pensadas para a infância e para a leitura compartilhada com um adulto. A indicação de faixa etária será publicada junto às especificações do produto.',
    pending: true,
  },
  {
    q: 'O kit pode ser utilizado em casa?',
    a: 'Sim. O livro e os recursos foram pensados para diferentes momentos do cotidiano — como a leitura antes de dormir, a organização da rotina ou uma conversa sobre como foi o dia. Cada família pode adaptar o uso ao jeito e ao tempo da criança.',
  },
  {
    q: 'Os recursos podem ser utilizados por educadores?',
    a: 'Sim. A história é uma porta de entrada para conversar com a turma sobre diferenças, empatia e respeito. Os recursos visuais podem complementar atividades em sala, sempre adaptados à realidade de cada grupo.',
  },
  {
    q: 'Como utilizar os cartões de comunicação?',
    a: 'Os cartões funcionam como apoio visual para expressar necessidades, desejos e intenções. Assim como a professora faz no livro, a ideia é apresentá-los com calma, dar tempo para a criança e observar o que faz sentido para ela. Cada criança é única: o uso pode — e deve — ser adaptado. Se a criança tem acompanhamento profissional, vale combinar o uso com a equipe.',
  },
  {
    q: 'O material substitui acompanhamento profissional?',
    a: 'Não. A Lulu é uma experiência de leitura e interação, de caráter educativo e afetivo. Ela não substitui avaliação, terapia ou acompanhamento de profissionais de saúde e educação, e não promete resultados terapêuticos.',
  },
  {
    q: 'Como funciona a compra e a entrega?',
    a: 'As formas de pagamento, prazos e opções de entrega estão sendo definidas e serão publicadas nesta página assim que estiverem disponíveis.',
    pending: true,
  },
  {
    q: 'O livro e o kit podem ser adquiridos separadamente?',
    a: 'As opções de compra (livro, kit completo ou itens avulsos) ainda estão sendo definidas. Assim que houver novidades, elas aparecerão aqui.',
    pending: true,
  },
];
