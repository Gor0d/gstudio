export const SITE_URL = "https://gorod-studio.vercel.app";

export const pricing = {
  landing: { label: "Landing page", from: 1490 },
  institutional: { label: "Site institucional", from: 2990 },
  note: "Valores indicativos. Escopo, prazo e integrações influenciam o orçamento final.",
  custom: "Sob medida, mediante diagnóstico e orçamento.",
};

export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

export const tagline = "Tecnologia que transforma processos em resultados.";
export const centralMessage =
  "Desenvolvemos sites, sistemas empresariais, dashboards de Business Intelligence e soluções de inteligência artificial para empresas que desejam vender melhor, automatizar processos e crescer com tecnologia.";

export type Faq = { q: string; a: string };

export type Division = {
  slug: "web" | "systems" | "intelligence" | "ai";
  name: string;
  short: string;
  problem: string;
  intro: string;
  deliverables: string[];
  signs: string[];
  pricing: string;
  cta: string;
  notice?: string;
  faq: Faq[];
};

const webPricing = `Landing page a partir de ${formatBRL(pricing.landing.from)}; site institucional a partir de ${formatBRL(pricing.institutional.from)}. ${pricing.note}`;

export const divisions: Division[] = [
  {
    slug: "web",
    name: "Gorod Web",
    short: "Landing pages, sites institucionais, portfólios, catálogos digitais e e-commerce.",
    problem: "Seu cliente não encontra, não entende ou não consegue pedir.",
    intro: "Presença digital pensada para transformar visita em contato, pedido ou venda, com carregamento rápido e boa leitura no celular.",
    deliverables: ["Landing pages", "Sites institucionais", "Portfólios", "Catálogos digitais", "E-commerce"],
    signs: ["O negócio depende só de redes sociais", "O cliente não acha a informação certa", "A jornada até o pedido tem atrito"],
    pricing: webPricing,
    cta: "Solicitar orçamento de site",
    faq: [
      { q: "Quanto custa um site?", a: webPricing },
      { q: "Vocês fazem e-commerce?", a: "Sim. O escopo depende de catálogo, pagamento e logística; por isso começa com uma conversa de diagnóstico." },
      { q: "O site será otimizado para buscas?", a: "Entregamos estrutura semântica, metadata e desempenho adequados. Posicionamento em buscas depende também de conteúdo e tempo, e não prometemos ranking." },
    ],
  },
  {
    slug: "systems",
    name: "Gorod Systems",
    short: "Sistemas empresariais, CRM, estoque, PDV, ERP simplificado e portais internos.",
    problem: "O trabalho depende de planilhas, papel e mensagens.",
    intro: "Sistemas web e aplicações internas que organizam o fluxo da operação: quem faz o quê, em que etapa e com qual histórico.",
    deliverables: ["Sistemas empresariais", "CRM", "Gestão de estoque", "PDV", "ERP simplificado", "Portais e aplicações internas"],
    signs: ["A mesma informação é digitada mais de uma vez", "Ninguém sabe o status sem perguntar", "O processo cresceu além da planilha"],
    pricing: pricing.custom,
    notice: "Funcionalidades fiscais e integrações homologadas são avaliadas caso a caso e não fazem parte da oferta padrão.",
    cta: "Solicitar diagnóstico de sistema",
    faq: [
      { q: "Vocês substituem meu sistema atual?", a: "Nem sempre é necessário. Avaliamos se faz mais sentido evoluir, integrar ou substituir." },
      { q: "O sistema funciona sem internet?", a: "Depende do desenho. Já desenvolvemos um PDV desktop com banco local; veja o projeto." },
      { q: "Como é definido o preço?", a: "Após um diagnóstico do processo, com escopo por etapas para reduzir risco." },
    ],
  },
  {
    slug: "intelligence",
    name: "Gorod Intelligence",
    short: "Business Intelligence, Power BI, dashboards, ETL, integrações SQL/API e relatórios automatizados.",
    problem: "Os indicadores chegam tarde, incompletos ou dependem de consolidação manual.",
    intro: "Conectamos fontes de dados, tratamos e entregamos indicadores confiáveis para quem decide.",
    deliverables: ["Business Intelligence", "Power BI", "Dashboards gerenciais", "ETL e pipelines", "Integrações SQL e APIs", "Indicadores e relatórios automatizados"],
    signs: ["Relatórios exigem trabalho manual recorrente", "Cada área tem um número diferente", "As fontes de dados não conversam"],
    pricing: pricing.custom,
    cta: "Solicitar diagnóstico de dados",
    faq: [
      { q: "Preciso ter um data warehouse?", a: "Não necessariamente. Começamos pelas fontes existentes e propomos a estrutura mínima necessária." },
      { q: "Trabalham com Power BI?", a: "Sim, além de dashboards web sob medida quando fazem mais sentido." },
      { q: "Meus dados ficam seguros?", a: "Acesso mínimo necessário, sem credenciais em repositório e combinação prévia sobre tratamento de dados sensíveis." },
    ],
  },
  {
    slug: "ai",
    name: "Gorod AI & Automation",
    short: "Assistentes, agentes com ferramentas e APIs, RAG, automação e integração entre sistemas.",
    problem: "A equipe repete tarefas previsíveis ou há um caso de uso concreto para IA.",
    intro: "Automação e IA aplicadas a um processo específico, com limites claros, revisão humana quando necessário e medição do resultado.",
    deliverables: ["Assistentes inteligentes", "Agentes de IA com ferramentas e APIs", "RAG sobre documentos e bases", "Automação de processos", "Integração entre sistemas", "Modelos preditivos e análise de dados, quando adequados"],
    signs: ["Tarefas repetitivas ocupam a equipe", "Sistemas exigem copiar e colar", "Há uma base de conhecimento que poderia ser consultada"],
    pricing: pricing.custom,
    notice: "Demonstramos competência em IA por produtos e estudos identificados com o estágio real. Ainda não apresentamos uma implantação comercial de IA em produção como case.",
    cta: "Solicitar diagnóstico de IA",
    faq: [
      { q: "IA serve para qualquer processo?", a: "Não. Muitas vezes uma automação simples resolve melhor. Dizemos quando IA não é necessária." },
      { q: "A IA pode errar?", a: "Sim. Por isso projetamos validações, limites e revisão humana para decisões sensíveis." },
      { q: "Vocês já têm casos em produção?", a: "Temos o EconomIA (produto publicado) e um estudo experimental. O estágio de cada projeto está indicado na página de projetos." },
    ],
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}

export const problems = [
  ["Vender", "Sua empresa depende do Instagram ou WhatsApp para transformar interesse em pedido.", "web"],
  ["Operar", "A equipe copia informações entre planilhas, mensagens e sistemas isolados.", "systems"],
  ["Decidir", "Os indicadores chegam tarde, incompletos ou exigem consolidação manual.", "intelligence"],
  ["Automatizar", "Tarefas repetitivas consomem quem deveria estar atendendo, analisando ou decidindo.", "ai"],
] as const;

export const processSteps = [
  ["Descoberta", "Entendemos processo, usuário, restrições e objetivo."],
  ["Planejamento", "Definimos recorte, prioridade, riscos e critérios de sucesso."],
  ["Design", "Desenhamos o fluxo e a interface antes de construir."],
  ["Desenvolvimento", "Entregamos em incrementos testáveis."],
  ["Entrega", "Publicamos, documentamos e preparamos a operação."],
  ["Evolução", "Acompanhamos o uso e priorizamos o próximo ganho."],
] as const;

export const differentials = [
  ["Engenharia de ponta a ponta", "Do front-end ao banco de dados, dados e integrações, com a mesma equipe."],
  ["Transparência sobre estágio", "Cada projeto indica se é produção, piloto, interno, conceito ou experimento."],
  ["Evolução por etapas", "Começamos no ponto de maior retorno e crescemos sem recomeçar."],
  ["Segurança e contexto", "Sem segredos em repositório e cuidado com dados de terceiros."],
] as const;

export const homeFaq: Faq[] = [
  { q: "Quais empresas vocês atendem?", a: "Negócios locais e empresas com operações mais complexas. O recorte da solução muda; o método é o mesmo." },
  { q: "Quanto custa?", a: `Landing pages a partir de ${formatBRL(pricing.landing.from)} e sites institucionais a partir de ${formatBRL(pricing.institutional.from)}. Sistemas, BI e IA são orçados após diagnóstico. ${pricing.note}` },
  { q: "Preciso saber exatamente o que quero?", a: "Não. Conte o problema; o enquadramento da solução faz parte do trabalho." },
  { q: "Como é a primeira conversa?", a: "Entendemos o contexto e dizemos com franqueza se software é o próximo passo certo." },
  { q: "Quais projetos estão em produção?", a: "Cada projeto informa o estágio real. Não tratamos protótipos e estudos como produtos comerciais." },
];

export const serviceOptions = [
  ["", "Ainda não sei / outro"],
  ["web", "Gorod Web — sites e e-commerce"],
  ["systems", "Gorod Systems — sistemas e PDV"],
  ["intelligence", "Gorod Intelligence — BI e dados"],
  ["ai", "Gorod AI & Automation"],
] as const;

export const budgetOptions = ["Prefiro conversar", "Até R$ 3 mil", "R$ 3 mil a R$ 10 mil", "R$ 10 mil a R$ 30 mil", "Acima de R$ 30 mil"];
export const deadlineOptions = ["Sem urgência", "Até 30 dias", "1 a 3 meses", "Mais de 3 meses"];
