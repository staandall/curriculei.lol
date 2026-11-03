# curriculei.lol

Um espaço de trabalho para construir currículos melhores, preparar candidaturas e escrever com clareza.

- **Carreira** — importar PDF/DOCX ou criar do zero, editor com preview, modelos originais, análise ATS explicada, nota, adaptação à vaga, candidaturas.
- **Bewrite (escrita)** — corrigir, reescrever, traduzir e ajustar tom dentro de qualquer campo, sem sair do fluxo.
- **Quadro visual** — canvas estilo Excalidraw para planejar a busca de emprego (fluxos, mapas mentais, notas).

> Fase atual: **setup e documentação**. Nada de telas de produção até o plano de desenvolvimento ser aprovado.

## Stack (no Lovable)
| Camada | Escolha |
| --- | --- |
| Web + SSR | TanStack Start (React 19, Vite 7) |
| Servidor | Server functions do TanStack Start (substitui Elysia + Eden Treaty) |
| Estilo | Tailwind CSS v4 |
| Pacotes | Bun |
| Estrutura | App único com domínios em `src/domains/*` (substitui Turborepo) |
| Banco, login, arquivos | Lovable Cloud |
| IA | Lovable AI Gateway |
| Pagamentos | Sync Pay (a validar) |

Motivos em `docs/decisions/`.

## Skills (usadas automaticamente pelo agente)
| Skill | Quando |
| --- | --- |
| `revenue-centric-design` | landing, preço, créditos, onboarding, conversão |
| `emil-design-eng` | animação, feedback, toasts, acabamento, performance |
| `grill-me` | antes do plano e em decisões grandes/ambíguas |
| `rea-audit` | estudar produtos de referência |

## Documentação
- `docs/product/` — visão, domínios, modelo de negócio
- `docs/research/` — auditorias das referências
- `docs/architecture/` — estrutura e fluxo de dados
- `docs/decisions/` — ADRs
- `docs/operations/` — segurança, LGPD, logs
- `docs/open-questions.md` — decisões em aberto
- `roadmap.md` — checklist da fase

## Fora de escopo agora
Telas, banco, credenciais, pagamentos, scraping autenticado, cópia de marca/código/textos de terceiros.
