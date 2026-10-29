import { testimonials } from "@/data/testimonials";

export function SocialProof() {
  const published = testimonials.filter(item => item.published && !item.placeholder);
  if (!published.length) return null;
  return <section className="social-proof shell studio-section" aria-labelledby="proof-title">
    <div className="studio-section-heading" data-reveal><div><span className="eyebrow">Construção com transparência</span><h2 id="proof-title">O valor está na experiência.<br /><span>E nas evidências.</span></h2></div><p>Relatos autorizados de quem participou da construção.</p></div>
    <div className="proof-grid">{published.map(item => <article key={item.id} className="surface-card proof-card" data-reveal>
      {item.placeholder ? <><span className="placeholder-label">Conteúdo em preparação · placeholder</span><p>{item.quote}</p><p className="proof-attribution">{item.author}<br />{item.role}</p></> : <><blockquote>{item.quote}</blockquote><p className="proof-attribution">{item.author}<br />{item.role}</p></>}
    </article>)}</div>
  </section>;
}
