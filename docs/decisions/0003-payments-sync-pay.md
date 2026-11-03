# ADR 0003 — Pagamentos com Sync Pay
Status: proposto

Pendências: documentação oficial da API, Pix/cartão, assinatura de webhook, reembolso, chargeback, ambiente de testes.
Plano: rota `api/public/syncpay-webhook` com verificação de assinatura e idempotência; créditos lançados no ledger só após confirmação.
Alternativa nativa se Sync Pay não atender: Stripe ou Paddle.
