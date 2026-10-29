import type { Metadata } from "next";
import { FaqList } from "@/components/faq";
import { GorodExperience } from "@/components/scenes/gorod-experience";
import { ProjectGallery } from "@/components/scenes/project-gallery";
import { LiveBriefing } from "@/components/live-briefing";
import { SocialProof } from "@/components/social-proof";
import { SITE_URL, homeFaq } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: SITE_URL } };
export default function Home() {
  return <main id="conteudo" className="studio-home concept-home">
    <GorodExperience />
    <ProjectGallery />
    <SocialProof />
    <section className="concept-faq shell" aria-labelledby="concept-faq-title"><header><p className="mono">SEM RUÍDO</p><h2 id="concept-faq-title">Antes do<br />primeiro rascunho.</h2><p>As perguntas que ajudam a começar.</p></header><FaqList items={homeFaq} /></section>
    <LiveBriefing />
  </main>;
}
