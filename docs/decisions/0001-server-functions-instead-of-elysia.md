# ADR 0001 — Server functions no lugar de Elysia + Eden Treaty
Status: aceito (03/11/2026)

Contexto: pedido original era Elysia com Eden Treaty. O Lovable roda TanStack Start em edge workers.
Decisão: usar `createServerFn` (tipagem ponta a ponta) e rotas de servidor para webhooks.
Consequência: mesma segurança de tipos, sem servidor separado. Migrar para Elysia fora do Lovable continua possível porque a lógica fica em `src/domains/*`.
