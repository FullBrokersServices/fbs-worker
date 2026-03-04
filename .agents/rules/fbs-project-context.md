---
trigger: always_on
glob: "**/*"
description: FBS Project Context — Business, Branding & Architecture Reference
---

# FBS Full Broker Services — Project Context
> Read this FIRST before touching any file in this project.  
> This is the single source of truth for any agent working on FBS.

---

## What Is FBS?

**Full Broker Services (FBS)** is a premium currency exchange broker operating via **WhatsApp**.  
It converts **USD / EUR → COP (Colombian Pesos) / USDT** for individuals and businesses.

**Core channels:** Wire Transfer (USA) · SEPA Instant (Europe) → COP · USDT  
**KPI primario:** ≥15% conversion Visitante → Conversación WhatsApp (CTWA)  
**NO es:** una app bancaria, una plataforma de trading, ni requiere registro

---

## Business Model Summary

| Elemento | Detalle |
|----------|---------|
| Revenue | Spread en el tipo de cambio (incluido en la tasa, sin comisiones adicionales) |
| Canal principal | WhatsApp Business (CTWA — Click to WhatsApp) |
| Operativa | 100% conversacional, sin forms, sin login, sin dashboard |
| Compliance | AML checked · KYC verificado · Mandato legal en operaciones formales |
| Ticket | $500 – $50,000 USD por operación |
| Mercados | Colombia (COP) ← USD (Wire/USA) + EUR (SEPA/Europa) |

---

## Brand Identity (NON-NEGOTIABLE)

### Logo
`₿ROK€R$` — currency symbols embedded:
- `₿` = Bitcoin (gold)
- `€` = Euro (gold)  
- `$` = Dollar (gold)
- `ROK R` = white/black

**NEVER** alter proportions, colors, or omit the currency symbols.

### Logo & Favicon Source Files

| Asset | Source (concept/) | Destination (public/) | Usage |
|-------|-------------------|-----------------------|-------|
| Logo PNG (no bg) | `concept/logo-no bg.png` | `public/logo.png` | Navbar, Footer, OG image |
| Favicon | `concept/favicon.ico` | `public/favicon.ico` | Browser tab icon |

> **Setup:** During Phase 1 initialization, copy these files to `public/`.
> Use `next/image` for the logo. Favicon is referenced in `app/layout.tsx` via `icons` metadata.

### Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--gold-deep` | `#BF9739` | Primary accent, CTAs, borders |
| `--gold-mid` | `#CFAB42` | Gradient middle |
| `--gold-light` | `#E2C762` | Highlights, shimmer, output text |
| `--bg-void` | `#000000` | Base background (absolute black) |
| `--surface` | `#0A0A0A` | Card backgrounds |
| `--surface-alt` | `#121212` | Input backgrounds |
| `--glass-bg` | `rgba(18,18,18,0.6)` | Glass panels |
| `--glass-border` | `rgba(191,151,57,0.2)` | Glass panel borders |

### Typography
- **Display / Body:** Manrope (200–800) — `var(--font-manrope)`
- **Hero accent:** Playfair Display italic — `var(--font-playfair)`

### Design Language
- **Background:** Absolute black `#000000`
- **Cards:** Glassmorphism — `backdrop-filter: blur(12px)` + gold border
- **CTAs:** Gold gradient buttons with `shadow-gold-glow`
- **Animations:** Smooth, premium — `float`, `shimmer`, `stagger`, `fade-up`
- **Feel:** Luxury fintech — dark, gold, minimal, exclusive

---

## Site Architecture (Multi-Page)

```
/                  → Home (hero + all preview sections + CTWA)
/servicios         → Wire, SEPA, USDT, COP, Remesas, B2B
/como-funciona     → 3-step process expanded
/arquetipos        → 5 personas expandidas
/confianza         → AML/KYC, testimonials, compliance
/faq               → 15+ questions, FAQPage schema
/contacto          → WhatsApp only
/cotizar           → Standalone calculator
```

**NO login page. NO dashboard. NO user area.**

---

## 5 Customer Archetypes (Personas)

| # | Nombre | Situación | Canal origen | Need |
|---|--------|-----------|--------------|------|
| 1 | **Freelancer Internacional** | Cobra wires de USA/EU | Wire Transfer | USDT o COP sin perder 6% en fees bancarios |
| 2 | **El Estudiante / Familia** | Recibe dinero de Europa | SEPA/Wire | COP en Bancolombia/Nequi para gastos diarios |
| 3 | **Migrante Europeo** | Vive en Europa, familia en Colombia | SEPA Instant | COP directo a cuenta familiar, hoy mismo |
| 4 | **PyME / Empresa** | Paga proveedores o importa | Wire/SEPA B2B | Trazabilidad, mandato legal, límites amplios |
| 5 | **Trader / Arbitrador** | Mueve capital entre exchanges | Wire/SEPA | USDT TRC20/ERC20 a precio de mercado, rápido |

**Cada arquetipo tiene su propio UTM en los links CTWA.**

---

## Hero Hook (Copywriting Exacto)

```
EYEBROW:  ● Tasas en vivo · Operando ahora mismo

HEADLINE: Tu dinero no debería pedir permiso
          para cruzar fronteras.

SUBLINE:    Nosotros lo movemos.          [Playfair italic, gold gradient]

BODY:     Convierte USD o EUR a Pesos Colombianos o USDT en horas.
          Sin bancos intermediarios. Sin Western Union. Solo WhatsApp.
```

**NO cambiar este hook sin aprobación del Director.**

---

## Critical Tech Rules

### CTWA Links
**SIEMPRE** usar `lib/ctwa.ts → buildCtwaUrl()`:
```ts
buildCtwaUrl({ amount, from, to, archetype })
// Generates: https://wa.me/{WA_NUMBER}?text=...&utm_source=fbs_web&utm_medium=landing&...
```

### Exchange Rate API
- Server-side only vía `app/api/rates/route.ts`
- `revalidate = 300` (5 min ISR)
- Fallback: `{ usdCop: 4050, eurCop: 4400, usdtUsd: 1, fallback: true }`

### Analytics Events
```ts
// On EVERY WhatsApp button click:
trackWhatsAppClick(method, archetype?, amount?)
// → gtag('event', 'whatsapp_click', {...})
// → fbq('track', 'Contact', {...})
```

---

## What NOT To Do (Anti-Patterns)

| ❌ NUNCA | ✅ EN CAMBIO |
|---------|------------|
| Agregar botón de Login o Registro | No existe área de usuarios |
| Cambiar fondo de negro a gris oscuro | Fondo = `#000000` absoluto |
| Usar copy genérico ("somos los mejores") | Copy específico con datos concretos |
| Hardcodear URLs de WhatsApp | Usar `buildCtwaUrl()` siempre |
| Usar `any` en TypeScript | Tipos explícitos siempre |
| Agregar formularios de contacto | Solo CTWA (WhatsApp) |
| Modificar el logo `₿ROK€R$` | Es marca registrada |
| Usar colores fuera de la paleta FBS | Solo tokens definidos en tailwind.config.ts |
| Crear páginas sin metadata export | SEO es obligatorio en cada route |
| Usar `import` estático de Framer Motion | Solo `dynamic()` con `{ssr: false}` |

---

## Key Files Reference

| Archivo | Propósito |
|---------|-----------|
| `concept/implementation_plan.md` | Plan hiper-detallado, 7 fases y etapas |
| `concept/audit_42q.md` | 42Q de auditoría por fase |
| `concept/prd.md` | Product Requirements Document |
| `concept/website-mockup/01-11.html` | Mockups visuales de referencia |
| `.agents/rules/code-style-guide.md` | Reglas de código TypeScript/React/Tailwind |
| `.agents/rules/fbs-project-context.md` | Este archivo — contexto de negocio |
| `src/lib/ctwa.ts` | Builder de URLs WhatsApp CTWA |
| `src/lib/analytics.ts` | GA4 + Meta Pixel helpers |
| `src/app/api/rates/route.ts` | API de tasas (servidor) |

---

## Best Practices (Development)

### Component Architecture
- Server Components by default — `"use client"` only for state/effects/events
- One exported component per file — named same as file (PascalCase)
- Props: `interface` in same file, destructured in signature
- Shared types: `src/types/` directory

### Error Handling
- All `fetch()` calls wrapped in try/catch with fallback values
- API routes return typed JSON with `{ data, error?, fallback? }` shape
- Client components show skeleton/fallback during loading states
- Never fail silently — log to console in dev, suppress in prod

### State Management
- Local state with `useState` — no global store needed for this project
- API data: `fetch` on mount + `revalidate` ISR — no client-side cache lib
- URL state (e.g. active archetype tab): `useSearchParams` if needed

### Responsive Design
- Mobile-first: base styles = mobile, then `sm:` `md:` `lg:` `xl:`
- Test at: 375px (iPhone SE), 768px (iPad), 1280px (laptop), 1536px (desktop)
- Touch targets: minimum 44×44px
- No horizontal scroll at any viewport

### Git & Commits (when applicable)
- Conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- One logical change per commit
- Never commit `.env.local` — only `.env.example`

### Code Quality Checklist (before each phase sign-off)
- [ ] `npm run build` passes with 0 errors
- [ ] No `any` types
- [ ] No `console.log` in production paths
- [ ] No hardcoded colors outside Tailwind tokens
- [ ] No hardcoded WhatsApp URLs
- [ ] Every `page.tsx` exports `metadata`
- [ ] Every image uses `next/image`
- [ ] Glassmorphism includes `-webkit-backdrop-filter`
- [ ] Tested at 375px mobile viewport

---

## Governance

- **Antes de ejecutar cualquier cambio:** leer `implementation_plan.md` para esa fase
- **Después de cada fase:** ejecutar `/phase-completion-audit` workflow (42Q)
- **Cualquier desviación del plan:** requiere justificación documentada en `concept/audit-log.md`
- **Copy del hero y arquetipos:** NO modificar sin aprobación del Director
- **WhatsApp number y API keys:** variables de entorno, NUNCA hardcodeadas
- **Logo y favicon:** usar SOLO los archivos fuente de `concept/` copiados a `public/`
