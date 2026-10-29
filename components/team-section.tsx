import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { team } from "@/data/team";

export function TeamSection() {
  const published = team.filter(member => member.published && !member.placeholder);
  if (!published.length) return null;
  return <section className="team-section shell studio-section" aria-labelledby="team-title"><div className="studio-section-heading"><div><span className="eyebrow">As pessoas por trás do processo</span><h2 id="team-title">Quem constrói.</h2></div><p>Estratégia, design e engenharia em colaboração.</p></div><div className="team-grid">{published.map(member => <article key={member.id} className="surface-card team-card" data-reveal><Image src={member.image} alt={member.placeholder ? "Imagem de perfil reservada; foto ainda não publicada" : `Foto de ${member.name}`} width={480} height={400} /><div>{member.placeholder && <span className="placeholder-label">Perfil em preparação · placeholder</span>}<h3>{member.name}</h3><p>{member.role}</p>{member.linkedin ? <a className="text-link" href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a> : <span className="team-pending">LinkedIn · a confirmar</span>}</div></article>)}</div></section>;
}
