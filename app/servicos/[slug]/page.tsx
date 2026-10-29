import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";
import { SITE_URL, divisions, getDivision } from "@/content/site";

const related: Record<string, string[]> = {
  web: ["economia"],
  systems: ["pdv-offline", "ponto-digital-pro"],
  intelligence: ["readmission-ml", "honormed"],
  ai: ["economia", "readmission-ml"],
};

export function generateStaticParams() { return divisions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const d = getDivision(slug);
  if (!d) return {};
  return { title: d.name, description: d.short, alternates: { canonical: `${SITE_URL}/servicos/${d.slug}` }, openGraph: { title: `${d.name} — Gorod Studio`, description: d.short, locale: "pt_BR" } };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const d = getDivision(slug);
  if (!d) notFound();
  const cases = projects.filter((p) => related[d.slug].includes(p.slug));
  return <main id="conteudo">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: d.name, description: d.short, provider: { "@type": "Organization", name: "Gorod Studio", url: SITE_URL }, areaServed: "BR" }} />
    <section className="page-hero shell"><Link href="/servicos" className="back-link"><ArrowLeft size={15} /> Todas as soluções</Link><span className="eyebrow">{d.name}</span><h1>{d.problem}</h1><p>{d.intro}</p><div className="button-row"><Link href={`/contato?servico=${d.slug}`} className="button">{d.cta} <ArrowUpRight size={17} /></Link></div></section>
    <section className="shell division-body">
      <div><small>QUANDO FAZ SENTIDO</small><ul className="check-list">{d.signs.map((s) => <li key={s}><Check size={15} aria-hidden="true" />{s}</li>)}</ul></div>
      <div><small>ENTREGÁVEIS EXEMPLIFICATIVOS</small><div className="output-tags">{d.deliverables.map((o) => <span key={o}>{o}</span>)}</div></div>
      <div><small>INVESTIMENTO</small><p>{d.pricing}</p>{d.notice && <p className="notice"><Info size={16} aria-hidden="true" /> {d.notice}</p>}</div>
    </section>
    <section className="shell division-cases"><small>PROJETOS RELACIONADOS</small><div className="featured-pair">{cases.map((p) => <ProjectCard key={p.slug} project={p} />)}{cases.length === 1 && <article className="surface-card more-projects"><span className="eyebrow">Continue explorando</span><h3>Outros desafios.<br />A mesma disciplina.</h3><p>Conheça sistemas, produtos e estudos de outras especialidades.</p><Link href="/projetos" className="button button-ghost">Ver todos os projetos <ArrowUpRight size={18} /></Link></article>}</div></section>
    <section className="faq shell"><h2>Perguntas frequentes</h2><FaqList items={d.faq} /></section>
    <section className="final-cta shell"><h2>Vamos entender o seu caso?</h2><p>Conte o contexto. Respondemos com os próximos passos.</p><Link href={`/contato?servico=${d.slug}`} className="button">{d.cta} <ArrowUpRight size={18} /></Link></section>
  </main>;
}
