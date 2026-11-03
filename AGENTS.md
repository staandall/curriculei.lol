<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# curriculei.lol — agent rules

Read README.md and docs/ before changing product behavior. Project skills live in .agents/skills and must be applied automatically:
- revenue-centric-design → landing, pricing, credits, onboarding, conversion.
- emil-design-eng → any motion, interaction feedback, toasts, UI polish, perf.
- grill-me → before a development plan or any large/ambiguous decision.
- rea-audit → whenever studying a reference product.

## Architecture
- Single TanStack Start app (no Turborepo) organized by domain folders under src/domains/* — Lovable runs one app on edge workers (see docs/decisions/0002).
- Client-server contracts use createServerFn instead of Elysia + Eden Treaty — same end-to-end typing, native to the runtime (docs/decisions/0001).
- Backend = Lovable Cloud; AI = Lovable AI Gateway — managed, no extra accounts (docs/decisions/0004).
- Payment webhooks go to src/routes/api/public/* with signature verification + idempotency — public routes bypass auth.
- Credits are an append-only ledger, never a mutable balance column — auditability and refunds.

## Product guardrails
- AI never fabricates experiences, results, certifications or skills; suggestions are verifiable and user-approved.
- ATS score is a diagnosis, not a promise; criteria are always explained.
- Batch applications require explicit human review before sending.
- Resumes are personal data (LGPD): minimal collection, per-user isolation, retention/deletion/export, no training use without consent, no resume content in logs.
- No generic AI UI: no meaningless cards, no button spam, no filler copy; every control has a purpose.
- Never copy code, branding, copy or templates from reference products.
