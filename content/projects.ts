export type Stage = "estudo" | "prototipo" | "piloto" | "producao";

export const stageLabels: Record<Stage, string> = {
  estudo: "Estudo",
  prototipo: "Protótipo",
  piloto: "Piloto",
  producao: "Em produção",
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  stage: Stage;
  evidence?: string;
  categories: string[];
  capabilities: string[];
  stack: string[];
  accent: string;
  visual: "dashboard" | "report" | "workflow" | "modules" | "finance" | "image";
  image?: string;
  imageAlt?: string;
  screenshots?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  featured?: boolean;
  caution?: string;
};

export const projects: Project[] = [
  {
    slug: "fisiohub",
    stage: "piloto",
    title: "FisioHUB",
    eyebrow: "Uso interno · Saúde e operação",
    summary: "Sistema web multiunidade para indicadores assistenciais de fisioterapia, no lugar da coleta manual em planilhas.",
    problem: "Os indicadores assistenciais eram coletados manualmente em planilhas, sem padronização de equipes e setores entre as unidades.",
    solution: "Um PWA multiunidade com cálculo de escalas clínicas, dashboards por unidade, visão consolidada, metas, relatórios, auditoria e isolamento de dados por linha.",
    result: "Demonstra a arquitetura multiunidade e o fluxo de coleta, cálculo e visualização de indicadores. Sem métricas de uso divulgadas.",
    categories: ["Sistemas", "Dados"],
    capabilities: ["Multiunidade", "Escalas clínicas", "Auditoria"],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Recharts", "PWA"],
    caution: "Ferramenta de uso interno, com acesso por convite. Nome da organização, unidades e dados foram omitidos.",
    accent: "#b8d66d",
    visual: "dashboard",
    featured: true,
  },
  {
    slug: "honormed",
    stage: "piloto",
    title: "HonorMed",
    eyebrow: "Saúde · Controle de honorários",
    summary: "Controle de produção e recebimento de honorários para médicos, com módulo de laudos.",
    problem: "Médicos registram atendimentos e laudos antes de saber o valor do honorário e precisam acompanhar o que foi produzido, o que é esperado e o que foi recebido, por local e convênio.",
    solution: "Um piloto web (PWA) com registro por quantidade, saldos calculados em SQL, isolamento por médico, módulo de laudos por modalidade e instituição e importação de CSV/XLSX com limites.",
    result: "Demonstra um fluxo de controle financeiro individual com isolamento de dados por usuário. Sem clientes pagantes e sem métricas de uso divulgadas.",
    categories: ["Sistemas", "Dados"],
    capabilities: ["PWA", "Row-level security", "Importação CSV/XLSX"],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Cloudflare Workers", "Vitest", "Playwright"],
    accent: "#8fd0a8",
    visual: "finance",
    featured: false,
    evidence: "Baseado no README público do repositório. Os dados do piloto são fictícios.",
    caution: "Piloto sem cobrança ativa. Não se conecta a sistemas hospitalares. Divulgação sujeita à confirmação da autorização do responsável; sem imagens publicadas.",
  },
  {
    slug: "vetwave",
    stage: "piloto",
    title: "VetWave",
    eyebrow: "Produto vertical · Laudos",
    summary: "Emissão de laudos veterinários com templates, imagens, assinatura e exportação profissional.",
    problem: "Criar laudos repetitivos sem padronização consome tempo e torna difícil manter histórico, imagens e identidade documental.",
    solution: "Uma plataforma para cadastrar animais, compor laudos a partir de templates editáveis, anexar imagens, assinar e gerar PDFs.",
    result: "Demonstra o fluxo de elaboração e entrega de laudos em um produto vertical, com dados isolados por usuário. Sem métricas de uso divulgadas.",
    categories: ["Sistemas"],
    capabilities: ["Documentos", "Templates", "Storage"],
    stack: ["React 19", "TanStack", "TypeScript", "Tiptap", "Supabase", "Cloudflare Workers"],
    accent: "#7dd3c7",
    visual: "report",
    featured: true,
  },
  {
    slug: "ponto-digital-pro",
    stage: "piloto",
    title: "Ponto Digital Pro",
    eyebrow: "Fluxo documental · Auditoria",
    summary: "Da folha enviada pelo gestor à assinatura e conferência do DP, com rastreabilidade por etapa.",
    problem: "Documentos percorriam diferentes perfis e canais, criando retrabalho, pouca visibilidade de status e dificuldade de auditoria.",
    solution: "Um fluxo por perfis para upload, separação de PDF, assinatura por OTP, aprovação em lote, notificações e trilha de auditoria.",
    result: "Demonstra um fluxo por perfis com estados e responsabilidades definidos. Sem métricas de uso divulgadas.",
    categories: ["Sistemas", "Automação"],
    capabilities: ["PDF", "Assinatura", "Auditoria"],
    stack: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL", "Docker"],
    accent: "#e6a96b",
    visual: "workflow",
    featured: true,
    caution: "A integração de arquivamento externo permanece simulada e não é apresentada como produção.",
  },
  {
    slug: "plataforma-operacoes",
    stage: "prototipo",
    title: "Plataforma de operações",
    eyebrow: "Projeto interno · Identidade preservada",
    summary: "Um portal modular que conecta contratos, projetos, versões, calendários e demandas internas.",
    problem: "Ferramentas administrativas isoladas espalhavam o trabalho entre planilhas, atalhos e aplicações sem uma porta de entrada comum.",
    solution: "Um ecossistema de módulos independentes, reunidos por um portal central e operados em containers com dados persistentes.",
    result: "A arquitetura demonstra como diferentes rotinas podem compartilhar uma experiência de acesso sem perder independência operacional.",
    categories: ["Sistemas", "Automação"],
    capabilities: ["Portal", "Módulos", "Containers"],
    stack: ["Node.js", "Express", "SQLite", "Docker Compose", "Python", "FastAPI"],
    accent: "#9bb5ff",
    visual: "modules",
    featured: true,
    caution: "Marcas, infraestrutura e dados operacionais foram omitidos para preservar confidencialidade.",
  },
  {
    slug: "mei-saas",
    stage: "piloto",
    title: "MEI SaaS",
    eyebrow: "SaaS · Pequenos negócios",
    summary: "Horas, clientes, prestadores, faturas e indicadores reunidos para quem presta serviços.",
    problem: "Profissionais independentes controlam tempo, faturamento e notas em arquivos separados, sem visão consolidada do negócio.",
    solution: "Um SaaS multi-tenant com registro de horas, clientes, prestadores, faturas, relatórios, limites e planos de assinatura.",
    result: "Demonstra um produto multiusuário com planos de assinatura e integrações financeiras em estruturação. Sem métricas de uso divulgadas.",
    categories: ["Sistemas", "Dados"],
    capabilities: ["SaaS", "Faturamento", "Relatórios"],
    stack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Redis", "Stripe", "Asaas"],
    accent: "#f3cf70",
    visual: "finance",
    featured: true,
  },
  {
    slug: "economia",
    stage: "producao",
    title: "EconomIA",
    eyebrow: "Produto próprio · IA",
    summary: "Comparação de custos de modelos de IA para pessoas, APIs e assistentes.",
    problem: "Preços de modelos ficam distribuídos entre provedores e usam unidades diferentes, dificultando comparações práticas.",
    solution: "Uma calculadora pública com cenários de tokens, catálogo versionado, API REST, contrato OpenAPI e servidor MCP.",
    result: "O mesmo catálogo pode ser consultado na interface ou reutilizado por integrações e assistentes, com fontes e atualizações controladas.",
    categories: ["IA", "Automação", "Web"],
    capabilities: ["API", "MCP", "Dados públicos"],
    stack: ["JavaScript", "Serverless", "OpenAPI", "MCP", "Vercel"],
    accent: "#62b8ff",
    visual: "image",
    image: "/images/projects/economia.png",
    imageAlt: "Capa do produto EconomIA, calculadora de custos de modelos de inteligência artificial",
    screenshots: [
      {
        src: "/images/projects/screenshots/economia-live.png",
        alt: "Tela real da calculadora EconomIA exibindo comparação de custos entre modelos",
        caption: "Calculadora publicada · comparação de provedores e estimativa de consumo",
      },
    ],
    evidence: "O repositório indica que limites de uso mais robustos e páginas de privacidade e termos estão pendentes antes de divulgação ampla.",
    featured: true,
  },
  {
    slug: "pdv-offline",
    stage: "piloto",
    title: "PDV offline para varejo",
    eyebrow: "Desktop · Operação local",
    summary: "Venda por código de barras, estoque e backup funcionando mesmo sem internet.",
    problem: "Operações locais precisam registrar vendas e movimentar estoque mesmo quando a conectividade não é confiável.",
    solution: "Uma aplicação desktop com banco local, leitura de código de barras, baixa atômica de estoque, cancelamento com estorno, relatórios, importação do sistema anterior e backup.",
    result: "A arquitetura prioriza continuidade operacional e consistência transacional no ponto de venda.",
    categories: ["Sistemas"],
    capabilities: ["Offline-first", "Estoque", "PDV"],
    stack: ["Electron", "SQLite", "JavaScript"],
    caution: "Recibo não fiscal: não emite NFC-e nem substitui documento fiscal. Formas de pagamento, desconto e fechamento de caixa estão em fases posteriores.",
    accent: "#f08c68",
    visual: "finance",
  },
  {
    slug: "visionlol",
    stage: "piloto",
    title: "VisionLOL",
    eyebrow: "Dados · Integrações",
    summary: "Monitoramento competitivo com dados de partidas, scrims e telemetria local.",
    problem: "Times competitivos precisam reunir desempenho individual, partidas e observação ao vivo em uma leitura única.",
    solution: "Uma plataforma com roster, múltiplas contas, radar por função, histórico, replays e um agente distribuído para partidas personalizadas.",
    result: "Demonstra integração de APIs externas e telemetria local em um produto especializado de análise.",
    categories: ["Dados", "Sistemas"],
    capabilities: ["APIs", "Telemetria", "Analytics"],
    stack: ["Python", "Flask", "OpenCV", "Riot APIs"],
    accent: "#56d47b",
    visual: "image",
    image: "/images/projects/visionlol.png",
    imageAlt: "Dashboard do VisionLOL com histórico de partidas e mapa de calor",
    screenshots: [
      {
        src: "/images/projects/visionlol.png",
        alt: "Dashboard do VisionLOL com histórico de partidas e mapa de calor",
        caption: "Produto desktop · leitura consolidada de partidas e telemetria",
      },
      {
        src: "/images/projects/screenshots/visionlol-live.png",
        alt: "Página pública do VisionLOL apresentando a plataforma de análise",
        caption: "Página pública do projeto · visão dos módulos e proposta técnica",
      },
    ],
    caution: "Produto independente, sem afiliação oficial com a Riot Games.",
  },
  {
    slug: "readmission-ml",
    stage: "estudo",
    title: "Risco de readmissão",
    eyebrow: "Machine Learning · Explicabilidade",
    summary: "Pipeline explicável para explorar risco de readmissão hospitalar em 30 dias.",
    problem: "A priorização de acompanhamento pós-alta exige explorar muitos sinais clínicos e operacionais de forma consistente.",
    solution: "Um estudo com ensemble de rede neural e XGBoost, explicações SHAP, API FastAPI, dashboard Streamlit e documentação de limitações.",
    result: "Demonstra um pipeline reproduzível sobre dados públicos e sintéticos, sem pretensão de uso clínico validado.",
    categories: ["IA", "Dados"],
    capabilities: ["ML", "Explicabilidade", "API"],
    stack: ["TensorFlow", "XGBoost", "SHAP", "FastAPI", "Streamlit", "Docker"],
    accent: "#f4df3f",
    evidence: "O limiar de decisão foi calibrado no próprio conjunto de teste, então as métricas (ROC-AUC de cerca de 0,69) podem ser otimistas e não indicam validade clínica.",
    visual: "image",
    image: "/images/projects/readmission-ml.png",
    imageAlt: "Tela experimental exibindo estimativa de risco de readmissão",
    screenshots: [
      {
        src: "/images/projects/readmission-ml.png",
        alt: "Tela experimental exibindo uma estimativa de risco de readmissão",
        caption: "Interface experimental · resultado acompanhado de fatores explicativos",
      },
      {
        src: "/images/projects/screenshots/readmission-performance.png",
        alt: "Painel experimental com métricas e curvas de desempenho do modelo",
        caption: "Avaliação documentada · métricas do conjunto experimental",
      },
      {
        src: "/images/projects/screenshots/readmission-architecture.png",
        alt: "Diagrama da arquitetura do ensemble de modelos DNN e XGBoost",
        caption: "Arquitetura do estudo · ensemble de rede neural e XGBoost",
      },
    ],
    caution: "Estudo com dados públicos/sintéticos. Não é dispositivo médico nem sistema validado para decisão clínica.",
  },
];

export const categories = ["Todos", "Web", "Sistemas", "Dados", "IA", "Automação"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
