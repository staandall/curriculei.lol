# ADR 0002 — App único no lugar de Turborepo
Status: aceito (03/11/2026)

Contexto: Lovable publica um app por projeto.
Decisão: um app com domínios em `src/domains/*`, sem dependências cruzadas fora de interfaces públicas de cada domínio.
Consequência: extrair para `packages/*` depois é mecânico.
