import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gorod-studio.emersongsguimaraes.chatgpt.site"),
  title: { default: "Gorod Studio — Software para operações que precisam avançar", template: "%s — Gorod Studio" },
  description: "Estratégia, design e engenharia para transformar processos manuais, dados dispersos e oportunidades digitais em software sob medida.",
  openGraph: { title: "Gorod Studio", description: "Do site ao sistema que faz sua operação avançar.", type: "website", locale: "pt_BR" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
