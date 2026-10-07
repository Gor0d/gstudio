import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = { title: "Projetos", description: "Cases e produtos digitais em sistemas, dados, automação, IA e web." };
export default function ProjectsPage() { return <main id="conteudo"><section className="page-hero shell"><span className="eyebrow">Projetos</span><h1>Problemas diferentes.<br/>A mesma disciplina de produto.</h1><p>Uma seleção de produtos próprios, soluções internas, protótipos funcionais e estudos experimentais — cada um identificado com transparência.</p></section><section className="shell project-archive"><ProjectGrid /></section></main>; }
