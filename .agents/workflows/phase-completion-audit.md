---
description: FBS Phase Completion Audit — 42Q checklist workflow to run before advancing to the next phase
---

# Phase Completion Audit Workflow
> Run at the end of **every phase** before starting the next one.  
> Minimum passing score: **≥90% (≥38/42 ✅)**.

---

## Step 1 — Identify Current Phase

| Phase | Name | Key Deliverable |
|-------|------|-----------------|
| 1 | Fundación | Next.js init, Tailwind tokens, globals.css, layout.tsx |
| 2 | Componentes | Navbar, Footer, QuoteCalculator, API rates, UI primitives |
| 3 | Secciones Home | Hero, Stats, HowItWorks, Archetypes, Trust, FAQ, CTA |
| 4 | Páginas Interiores | /servicios, /como-funciona, /arquetipos, /confianza, /faq, /contacto, /cotizar |
| 5 | SEO & Analytics | sitemap, robots, metadata, GA4, Meta Pixel, JSON-LD, UTMs |
| 6 | Performance | Lighthouse ≥90, images, code split, a11y, cross-browser |
| 7 | Verificación Final | All routes 200, CTWA tests, schema validation, walkthrough.md |

---

## Step 2 — Open the Audit Document

```
file: concept/audit_42q.md
section: FASE [N] — [Name]
```

---

## Step 3 — Run the Audit (6 sections, 7Q each)

### Section A — Architecture / Structure (Q1–Q7)
Verify file existence, folder structure, route setup, exports.

// turbo
> Run in terminal: `dir /s /b src 2>&1 | head -50`

### Section B — Branding & Design (Q8–Q14)
Verify colors, logo, glassmorphism, typography.

// turbo
> Run: `findstr /s /r "BF9739" src\app\globals.css`

### Section C — Functionality (Q15–Q21)
Test interactive components: calculator, CTWA, FAQ, nav, mobile.

> Open http://localhost:3000 and test each feature manually.

### Section D — SEO & Copy (Q22–Q28)
Verify metadata exports, H1 uniqueness, schema, keyword usage.

// turbo
> Run: `findstr /s "metadata" src\app\*\page.tsx`

### Section E — Performance (Q29–Q35)
Verify build passes clean, no console.log, images optimized.

// turbo
> Run: `npm run build 2>&1 | tail -20`

### Section F — Accessibility & Standards (Q36–Q42)
Verify aria labels, focus states, contrast, semantic HTML.

---

## Step 4 — Calculate Score

```
Score = (✅ count / 42) × 100
```

| Score | Decision |
|-------|----------|
| ≥90% (≥38 ✅) | ✅ APPROVED — proceed to next phase |
| 75–89% (31–37 ✅) | ⚠️ Fix warnings first, then re-audit |
| <75% (<31 ✅) | ❌ BLOCKED — do not advance |

---

## Step 5 — Document Results

Append to `concept/audit-log.md`:

```markdown
## Phase [N] — [Name] · [YYYY-MM-DD]
**Score:** [X]/42 ([Y]%)  
**Status:** ✅ APPROVED / ⚠️ CONDITIONAL / ❌ BLOCKED

### Failures / Warnings
- Q[N]: [issue]

### Actions Taken
- [fix applied]
```

---

## Step 6 — Fix & Re-audit (if score < 90%)

1. Fix all `❌` items immediately
2. Document `⚠️` items as technical debt
3. Re-run only failed sections
4. Must reach ≥90% before advancing

---

## Step 7 — Advance to Next Phase

When score ≥90%, update `task.md`:
- Mark completed phase tasks as `[x]`
- Mark next phase first task as `[/]`

Then follow `concept/implementation_plan.md` for the next phase.

---

## Always-True Checklist (non-negotiable before phase sign-off)

- [ ] No `console.log` anywhere in src/
- [ ] No hardcoded WhatsApp URLs (always `buildCtwaUrl()`)
- [ ] No `any` TypeScript types
- [ ] Every page has `metadata` export
- [ ] Every CTWA button calls `trackWhatsAppClick()`
- [ ] All images use `next/image`
- [ ] `glass-panel` has `-webkit-backdrop-filter` prefix
- [ ] Mobile tested at 375px
- [ ] `npm run build` passes with zero errors
- [ ] Hero hook copy unchanged from approved version
