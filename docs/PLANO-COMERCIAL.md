# Plano comercial — Gorod Studio

Branch: `feat/evolucao-comercial`. Stack preservada: Next.js 16, React 19, TypeScript, CSS próprio. Nenhuma dependência nova.

## 1. Diagnóstico (estado inicial)

| Área | Achado |
|---|---|
| Posicionamento | Hero genérico ("Do site ao sistema…"), sem proposta de valor explícita nem lista clara de divisões. |
| Hero | Card com "12 fluxos conectados" — número fictício, sem base. Removido. |
| Serviços | Uma página com 4 blocos (Presença, Sistemas, Dados, Automação), sem entregáveis detalhados, FAQ, CTA contextual ou páginas próprias (SEO fraco). |
| Contato | Formulário só prepara mensagem de WhatsApp (funcional e honesto). Sem validação própria, sem tipo de serviço, sem pré-preenchimento por origem, `rel="noreferrer"` ok. |
| Preços | Inexistentes. |
| Portfólio | 8 projetos; status textuais livres ("Produto SaaS" etc.) sem taxonomia; textos de "resultado" afirmam efeitos ("passou a permitir…") sem evidência mensurável; HonorMed ausente. |
| SEO | Sem canonical, OG sem imagem, sem JSON-LD, sitemap com `lastModified` dinâmico, sem páginas de serviço. |
| Acessibilidade | Foco visível e skip link OK; formulário sem `aria-invalid`/mensagens de erro; filtro de projetos ok (`aria-pressed`); menu mobile em `<details>` sem fechar ao navegar. |
| Performance | Sem imagens remotas pesadas; `next/image` já usado. CSS global único (~32 KB). |
| Infra | Duplo runtime (Vercel + Vinext/Cloudflare). `examples/`, `db/` e `lib/connector*` não pertencem ao site e foram deixados intactos. |
| Repositórios externos | HonorMed: piloto publicado, dados fictícios, sem cobrança, extensão não publicada. opme-vision: protótipo inicial, sem métricas. `pri-s-sweet-treats`: 404 (privado/inexistente) — não citado. Demais repositórios não auditados nesta rodada. |

## 2. Alterações propostas e implementadas

1. `content/site.ts`: fonte única de preços, divisões, problemas, processo, diferenciais e FAQ.
2. Home reestruturada nas 8 seções pedidas, com CTAs: Solicitar orçamento, Conhecer soluções, Ver projetos, WhatsApp.
3. `/servicos` (visão geral) + `/servicos/[slug]` para as 4 divisões: web, systems, intelligence, ai.
4. `/contato`: validação, campos novos, `?servico=` pré-preenchido, WhatsApp preservado como único canal de envio e mensagem honesta (nenhum lead é armazenado).
5. Portfólio: campo `stage` tipado (produção · MVP/piloto · interno · conceito · experimental); textos de resultado rebaixados a "o que o projeto demonstra"; HonorMed adicionado como piloto.
6. SEO: canonical por página, OG, JSON-LD (Organization, Service, FAQPage), sitemap atualizado.
7. `docs/ROADMAP-IA.md`: proposta "Gorod AI Sales", sem anunciar como implantado.

## 3. Prioridades

P0 conteúdo honesto e posicionamento · P0 contato/CTAs · P1 páginas de divisão · P1 portfólio · P2 SEO avançado · P2 imagens OG dedicadas.

## 4. Critérios de aceite

- `npm run lint` e `npm run build:vercel` sem erros.
- Nenhum número de clientes, economia ou produtividade inventado.
- Nenhuma menção a NFC-e, homologação fiscal ou IA em produção.
- Preços aparecem apenas via `content/site.ts`.
- Formulário: campos obrigatórios validados com mensagens associadas (`aria-describedby`), WhatsApp abre só após validação.
- Todas as rotas novas no sitemap e navegáveis por teclado.

## 5. Pendências (fora do escopo desta entrega)

- Autorização formal do dono do HonorMed para divulgação e screenshots autorizadas.
- Auditoria dos demais repositórios (vetwave, FisioHUB, ponto-digital-pro, hospital-readmission-ml, g-print-hero-showcase) contra o texto atual dos cases.
- Armazenamento de leads (exige decisão de custo, antispam e LGPD) e política de privacidade.
- Imagem OG dedicada; domínio próprio.

## 6. Validação executada

- `npm run lint`: sem erros.
- `npm run build:vercel`: sucesso; 24 páginas estáticas (inclui `/servicos/{web,systems,intelligence,ai}` e `/projetos/honormed`).
- Smoke test com `next start`: todas as rotas retornam 200; slug inválido retorna 404; canonical presente na home; sitemap e robots ok.
- **Não executado:** teste em navegador (pré-preenchimento `?servico=`, validação do formulário, responsividade visual). Verificar manualmente antes de publicar.

## 7. Classificação de estágio dos projetos (a confirmar)

`stage` foi atribuído de forma conservadora: só o EconomIA consta como "produto publicado". FisioHUB, VetWave, Ponto Digital Pro, MEI SaaS, PDV offline e VisionLOL estão como "MVP ou piloto" até auditoria do repositório confirmar produção.
