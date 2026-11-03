# curriculei.lol — Fase de setup e documentação (sem programar)

Objetivo: deixar o projeto pronto para o planejamento de desenvolvimento, com documentação organizada, skills registradas e tudo espelhado no Notion. Nenhuma tela, componente de produção, banco ou pagamento será criado nesta fase.

## Ajuste de stack (importante)

O ambiente Lovable roda **TanStack Start + Vite em edge (Cloudflare Workers)**, num único app. Por isso:

| Pedido | Como fica no Lovable |
| --- | --- |
| TanStack com SSR | Mantido (TanStack Start, já instalado) |
| Tailwind | Mantido (Tailwind v4) |
| Bun | Mantido como gerenciador de pacotes |
| Elysia + Eden Treaty | Substituído por server functions do TanStack Start (`createServerFn`), que já dão tipagem ponta a ponta cliente-servidor. Registrado como ADR. |
| Turborepo monorepo | Não suportado aqui. Usaremos um app único com domínios separados por pasta (`src/domains/resume`, `writing`, `canvas`, `billing`, `ai`). Registrado como ADR, com caminho de migração para monorepo fora do Lovable se desejado. |
| Banco, auth, arquivos | Lovable Cloud (na fase de implementação) |
| IA | Lovable AI Gateway (na fase de implementação) |
| Sync Pay | Pendente: verificar API/webhooks; integração via rota de servidor com webhook assinado. Alternativa nativa: Stripe/Paddle. |

## O que será feito

1. **Pesquisa (REA, só páginas públicas)**: buscar e salvar o conteúdo público de curricu.lol, bewrite.app, MakeMyCV e ExcalidrawZ (App Store) e dos repositórios das skills. Sem login, sem contornar bloqueios, sem copiar textos/marca. Resultado vira auditoria neutra com "observado vs. inferido".
2. **Skills do projeto** (em `.agents/skills/`, ativadas automaticamente pelo agente quando o tema surgir):
   - `revenue-centric-design` — resumo próprio das regras + link e atribuição ao repositório original (não copiar os 134 princípios).
   - `emil-design-eng` — regras de motion/design (seção 9.1) + referências às sub-skills (animate, review-animations, animation-performance, apple-design, break-ui, mobile-native, ask-sonner, pick-ui-library).
   - `grill-me` — protocolo de descoberta (seção 9.3).
   - `rea-audit` — protocolo de auditoria de referências (seção 9.4).
   - Observação: `npx skills add` e `bunx rea-agents setup` não serão executados; as skills são escritas a partir do conteúdo público dos repositórios.
3. **Documentação no projeto**:
   - `README.md` — visão, stack real, limites da fase, como as skills são usadas.
   - `AGENTS.md` — regras globais (não inventar fatos profissionais, LGPD, ledger de créditos, webhook idempotente, aprovação humana em candidaturas, motion com reduced-motion, sem UI genérica).
   - `docs/product/` (visão, domínios Carreira/Bewrite/Quadro, modelo de negócio pendente)
   - `docs/research/` (uma auditoria por referência)
   - `docs/architecture/` (estrutura por domínios, contratos, fluxo de dados)
   - `docs/decisions/` (ADRs: stack, sem Elysia, sem Turborepo, pagamentos, IA)
   - `docs/operations/` (segurança, privacidade/LGPD, retenção, logs)
   - `docs/open-questions.md` (as 10 decisões em aberto da seção 8)
   - `roadmap.md` com o checklist da seção 10.
4. **Notion**: conectar o Notion (vai aparecer um cartão para você autorizar) e criar a página "curriculei.lol — documentação central" com subpáginas espelhando `docs/` e as skills.
5. **Próximo passo**: rodar o Grill Me com você (uma pergunta por vez) e então montar o plano de desenvolvimento com milestones, começando por conta, perfil e documentos.

## Fora desta fase

Telas, componentes, banco, credenciais, pagamentos, instalação de dependências de produção, scraping autenticado.

## Pendências que dependem de você

- Autorizar o Notion e indicar em qual página/workspace criar.
- Confirmar se aceita o ajuste de stack acima (sem Elysia/Turborepo dentro do Lovable).
