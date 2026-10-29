import { projects } from "@/content/projects";
import { divisions, processSteps } from "@/content/site";

export function StudioFacts() {
  const facts = [[projects.length, "projetos no portfólio"], [divisions.length, "especialidades conectadas"], [processSteps.length, "etapas de construção"]] as const;
  return <div className="studio-facts shell" aria-label="O estúdio em perspectiva">{facts.map(([value,label]) => <p key={label}><strong><span data-count-to={value} aria-hidden="true">{value}</span><span className="sr-only">{value}</span></strong><span>{label}</span></p>)}</div>;
}
