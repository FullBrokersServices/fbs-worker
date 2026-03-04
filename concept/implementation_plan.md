# FBS — Full Broker Services
# Plan de Implementación Hiper-Detallado
**Versión:** 2.0.0 · **Fecha:** 2026-03-03 · **Rol:** Gran Arquitecto de Proyecto  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion  
**Naturaleza:** Sitio multi-página informativo · Sin login · CTWA-focused · SEO + GEO

---

## Mapa del Sitio (8 Rutas)

```
/                 → Home — Hero + Stats + How It Works + Arquetipos Preview + Trust + FAQ + CTA
/servicios        → Detalle de servicios: Wire, SEPA, USDT, COP, Remesas
/como-funciona    → Proceso paso a paso expandido con sub-pasos y timeline
/arquetipos       → 5 personas expandidas con casos de uso detallados
/confianza        → AML/KYC, testimonios completos, compliance
/faq              → FAQ completo (15+ preguntas agrupadas)
/contacto         → Solo WhatsApp CTWA, sin formularios
/cotizar          → Calculadora standalone full-screen
```

---

## FASE 1 — Fundación del Proyecto
> **Objetivo:** Inicializar el proyecto con la infraestructura correcta antes de escribir una sola línea de UI.

---

### ETAPA 1.1 — Inicialización del Proyecto

**Comando de instalación:**
```bash
cd c:\Users\DELL\Desktop\fbs
npx -y create-next-app@latest ./ --typescript --tailwind --app --src-dir --import-alias "@/*" --no-git --yes
npm install framer-motion
```

**Copy brand assets to public:**
```bash
copy "concept\logo-no bg.png" "public\logo.png"
copy "concept\favicon.ico" "public\favicon.ico"
```

**Archivos generados a verificar:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`
- `next.config.ts`
- `tsconfig.json`

**Archivos a eliminar (boilerplate):**
- Contenido de `src/app/page.tsx` (reemplazar)
- Contenido de `src/app/globals.css` (reemplazar)

**Variables de entorno a crear (`.env.local`):**
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
NEXT_PUBLIC_WA_NUMBER=+1XXXXXXXXXX
EXCHANGERATE_API_KEY=your_key_here
```

**`.env.example`** (commiteable):
```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_WA_NUMBER=
EXCHANGERATE_API_KEY=
```

---

### ETAPA 1.2 — Design System Tokens (Tailwind)

**Archivo:** `tailwind.config.ts` — reemplazar completamente.

**Paleta de colores:**
```ts
colors: {
  'gold-deep':   '#BF9739',
  'gold-mid':    '#CFAB42',
  'gold-light':  '#E2C762',
  'bg-void':     '#000000',
  'surface':     '#0A0A0A',
  'surface-alt': '#121212',
}
```

**Gradientes personalizados:**
```ts
backgroundImage: {
  'gold-gradient': 'linear-gradient(135deg, #BF9739 0%, #CFAB42 50%, #E2C762 100%)',
  'gold-radial':   'radial-gradient(circle at 50% 0%, rgba(191,151,57,0.15) 0%, transparent 70%)',
  'glass-surface': 'linear-gradient(135deg, rgba(18,18,18,0.6) 0%, rgba(10,10,10,0.4) 100%)',
}
```

**Sombras personalizadas:**
```ts
boxShadow: {
  'gold-glow':  '0 0 30px rgba(191,151,57,0.25)',
  'gold-aura':  '0 0 60px rgba(191,151,57,0.15)',
  'gold-inner': 'inset 0 1px 0 rgba(226,199,98,0.1)',
  'fab-glow':   '0 0 25px rgba(191,151,57,0.45)',
}
```

**Tipografía:**
```ts
fontFamily: {
  display: ['var(--font-manrope)', 'sans-serif'],
  serif:   ['var(--font-playfair)', 'serif'],
}
```

**Animaciones:**
```ts
animation: {
  'marquee':     'marquee 30s linear infinite',
  'float':       'float 4s ease-in-out infinite',
  'shine':       'shine 4s linear infinite',
  'count-up':    'fadeIn 0.5s ease-out',
}
keyframes: {
  marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
  float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
  shine:    { 'to': { backgroundPosition: '200% center' } },
  fadeIn:   { 'from': { opacity: '0', transform: 'translateY(8px)' }, 'to': { opacity: '1', transform: 'translateY(0)' } },
}
```

---

### ETAPA 1.3 — CSS Global y Utilidades

**Archivo:** `src/app/globals.css`

**Contenido completo a definir:**

```css
/* === Variables globales FBS === */
:root {
  --gold-deep:   #BF9739;
  --gold-mid:    #CFAB42;
  --gold-light:  #E2C762;
  --bg-void:     #000000;
  --surface:     #0A0A0A;
  --surface-alt: #121212;
  --glass-bg:    rgba(18, 18, 18, 0.6);
  --glass-border: rgba(191, 151, 57, 0.2);
}

/* === Utilidades de glassmorphismo === */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}

.glass-panel-subtle {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* === Texto con gradiente dorado === */
.text-gradient-gold {
  background: linear-gradient(135deg, #E2C762 0%, #BF9739 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-shimmer-gold {
  background: linear-gradient(to right, #bf9739, #f3dca6, #bf9739);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}

/* === Scrollbar personalizado === */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }

/* === Selección de texto === */
::selection { background: var(--gold-deep); color: #000; }

/* === FAB float animation === */
.fab-float { animation: float 4s ease-in-out infinite; }

/* === Ruido de fondo sutil (textura premium) === */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* === Ocultar arrows en inputs number === */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
input[type=number] { -moz-appearance: textfield; }
```

---

### ETAPA 1.4 — Layout Raíz y Fuentes

**Archivo:** `src/app/layout.tsx`

**Responsabilidades:**
1. Carga de fuentes con `next/font/google` (Manrope + Playfair Display)
2. Metadata raíz (title template, description, OG, Twitter cards)
3. Scripts GA4 y Meta Pixel con `strategy="afterInteractive"`
4. JSON-LD Schema.org (`FinancialProduct` + `LocalBusiness`)
5. Ambient blobs de fondo (fixed, z-0)
6. `WhatsAppFab` persistente
7. `<Navbar>` y `<Footer>` wrappers

**Metadata raíz:**
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://fbsbroker.com'),
  title: { default: 'FBS | Cambio de Divisas USD·EUR a COP·USDT', template: '%s | FBS Full Broker Services' },
  description: '¿Cómo enviar dólares o euros a Colombia? FBS convierte USD/EUR a pesos colombianos o USDT en horas, sin bancos intermediarios. Atención 24/7 por WhatsApp.',
  openGraph: { locale: 'es_CO', type: 'website', siteName: 'Full Broker Services' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
}
```

**JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      "name": "Servicio de Cambio de Divisas FBS",
      "description": "Conversión de USD y EUR a Pesos Colombianos (COP) y USDT con atención personalizada por WhatsApp",
      "provider": { "@type": "Organization", "name": "Full Broker Services" },
      "areaServed": ["CO", "US", "ES", "DE", "FR"]
    },
    {
      "@type": "LocalBusiness",
      "name": "Full Broker Services",
      "description": "Broker de divisas premium para conversión USD/EUR a COP/USDT",
      "telephone": "+1XXXXXXXXXX",
      "openingHours": "Mo-Su 00:00-23:59",
      "address": { "@type": "PostalAddress", "addressCountry": "CO" }
    }
  ]
}
```

---

## FASE 2 — Biblioteca de Componentes
> **Objetivo:** Construir todos los componentes UI reutilizables antes de ensamblar páginas.

---

### ETAPA 2.1 — Navbar

**Archivo:** `src/components/layout/Navbar.tsx`

**Comportamiento:**
- `position: fixed`, `top: 0`, `z-index: 50`
- Estado inicial: `backdrop-blur(0)`, transparente
- Al scrollear >80px: `backdrop-blur(12px)` + `bg-black/80` + `border-b gold/20`
- Sin botón login/registro — solo nav links + botón "Cotizar" → `/cotizar`

**Logo:** `₿ROK€R$` — tipografía Manrope ExtraBold, `₿` y `€` y `$` en color gold, resto blanco.

**Links de navegación:**
```
Inicio (#hero) | Servicios (/servicios) | Cómo Funciona (/como-funciona) | Para Ti (/arquetipos) | Confianza (/confianza) | FAQ (/faq)
```

**Mobile drawer:**
- Botón hamburger → full-screen overlay con `backdrop-blur`
- Links en columna, cada uno cierra el drawer al hacer click
- X para cerrar arriba derecha
- `role="dialog"`, `aria-modal="true"`, Escape cierra

---

### ETAPA 2.2 — Footer

**Archivo:** `src/components/layout/Footer.tsx`

**Layout:** 4 columnas en desktop, 2 en tablet, 1 en mobile

| Col 1 | Col 2 | Col 3 | Col 4 |
|-------|-------|-------|-------|
| Logo + tagline + descripción | Servicios (links) | Legales (links) | Contacto (WA + email + horario) |

**Disclaimer AML/KYC** (bloque destacado antes del bottom bar):
> ⚖️ FBS opera como facilitador de servicios de corretaje. Todas las transacciones cumplen normativas AML y KYC vigentes. Los servicios financieros conllevan riesgo; asegúrese de comprenderlos antes de operar.

**Bottom bar:** `© 2026 Full Broker Services` + links Términos, Privacidad, Cookies

**Contacto en footer:** email `soporte@fbs-broker.com` + WhatsApp directo

**Divisor:** `from-transparent via-gold-deep/40 to-transparent`

---

### ETAPA 2.3 — QuoteCalculator

**Archivo:** `src/components/hero/QuoteCalculator.tsx`  
**Client component:** `"use client"`

**Estado interno:**
```ts
const [amount, setAmount] = useState(1000)
const [fromCurrency, setFromCurrency] = useState<'USD' | 'EUR'>('USD')
const [toCurrency, setToCurrency] = useState<'COP' | 'USDT'>('COP')
const [rates, setRates] = useState<Rates | null>(null)
const [loading, setLoading] = useState(true)
const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
```

**Lógica de conversión:**
```ts
const converted = useMemo(() => {
  if (!rates || !amount) return null
  const rate = fromCurrency === 'USD'
    ? (toCurrency === 'COP' ? rates.usdCop : rates.usdtUsd)
    : (toCurrency === 'COP' ? rates.eurCop : rates.usdtUsd * rates.eurUsd)
  return amount * rate
}, [amount, fromCurrency, toCurrency, rates])
```

**API call:** debounced 300ms → `fetch('/api/rates')` → actualización cada 5min

**CTWA URL builder:**
```ts
const buildCtwaUrl = (amount: number, from: string, to: string) => {
  const text = encodeURIComponent(`Hola, quiero cotizar ${amount} ${from} → ${to}`)
  const utms = `utm_source=fbs_web&utm_medium=landing&utm_campaign=hero_calc&utm_content=${from}_${to}`
  return `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${text}&${utms}`
}
```

**UI Elements:**
- Label "Tú envías" → input número + select (🇺🇸 USD / 🇪🇺 EUR)
- Swap button (rotación 180° animada al click)
- Label "Tú recibes (Estimado)" → valor convertido + select (🇨🇴 COP / ₮ USDT)
- Rate info bar: `1 USD ≈ 4,050 COP · Actualizado hace 2 min`
- `Skeleton` mientras carga
- Botón CTA dorado: `📈 Iniciar Transferencia en WhatsApp`

---

### ETAPA 2.4 — API de Tasas

**Archivo:** `src/app/api/rates/route.ts`

```ts
export const revalidate = 300 // 5 minutos ISR

export async function GET() {
  try {
    const [exchangeRes, binanceRes] = await Promise.all([
      fetch(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/USD`),
      fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTUSDT')
    ])
    const exchangeData = await exchangeRes.json()
    return Response.json({
      usdCop:   Math.round(exchangeData.conversion_rates.COP),
      eurCop:   Math.round(exchangeData.conversion_rates.COP / exchangeData.conversion_rates.EUR),
      eurUsd:   1 / exchangeData.conversion_rates.EUR,
      usdtUsd:  1, // USDT ≈ 1 USD
      updatedAt: new Date().toISOString(),
    })
  } catch {
    // Fallback hardcoded
    return Response.json({ usdCop: 4050, eurCop: 4400, eurUsd: 1.08, usdtUsd: 1, updatedAt: null, fallback: true })
  }
}
```

---

### ETAPA 2.5 — Components UI Primitivos

**`src/components/ui/GoldButton.tsx`**
- Props: `variant: 'primary' | 'outline' | 'ghost'`, `size: 'sm' | 'md' | 'lg'`, `href?`, `onClick?`
- `primary`: `bg-gold-gradient text-black hover:brightness-110 active:scale-[0.98]` + `shadow-gold-glow`
- `outline`: `border border-gold-deep text-gold-deep hover:bg-gold-deep/10`
- `ghost`: `text-gold-light hover:text-gold-deep`

**`src/components/ui/GlassCard.tsx`**
- Props: `className?`, `children`, `hoverGold?: boolean`
- `hoverGold`: agrega `hover:border-gold-deep/40 hover:shadow-gold-glow transition-all`

**`src/components/ui/WhatsAppFab.tsx`**
- `position: fixed`, `bottom-6 right-6`, `z-50`
- Tooltip "Chatea con un bróker" visible en hover desktop
- Ring `animate-ping` exterior en gold/40
- Botón `fab-float` con SVG oficial de WhatsApp
- Click → CTWA URL con `utm_content=fab`

**`src/components/ui/CurrencyTicker.tsx`**
- Marquee CSS de 30s
- Parejas: `USD/COP · EUR/COP · USDT/COP · BTC/USD · EUR/USD`
- Pausa en hover
- Datos: live from `/api/rates`

---

## FASE 3 — Secciones de la Página Home
> **Objetivo:** Construir todas las secciones del home en orden de aparición.

---

### ETAPA 3.1 — Hero Section (EL GANCHO)

**Archivo:** `src/components/hero/HeroSection.tsx`

**Estructura de copy (capas):**

```
EYEBROW:    ● Tasas en vivo · Operando ahora mismo
            [verde pulsante + texto gold-light uppercase tracking-widest]

HEADLINE:   Tu dinero no debería pedir permiso
            para cruzar fronteras.
            [Manrope Black, 5xl→7xl, blanco, staggered entrance]

SUBLINE:      Nosotros lo movemos.
            [Playfair Display italic, text-gradient-gold, tamaño 2xl]

BODY COPY:  Convierte USD o EUR a Pesos Colombianos o USDT en horas.
            Sin bancos intermediarios. Sin Western Union. Solo WhatsApp.
            [slate-400, 18px, max-w-2xl]
```

**Layout desktop (12 cols):**
- Col 1–7: `QuoteCalculator` (glass panel)
- Col 8–12: Panel CTA
  - H3: "Ejecución inmediata."
  - P: "Conectamos tus activos con liquidez global."
  - Botón CTWA dorado full-width (h-16)
  - Divisor dorado
  - 3 trust badges: KYC Verified / AML Checked / Formal Tx

**Layout mobile:** columna única, calculadora primero, luego CTA

**Fondo:** 3 orbes gold blur (animated, fixed position, z-0, parallax sutil)

**Animaciones entrada:**
- Badge eyebrow: `fadeIn` 0ms delay
- Headline: stagger children 100ms
- Subline: stagger 200ms
- Body copy: stagger 300ms
- Calculator: slide-up 400ms
- CTA panel: slide-up 500ms

---

### ETAPA 3.2 — Stats Bar

**Archivo:** `src/components/sections/StatsBar.tsx`

**4 métricas con count-up al scroll:**

| Valor | Label |
|-------|-------|
| +$50M USD | Transaccionados |
| +12,000 | Operaciones Exitosas |
| 15 min | Tiempo Promedio |
| 24/7 | Soporte Premium |

**Implementación count-up:**
```ts
// Hook useCountUp(end, duration, start=0)
// Trigger: useInView( { once: true, amount: 0.5 } )
```

**Estilo:** `bg-black/60 border-y border-gold-deep/10`, divisores verticales entre cols

---

### ETAPA 3.3 — How It Works

**Archivo:** `src/components/sections/HowItWorks.tsx`

**Header:**
- Divisor dorado (línea fina centrada)
- H2: *"Tu Dinero, Sin Fronteras — en 3 Pasos"*
- Sub: "Simplificamos las finanzas internacionales con un proceso transparente y exclusivo."

**3 Steps Cards:**

| Step | Icono | Título | Copy copy |
|------|-------|--------|-----------|
| 1 | chat_bubble (gold shimmer) | **1. Cotizas** | Inicia un chat en WhatsApp. Cuéntanos cuánto quieres mover y a qué moneda. Te damos la tasa preferencial al instante. |
| 2 | account_balance (gold shimmer) | **2. Transfieres** | Realiza el Wire o SEPA a nuestras cuentas corporativas verificadas en EE.UU. o Europa. Respaldo legal total. |
| 3 | account_balance_wallet (gold shimmer) | **3. Reciben** | En cuestión de horas, dispersamos COP a Bancolombia/Nequi/Daviplata o USDT (TRC20/ERC20) a su wallet. |

**Conector desktop:** línea horizontal `via-gold-deep/30`, `top-12`, `left-[16%] right-[16%]`

**Hover por card:** `hover:bg-white/[0.04] hover:border-gold-deep/30 hover:shadow-gold-glow`

**CTA:** "→ Ver proceso completo" → `/como-funciona`

---

### ETAPA 3.4 — Arquetipos

**Archivo:** `src/components/sections/Archetypes.tsx`

**5 Tabs:**

**Tab 1 — Freelancer Internacional**
- Icon: `laptop` (gold)
- Headline: "Cobra tus wires sin perder el 6% en comisiones bancarias."
- Copy: *"Trabajas para clientes en EE.UU., Canadá o Europa y cada wire que recibes pasa por 2 o 3 bancos que se quedan con una parte. Con FBS, ese dinero viaja directo a ti: en USDT a tu wallet o en COP a tu cuenta Bancolombia, sin intermediarios, en horas."*
- Bullets: Sin comisión sobre el monto · Tasa preferencial para freelancers · USDT TRC20 o ERC20
- CTA: "Quiero cotizar mi próximo wire →" → CTWA `utm_content=freelancer`

**Tab 2 — El Estudiante / Familia**
- Icon: `school` (gold)
- Headline: "Matrícula, arriendo y manutención desde Europa o EE.UU., sin retrasos ni recortes."
- Copy: *"Tus padres o pareja te envían dinero desde España, Alemania o Francia. Con SEPA Instant o Wire, nosotros recibimos y convertimos a pesos para que tengas el dinero en tu cuenta en Colombia el mismo día. Sin Western Union, sin filas, sin porcentajes de comisión sobre cada envío."*
- Bullets: SEPA Instant y Wire recibidos · Directo a Bancolombia, Nequi o Daviplata · Sin topes mínimos
- CTA: "Cotizar envío familiar →" → CTWA `utm_content=estudiante`

**Tab 3 — Migrante Europeo**
- Icon: `flight` (gold)
- Headline: "Manda Euros a Colombia. Tu familia los recibe hoy, no en 5 días hábiles."
- Copy: *"Vives en España, Italia, Alemania o el Reino Unido y quieres enviar dinero a Colombia de forma regular. SEPA Instant nos trae tus euros en segundos. Nosotros los convertimos a la mejor tasa de mercado y los depositamos en la cuenta que indiques en Colombia — COP en minutos, USDT en horas."*
- Bullets: Tasa TRM oficial de referencia · Instrucciones SEPA claras y rápidas · Sin límites mensuales (consultar)
- CTA: "Cotizar mi envío desde Europa →" → CTWA `utm_content=migrante`

**Tab 4 — PyME & Empresa**
- Icon: `business` (gold)
- Headline: "Operaciones B2B de hasta $50K/mes. Trazabilidad total, mandato legal."
- Copy: *"Tu empresa importa, exporta o paga proveedores internacionales. FBS te da un acceso corporativo con cuenta dedicada, respaldo de mandato legal, reportes de cada operación y límites amplios. Nada de plataformas crypto con KYC interminables: un bróker asignado, atención directa."*
- Bullets: Mandato legal firmado · Bróker corporativo dedicado · Reportes para contabilidad
- CTA: "Abrir cuenta corporativa →" → CTWA `utm_content=pyme`

**Tab 5 — Trader / Arbitrador**
- Icon: `candlestick_chart` (gold)
- Headline: "Liquidez en USDT al precio de mercado. Rápido, sin plataformas lentas."
- Copy: *"Necesitas liquidez en USDT TRC20 o ERC20 para arbitrar entre plataformas, cubrir posiciones o mover capital a velocidad. FBS te da tasas preferenciales por volumen, sin los delays de los exchanges, con bróker disponible en tiempo real para cerrar operaciones large size."*
- Bullets: Tasas por volumen desde $5,000 · USDT TRC20 / ERC20 disponible · Confirmación en minutos
- CTA: "Consultar tasa por volumen →" → CTWA `utm_content=trader`

---

### ETAPA 3.5 — Trust Signals

**Archivo:** `src/components/sections/TrustSignals.tsx`

**Sub-sección A — Contador principal:**
- `+1,500 Operaciones Verificadas` (gigante, count-up, gold gradient text)
- Divisor dorado

**Sub-sección B — 4 Badges de compliance:**

| Badge | Icono | Título | Sub |
|-------|-------|--------|-----|
| AML Checked | shield_person | AML Checked | Estándares internacionales anti lavado |
| KYC Verified | verified_user | KYC Verified | Identidad verificada en cada operación |
| Safe Transfers | lock_clock | Transferencias Seguras | Respaldo legal y cifrado de extremo a extremo |
| Legal Compliance | gavel | Legal Compliance | Cumplimiento normativo Colombia y USA |

Hover: `border-t-2 border-t-gold-deep` reveal top accent.

**Sub-sección C — Carousel de testimonios:**
3 cards visibles en desktop, scroll-snap mobile

| Arquetipo | Cita | Rating |
|-----------|------|--------|
| Freelancer / Tech | "Recibo mis wires de EE.UU. en USDT sin complicaciones. La rapidez es impresionante." | ★★★★★ |
| Familia / Remesas | "Enviamos euros desde España a Colombia y llegan el mismo día. Excelente servicio." | ★★★★½ |
| PYME / Empresa | "Límites amplios y total trazabilidad. Ideal para nuestra empresa importadora." | ★★★★★ |

Cada card: foto avatar (generada) + nombre de arquetipo + "Verified Transaction" ✅

**Nota final:** "Verificado por Binance & TRM Oficial de Colombia"

---

### ETAPA 3.6 — FAQ Home

**Archivo:** `src/components/sections/FaqSection.tsx`

8 preguntas clave (anti-objeción):

1. ¿Cuánto demoran en enviar los USDT?
2. ¿Están ocultas las comisiones?
3. ¿Necesito abrir una cuenta en su plataforma?
4. ¿Es legal cambiar divisas en Colombia?
5. ¿Cuáles son los límites mínimos y máximos por operación?
6. ¿Puedo recibir USDT en lugar de pesos colombianos?
7. ¿Cómo verifican mi identidad (proceso KYC)?
8. ¿Qué sucede si hay un inconveniente con mi transferencia?

Accordion animado con `framer-motion AnimatePresence`. Ícono `+` rotando 45° a `×` al abrir.

CTA al final: "¿Tienes más dudas? → Escríbenos por WhatsApp"

**Referencia a página completa:** "Ver todas las preguntas → /faq"

---

### ETAPA 3.7 — Final CTA

**Archivo:** `src/components/sections/FinalCta.tsx`

- Fondo: `radial-gradient(circle at 50% 0%, rgba(191,151,57,0.12), transparent 60%)`
- H2: "¿Listo para tu primera operación?"
- Sub: "Únete a los más de 1,500 clientes que ya mueven su dinero sin fronteras."
- Botón CTWA dorado (size `lg`)
- Micro-trust: "Sin comisiones ocultas · Seguridad bancaria · Respuesta en minutos"

---

## FASE 4 — Páginas Interiores
> **Objetivo:** Implementar las 7 páginas adicionales con contenido SEO-rich.

---

### ETAPA 4.1 — `/servicios`

**H1:** "Servicios de Cambio de Divisas Internacional | FBS"  
**Meta description:** "FBS convierte USD, EUR a Pesos Colombianos (COP) y USDT. Wire Transfer, SEPA, remesas y cambio crypto. Cotiza ahora por WhatsApp."

**Secciones:**
1. Hero: headline + sub bullet de cada servicio
2. Grid de 6 service cards:
   - USD → COP via Wire Transfer
   - EUR → COP via SEPA Instant
   - USD/EUR → USDT (TRC20/ERC20)
   - Remesas familiares (mínimos bajos)
   - Operaciones corporativas B2B
   - Asesoría de tipo de cambio
3. Tabla comparativa: FBS vs Banco tradicional vs Western Union (FBS gana en todos)
4. CTA bottom

---

### ETAPA 4.2 — `/como-funciona`

**H1:** "Cómo Funciona el Cambio de Divisas con FBS · Proceso en 3 Pasos"  
**Meta description:** "Aprende cómo enviamos tu dinero: cotiza por WhatsApp, transfiere con Wire o SEPA, recibe COP o USDT en horas. Sin bancos intermediarios."

**Secciones:**
1. Hero 3-step expandido (con sub-pasos)
2. Timeline visual detallado:
   - Step 1: Cotizas (5 min) → sub: tasa, monto mínimo, monedas disponibles
   - Step 2: Transfieres (tiempo del banco) → sub: cuentas receptoras, instrucciones wire/SEPA
   - Step 3: Reciben (2–4h) → sub: Bancolombia, Nequi, Daviplata, wallet USDT
3. Long-form SEO: "¿Cómo enviar un Wire Transfer desde USA a Colombia?" (400 palabras)
4. FAQ específico del proceso
5. CTA

---

### ETAPA 4.3 — `/arquetipos`

**H1:** "¿Para quién es FBS? Tu perfil, tu solución financiera."

5 secciones largas (una por arquetipo), cada una:
- H2 = nombre arquetipo
- 3 sub-secciones: El Problema / La Solución FBS / Un Ejemplo Real
- Rich copy (≥400 palabras por arquetipo)
- CTA específico de arquetipo

---

### ETAPA 4.4 — `/confianza`

**H1:** "¿Por qué confiar en FBS? Transparencia total en cada operación."

- Contador hero
- Badges expandidos con explicación de cada certificación
- Testimonios carousel completo (todos los arquetipos)
- Sección "AML/KYC: ¿Qué significa para ti?" (explicación amigable)
- Aviso de riesgo legal
- CTA

---

### ETAPA 4.5 — `/faq`

**H1:** "Preguntas Frecuentes sobre Cambio de Divisas con FBS"
**JSON-LD:** `FAQPage` con todas las preguntas

15+ preguntas agrupadas por categoría:
- **Proceso:** ¿Cuánto tarda? ¿Qué necesito? ¿Cómo cotizo?
- **Precios:** ¿Hay comisiones? ¿Cómo calculan la tasa? ¿Por qué el spread?
- **Seguridad:** ¿Es legal? ¿KYC? ¿Qué pasa si algo sale mal?
- **Técnico:** ¿Qué es Wire Transfer? ¿Qué es SEPA? ¿Qué es USDT?
- **Límites:** ¿Mínimo? ¿Máximo? ¿Frecuencia?

---

### ETAPA 4.6 — `/contacto`

**H1:** "Contacta a FBS — Solo por WhatsApp, Sin Formularios"

- 1 CTA grande: WhatsApp global
- Arquetipos rápidos con CTWA pre-lleno
- Horarios de atención
- Aviso: "No almacenamos datos personales en este sitio"

---

### ETAPA 4.7 — `/cotizar`

**H1:** "Calculadora de Tipo de Cambio en Tiempo Real | FBS"

- Full-viewport calculator
- Todos los pares: USD→COP / USD→USDT / EUR→COP / EUR→USDT
- Tabla de tasas vigentes
- Botón CTWA grande con monto pre-llenado

---

## FASE 5 — SEO, GEO y Analytics
> **Objetivo:** Garantizar indexación y rastreabilidad completas.

---

### ETAPA 5.1 — Archivos SEO

**`src/app/sitemap.ts`** — 8 rutas con priority y changefreq  
**`src/app/robots.ts`** — Allow all, Disallow `/api/`  
**`src/app/manifest.ts`** — PWA basic  

---

### ETAPA 5.2 — Metadata por Página

Cada `page.tsx` exporta su propio `metadata` con:
- `title`: keyword primaria + separador + nombre de marca
- `description`: responde una pregunta real ≤155 chars
- `openGraph`: locale `es_CO`, imagen OG específica de página
- `alternates.canonical`: URL canónica

---

### ETAPA 5.3 — Analytics

**`src/lib/analytics.ts`**
```ts
export const trackWhatsAppClick = (method: string, archetype?: string, amount?: number) => {
  gtag('event', 'whatsapp_click', { method, archetype, amount })
  fbq('track', 'Contact', { method, archetype })
}
```

Todos los botones CTWA llaman a `trackWhatsAppClick` al hacer click.

---

## FASE 6 — Performance y Pulido
> **Objetivo:** Lighthouse ≥90 mobile, sin deuda técnica.

---

### ETAPA 6.1 — Optimización de Imágenes y Assets

- Todos los `img` → `next/image` con `width/height` explícitos
- Imagen OG 1200×630 en `/public/og.webp`
- SVGs de iconos → inline en componentes (zero http requests)
- Banderas → `flagcdn.com` con `srcset` 2x o SVGs locales

---

### ETAPA 6.2 — Code Splitting

- `"use client"` solo en componentes que usan estado o eventos
- `dynamic()` con `{ssr: false}` para Framer Motion imports pesados
- Framer variants: extraer a archivos separados para tree-shaking

---

### ETAPA 6.3 — Fallbacks y Accesibilidad

- Glassmorphism fallback: `@supports not (backdrop-filter: blur(1px)) { background: rgba(10,10,10,0.95); }`
- `prefers-reduced-motion`: todas las animaciones condicionadas
- Focus rings visibles (`focus-visible:ring-2 ring-gold-deep`)
- Alt text descriptivo en español en todas las imágenes

---

## FASE 7 — Verificación Final
> **Objetivo:** Sign-off técnico, visual y de negocio.

---

### ETAPA 7.1 — Tests Funcionales

1. Calculator: input 1000 USD → COP output ≠ 0 dentro de 1s
2. Calculator: cambiar a EUR → output se actualiza
3. CTWA hero: click → `wa.me` abre con texto pre-llenado
4. CTWA arquetipos: cada tab tiene su UTM correcto
5. FAQ: abrir y cerrar 3 ítems distintos
6. Ticker: se mueve, se pausa en hover
7. Nav mobile: abrir drawer, cerrar con X, cerrar con Escape
8. Todas las 8 rutas responden HTTP 200

### ETAPA 7.2 — Lighthouse

- Run en Chrome → DevTools → Lighthouse → Mobile → Generate Report
- Performance ≥90, SEO ≥95
- LCP ≤1.8s, CLS ≤0.1

### ETAPA 7.3 — Schema Validation

- https://validator.schema.org/ → 0 errores críticos
- Google Rich Results Test → FAQPage detectado en `/faq`

### ETAPA 7.4 — Walkthrough Final

- Documento `walkthrough.md` con screenshots, grabaciones y métricas
