---
name: emil-design-eng
description: Use when designing, reviewing or auditing animation, motion, interaction feedback, toasts (Sonner), mobile-native feel, Apple-style UI polish or animation performance in curriculei.lol. Covers easing, duration, reduced motion, frame drops and when NOT to animate.
---

# Design & Motion (after Emil Kowalski)

Source: https://github.com/emilkowalski/skills (`npx skills add emilkowalski/skills`). Sub-skills in the source: emil-design-eng, animate, review-animations, improve-animations, find-animation-opportunities, animation-performance, animation-vocabulary, apple-design, pick-ui-library, prototype, mobile-native, break-ui, ask-sonner. Fuller set: aiforui.dev.

## Rules
1. Start from the user action and the feedback needed; only then decide if motion helps.
2. Animate transform and opacity; avoid layout properties.
3. Easing by intent: entries settle (ease-out), exits leave fast. No default `ease` everywhere.
4. Duration proportional to distance/complexity (UI: ~150–250ms; never arbitrary delays).
5. Respect `prefers-reduced-motion` (replace movement with fade or nothing).
6. Motion never blocks keyboard, pointer or screen readers; animations are interruptible.
7. No scroll-jacking, heavy parallax, looping decoration, or animating every card.
8. Consistent patterns for menus, dialogs, tabs, tooltips, toasts, navigation, editor feedback.
9. Audit frame drops, layout shift, expensive paints, needless JS-thread work.
10. Before adding a dependency, weigh maintenance, compatibility, bundle size.

## Priorities per area
- Resume editor: selection, insert, autosave, undo/redo, validation, preview.
- ATS: progressive disclosure, explainable score changes, loading feedback.
- Writing (Bewrite): before/after, apply-suggestion feedback, undo.
- Canvas: direct manipulation, selection, zoom, pan, snapping, shortcuts.
- Billing: clear pending/success/failure; no excessive celebration.

## Break-UI checklist
Long names, odd emails, one-letter names, huge counts, empty lists, long labels, slow network, errors.

## Reporting
Report patterns changed, rationale, reduced-motion behavior, perf risks. Remove motion if clarity improves without it. Never claim an audit without reading the code.
