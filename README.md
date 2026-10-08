# Gorod Studio

Site comercial da Gorod Studio — estratégia, design e engenharia para transformar processos e oportunidades de negócio em produtos digitais.

## Produção

https://gorod-studio.vercel.app

## Conteúdo

- apresentação comercial e serviços;
- portfólio com filtros por capacidade;
- páginas individuais para nove projetos;
- proposta conceitual da Casa das Tortas em rota não indexada;
- contato via WhatsApp e e-mail;
- sitemap, robots e metadata para SEO.

Os cases distinguem produtos próprios, projetos internos, concepts e estudos experimentais. Dados sensíveis, credenciais e identidades não autorizadas não devem ser adicionados ao repositório.

## Stack

- Next.js 16 e React 19;
- TypeScript;
- CSS responsivo próprio;
- Vercel para o deploy público;
- compatibilidade adicional com o runtime Vinext/Cloudflare Sites.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run dev:vercel
```

Abra `http://localhost:3000`.

## Verificações

```bash
npm run lint
npm run build:vercel
```

Para o runtime alternativo do Sites:

```bash
npm run dev
npm run build
```

## Estrutura principal

- `app/`: páginas, metadata e estilos;
- `components/`: navegação, cards, galerias e elementos de contato;
- `content/projects.ts`: conteúdo estruturado dos cases;
- `public/images/`: imagens e capturas sanitizadas dos projetos;
- `docs/`: planejamento estratégico mantido fora deste checkout.

## Deploy

O projeto está configurado em `vercel.json`. Com o CLI autenticado:

```bash
vercel deploy --prod
```
