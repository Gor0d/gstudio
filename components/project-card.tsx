import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stageLabels, type Project } from "@/content/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return <article className={`project-card ${large ? "project-card-large" : ""}`}>
    <Link href={`/projetos/${project.slug}`} className="project-card-visual" aria-label={`Ver case ${project.title}`}><ProjectVisual project={project} /></Link>
    <div className="project-card-copy"><div className="project-card-meta"><span>{stageLabels[project.stage]}</span><span>{project.categories.join(" · ")}</span></div><h3><Link href={`/projetos/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><Link href={`/projetos/${project.slug}`} className="text-link">Ver case <ArrowUpRight size={16} /></Link></div>
  </article>;
}
