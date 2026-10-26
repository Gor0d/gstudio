import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";
import "./case-gallery.css";
import "./commercial.css";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, centralMessage } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://gorod-studio.vercel.app"),
  title: { default: "Gorod Studio — Tecnologia que transforma processos em resultados", template: "%s — Gorod Studio" },
  description: centralMessage,
  openGraph: { title: "Gorod Studio", description: "Tecnologia que transforma processos em resultados.", type: "website", locale: "pt_BR", url: SITE_URL, siteName: "Gorod Studio" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Gorod Studio", url: SITE_URL, description: centralMessage, sameAs: ["https://github.com/Gor0d"] }} /><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader />{children}<SiteFooter /><WhatsAppButton /></body></html>;
}
