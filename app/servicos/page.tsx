import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, ChartNoAxesCombined, PanelsTopLeft, Workflow } from "lucide-react";
import { SITE_URL, divisions, formatBRL, pricing } from "@/content/site";

export const metadata: Metadata = {
  title: "Soluções e serviços",
  description: "Gorod Web, Systems, Intelligence e AI & Automation: sites, sistemas, BI e IA para empresas.",
  alternates: { canonical: `${SITE_URL}/servicos` },
};
const icons = { web: PanelsTopLeft, systems: Workflow, intelligence: ChartNoAxesCombined, ai: Bot };

export default function ServicesPage() {
  return <main id="conteudo">
    <section className="page-hero shell"><span className="eyebrow">Soluções</span><h1>A tecnologia certa para o problema certo.</h1><p>Quatro divisões comerciais, do primeiro canal digital à automação da operação.</p></section>
    <section className="services-detail shell">{divisions.map((d, i) => { const Icon = icons[d.slug]; return <article id={d.slug} key={d.slug}>
      <div className="service-detail-title"><span>0{i + 1}</span><Icon /><h2>{d.name}</h2><p>{d.problem}</p></div>
      <div><small>ENTREGÁVEIS EXEMPLIFICATIVOS</small><div className="output-tags">{d.deliverables.map((o) => <span key={o}>{o}</span>)}</div></div>
      <div><small>COMO É ORÇADO</small><p className="svc-price">{d.slug === "web" ? `Landing page a partir de ${formatBRL(pricing.landing.from)}; site institucional a partir de ${formatBRL(pricing.institutional.from)}.` : pricing.custom}</p><Link className="text-link" href={`/servicos/${d.slug}`}>Ver detalhes <ArrowUpRight size={15} /></Link></div>
    </article>; })}</section>
    <section className="final-cta shell"><span className="eyebrow">Comece pelo problema</span><h2>Não sabe qual solução pedir? Ótimo.</h2><p>Conte o que hoje atrasa ou limita sua operação. O enquadramento faz parte do trabalho.</p><Link href="/contato" className="button">Solicitar orçamento <ArrowUpRight size={18} /></Link></section>
  </main>;
}
