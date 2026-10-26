import type { Faq } from "@/content/site";
import { JsonLd } from "./json-ld";

export function FaqList({ items }: { items: Faq[] }) {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <div className="faq-list">{items.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
  </>;
}
