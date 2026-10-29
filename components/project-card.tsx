import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stageLabels, type Project } from "@/content/projects";
import { PremiumCard } from "./premium-card";
import { ProjectVisual } from "./project-visual";
export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return <PremiumCard as="article" className={"surface-card project-card " + (large ? "project-card-large" : "")}>
    <div className="project-card-visual"><ProjectVisual project={project} /></div>
    <div className="project-card-copy"><div className="project-card-meta"><span className="stage-badge">{stageLabels[project.stage]}</span><span>{project.categories.join(" · ")}</span></div><h3><Link className="project-card-link" href={"/projetos/" + project.slug}>{project.title}</Link></h3><p>{project.summary}</p><span className="project-card-action" aria-hidden="true">Ver case <ArrowUpRight size={16} /></span></div>
  </PremiumCard>;
}
