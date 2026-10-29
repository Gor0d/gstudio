import { projects, stageLabels } from "@/content/projects";
import { divisions, processSteps } from "@/content/site";

export type PanelPhase = "sketch" | "wireframe" | "build" | "evolve";
export type PanelMode = "web" | "systems" | "intelligence" | "ai";
export const storyStages: { phase: PanelPhase; title: string; detail: string; note: string }[] = [
  { phase: "sketch", title: "Estratégia", detail: "Entender o trabalho antes de desenhar a tela.", note: "Processo, pessoas e o problema certo." },
  { phase: "wireframe", title: "Design", detail: "Dar forma ao fluxo. Testar antes de construir.", note: "Hierarquia, interação e clareza." },
  { phase: "build", title: "Desenvolvimento", detail: "Conectar interface, regras e dados.", note: "Software em incrementos verificáveis." },
  { phase: "evolve", title: "Evolução", detail: "Aprender com o uso e melhorar o próximo passo.", note: "Medir, ajustar e continuar." },
];
export const panelCounts = [projects.length, divisions.length, processSteps.length];
export const panelRows = ["economia", "honormed", "ponto-digital-pro"].map(slug => projects.find(project => project.slug === slug)!).map(project => ({ name: project.title, stage: stageLabels[project.stage], kind: project.categories[0] }));
export const chartData = ["Sistemas", "Dados", "IA", "Web"].map(category => ({ label: category, count: projects.filter(project => project.categories.includes(category)).length }));
export const panelReply = `O portfólio reúne ${projects.length} projetos em ${divisions.length} especialidades. Sistemas, dados e IA se conectam a partir de um processo claro. O próximo passo é entender a sua operação.`;
