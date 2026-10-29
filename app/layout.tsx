import type { Metadata } from "next";
import localFont from "next/font/local";
import { PerformanceProbe } from "@/components/performance-probe";
import { ViewNavigation } from "@/components/view-navigation";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PremiumInteractions } from "@/components/premium-interactions";
import { MotionPreferences } from "@/components/motion-preferences";
import { SiteHeader } from "@/components/site-header";
import { LivingGrid } from "@/components/living-grid";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";
import "./case-gallery.css";
import "./commercial.css";
import "./studio.css";
import "./studio-refinements.css";
import "./ocean.css";
import "./premium.css";
import "lenis/dist/lenis.css";
import "./premium-motion.css";
import "./concept.css";
import "./signature.css";
const inter = localFont({ src: "../public/fonts/inter-latin-variable.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const display = localFont({ src: "../public/fonts/CabinetGrotesk-Variable.woff2", variable: "--font-display", display: "swap", weight: "100 900" });
const mono = localFont({ src: "../public/fonts/JetBrainsMono-Regular.woff2", variable: "--font-mono", display: "swap", weight: "400", preload: false });
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
  return <html lang="pt-BR" className={[inter.variable,display.variable,mono.variable].join(" ")}><body><PerformanceProbe /><MotionProvider><LivingGrid /><SmoothScroll /><ViewNavigation /><MotionPreferences /><PremiumInteractions /><JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Gorod Studio", url: SITE_URL, description: centralMessage, sameAs: ["https://github.com/Gor0d"] }} /><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader />{children}<SiteFooter /><WhatsAppButton /></MotionProvider></body></html>;
}
