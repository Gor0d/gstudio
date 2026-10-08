import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://gorod-studio.vercel.app"; return ["","/servicos","/projetos","/sobre","/contato",...projects.map(p=>`/projetos/${p.slug}`)].map(url=>({url:`${base}${url}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:url===""?1:0.7})); }
