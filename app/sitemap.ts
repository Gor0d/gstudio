import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { divisions } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://gorod-studio.vercel.app"; return ["","/servicos",...divisions.map(d=>`/servicos/${d.slug}`),"/projetos","/sobre","/contato",...projects.map(p=>`/projetos/${p.slug}`)].map(url=>({url:`${base}${url}`,changeFrequency:"monthly" as const,priority:url===""?1:0.7})); }
