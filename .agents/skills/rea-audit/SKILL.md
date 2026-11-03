---
name: rea-audit
description: Use when inspecting reference sites/apps (curricu.lol, bewrite.app, MakeMyCV, ExcalidrawZ or others) to map observable flows, states and interactions before designing an ORIGINAL implementation for curriculei.lol. Public pages only.
---

# REA — reference audit (after morluto/rea)

Source: https://github.com/morluto/rea (`npx skills add morluto/rea --skill reverse-engineer-anything`; `bunx rea-agents@latest setup` configures CLI/MCP — separate action, review before running).

## Protocol
1. Confirm URL, version, platform, public vs authenticated access.
2. Inspect authorized flows only; never bypass login, paywall, anti-bot.
3. Map journey: entry → action → response → next state → errors → recovery.
4. Record evidence (screenshots/notes) when allowed.
5. Check responsiveness, keyboard, empty/loading/error states, accessibility.
6. Separate OBSERVED behavior from INFERENCE; give a confidence level.
7. Never invent hidden features.
8. Convert findings into neutral requirements + acceptance criteria.
9. Build original components, copy and identity; never copy code, private data, logos, illustrations or protected text.
10. Check terms, license, privacy.

## Audit format
Goal/entry · steps/states · inputs/outputs · validation/failure · evidence/confidence · original implementation opportunity · open questions.

Save audits in docs/research/<target>.md.
