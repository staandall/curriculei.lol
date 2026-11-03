# Arquitetura (proposta)

```text
src/
  routes/            páginas e rotas de servidor (api/public/* para webhooks)
  domains/
    resume/          perfil, currículo, modelos, ATS, vagas, candidaturas
    writing/         Bewrite: ações de escrita
    canvas/          quadro visual
    billing/         créditos (ledger), planos, Sync Pay
    ai/              prompts, chamadas ao AI Gateway, avaliação
  components/ui/     componentes de interface
docs/  .agents/skills/
```

- Contratos: `createServerFn` com validação (zod) no servidor.
- Documentos: upload privado por usuário, validação MIME/tamanho, parsing assíncrono.
- Créditos: ledger append-only; débito idempotente por operação; estorno automático em falha.
- Pagamentos: webhook assinado e idempotente.
