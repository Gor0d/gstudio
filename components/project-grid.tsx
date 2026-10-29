"use client";
import { useState } from "react";
import { categories, projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function ProjectGrid() {
  const [active, setActive] = useState("Todos");
  const visible = active === "Todos" ? projects : projects.filter((project) => project.categories.includes(active));
  return <><div className="filter-row" role="group" aria-label="Filtrar projetos">{categories.map((category) => <button key={category} className={active === category ? "active" : ""} onClick={() => setActive(category)} aria-pressed={active === category}>{category}</button>)}</div><p className="sr-only" role="status">{visible.length} projetos encontrados.</p><div className="projects-grid">{visible.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></>;
}
