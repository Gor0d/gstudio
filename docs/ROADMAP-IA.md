# Roadmap de IA — "Gorod AI Sales" (nome provisório)

**Status: proposta. Não existe implantação em produção e o site não deve afirmar o contrário.**

## Objetivo
Assistente para atendimento comercial de pequenas e médias empresas: qualificar leads, consultar catálogo e gerar pré-orçamentos para revisão humana.

## Escopo por fases
1. **Piloto interno (Gorod):** atender os leads do próprio site, com handoff para WhatsApp.
2. **Catálogo + pré-orçamento:** RAG sobre catálogo/tabela de preços do cliente; pré-orçamento sempre marcado como estimativa e aprovado por humano.
3. **Integração:** CRM/planilha/ERP do cliente via API.

## Requisitos antes de qualquer divulgação como case
- Cliente real e autorização escrita para divulgação.
- Métricas medidas (tempo de resposta, taxa de qualificação, conversão) com linha de base.
- Avaliação de qualidade (conjunto de conversas de teste, taxa de alucinação).
- LGPD: base legal, retenção, exclusão, aviso de uso de IA ao usuário.
- Segurança: sem segredos no repositório, limites de uso e proteção contra prompt injection; humano no circuito para valores.

## Comunicação no site (permitida hoje)
"Em desenvolvimento / roadmap". Competência em IA é demonstrada por EconomIA (produto publicado) e pelo estudo de readmissão (experimental).

## Custos a definir
Modelo de linguagem (por token), vetor/armazenamento, hospedagem, canal WhatsApp Business API. Nenhum serviço pago será contratado sem autorização.
