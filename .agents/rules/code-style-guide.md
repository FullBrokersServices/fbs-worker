---
trigger: always_on
glob: "**/*.{ts,tsx,css,md}"
description: FBS Full Broker Services — Code Style & Development Rules
---

# FBS Code Style Guide
> Stack: Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion  
> Enforce these rules in EVERY file, EVERY change, NO exceptions.

---

## 1. TypeScript

- Always use explicit types — no `any`, no implicit `any`
- Prefer `interface` for component props, `type` for unions/utilities
- All async functions must handle errors with try/catch
- Export types alongside their components: `export type { ButtonProps }`
- Use `const` assertions for static config objects
- No unused imports — ESLint will catch, fix immediately

```ts
// ✅ CORRECT
interface QuoteCalculatorProps {
  initialAmount?: number
  onCtwaClick?: (url: string) => void
}

// ❌ WRONG
const calc = (x: any) => x * 2
```

---

## 2. React / Next.js Components

- `"use client"` ONLY when using: state, effects, browser APIs, event handlers
- Server Components by default — never add `"use client"` unnecessarily
- No client components at layout level — push client state down
- One component per file — filename = component name (PascalCase)
- Props destructured in function signature, not inside body
- No inline styles — use Tailwind classes or CSS variables only

```tsx
// ✅ CORRECT — Server Component (default)
export default function HeroSection() {
  return <section>...</section>
}

// ✅ CORRECT — Client only when needed
"use client"
export default function QuoteCalculator({ initialAmount = 1000 }: QuoteCalculatorProps) {
  const [amount, setAmount] = useState(initialAmount)
  ...
}
```

---

## 3. Tailwind CSS Rules

- **NEVER** use arbitrary values unless justified: `w-[347px]` ❌ → use design token
- **ALWAYS** use FBS brand tokens defined in `tailwind.config.ts`:
  - Colors: `gold-deep`, `gold-mid`, `gold-light`, `bg-void`, `surface`, `surface-alt`
  - Gradients: `bg-gold-gradient`, `bg-gold-radial`, `bg-glass-surface`
  - Shadows: `shadow-gold-glow`, `shadow-gold-aura`, `shadow-fab-glow`
- Responsive: mobile-first — `sm:` `md:` `lg:` `xl:`
- Hover/Focus states always paired: `hover:X focus-visible:X`
- No `!important` overrides

```tsx
// ✅ CORRECT
<button className="bg-gold-gradient text-black hover:brightness-110 active:scale-[0.98] shadow-gold-glow rounded-xl px-6 py-4 font-bold transition-all">

// ❌ WRONG  
<button style={{ background: '#BF9739' }} className="!text-black">
```

---

## 4. CSS Utilities (globals.css)

Only these utility classes are predefined — use them, don't re-invent:

| Class | Purpose |
|-------|---------|
| `.glass-panel` | Glassmorphism card (blur 12px + gold border) |
| `.glass-panel-subtle` | Softer glass (blur 8px + white/6 border) |
| `.text-gradient-gold` | Gold clip-path gradient text |
| `.text-shimmer-gold` | Animated gold shimmer text |
| `.fab-float` | Float Y-axis animation for FAB |
| `.noise-overlay` | Subtle grain texture overlay |

---

## 5. File & Folder Naming

```
src/
  app/                    → Next.js App Router pages
    [route]/page.tsx      → kebab-case routes
    api/[endpoint]/route.ts
  components/
    layout/               → Navbar, Footer
    hero/                 → HeroSection, QuoteCalculator
    sections/             → StatsBar, HowItWorks, Archetypes, etc.
    ui/                   → GoldButton, GlassCard, WhatsAppFab, CurrencyTicker
  lib/                    → rates.ts, ctwa.ts, analytics.ts
```

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Routes: `kebab-case/page.tsx`
- No `index.ts` barrel files (use direct imports)

---

## 6. Animations (Framer Motion)

- Import ONLY via `dynamic()` with `{ssr: false}` — never static import at top level
- Always use `viewport: { once: true }` on `whileInView` to prevent re-animation
- Respect `prefers-reduced-motion`:

```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const variants = prefersReduced ? {} : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
```

- Stagger children: `staggerChildren: 0.08` (max 0.15)
- Duration: entrance `0.5s`, micro-interaction `0.2s`
- Easing: `ease: [0.25, 0.46, 0.45, 0.94]` (custom ease-out)

---

## 7. Analytics & CTWA

- **ALL** WhatsApp CTA buttons MUST call `trackWhatsAppClick()` from `lib/analytics.ts`
- **ALL** CTWA URLs MUST be built via `buildCtwaUrl()` from `lib/ctwa.ts`
- **NEVER** hardcode `wa.me` URLs directly in components
- UTM params are MANDATORY on every CTWA link: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`

```ts
// ✅ CORRECT
const url = buildCtwaUrl({ amount, from: 'USD', to: 'COP', archetype: 'freelancer' })
trackWhatsAppClick('hero_cta', 'freelancer', amount)
```

---

## 8. SEO Rules

- Every `page.tsx` MUST export a `metadata` object
- `description` ≤ 155 characters, phrased as a question answer
- One `<h1>` per page — no exceptions
- All `next/image` components MUST have `alt` in Spanish, descriptive
- No external images without `next/image` wrapper
- `target="_blank"` links MUST have `rel="noopener noreferrer"`

---

## 9. Environment Variables

| Variable | Scope | Usage |
|----------|-------|-------|
| `NEXT_PUBLIC_GA_ID` | Client | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Client | Meta Pixel |
| `NEXT_PUBLIC_WA_NUMBER` | Client | WhatsApp number |
| `EXCHANGERATE_API_KEY` | Server only | Exchange rate API |

- **NEVER** access `EXCHANGERATE_API_KEY` in client components
- **ALWAYS** have `.env.example` updated when adding new variables

---

## 10. Performance Checklist (before any PR/commit)

- [ ] No `console.log` in production code
- [ ] No unused imports
- [ ] `next/image` for all images
- [ ] `dynamic()` for heavy client components
- [ ] API routes have `revalidate` set
- [ ] No `any` types
- [ ] Mobile responsive (test at 375px)
- [ ] Glass panel has `-webkit-backdrop-filter` prefix
