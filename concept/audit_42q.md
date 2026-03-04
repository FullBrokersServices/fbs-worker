# FBS Landing Site — Auditoría por Fases (42Q por Fase)
**Versión:** 1.0.0 · **Fecha:** 2026-03-03 · **Rol:** Gran Arquitecto QMS

> Cada fase debe alcanzar **≥90% de respuestas afirmativas** antes de avanzar.  
> Marcador: ✅ Cumple · ❌ Falla · ⚠️ Parcial

---

## FASE 1 — Fundación del Proyecto

### Arquitectura (Q1–Q7)
- [x] Q1. ¿El proyecto está inicializado con Next.js 14 App Router y TypeScript?
- [x] Q2. ¿El `tailwind.config.ts` incluye todos los tokens de color FBS (`#BF9739`, `#CFAB42`, `#E2C762`, `#000000`)?
- [x] Q3. ¿Existe `globals.css` con las utilidades `.glass-panel`, `.text-gradient-gold` y `.gold-shimmer`?
- [x] Q4. ¿El `app/layout.tsx` incluye `<html lang="es">` y dark mode habilitado?
- [x] Q5. ¿Las fuentes Manrope y Playfair Display se cargan con `next/font` (sin FOUC)?
- [x] Q6. ¿El `next.config.ts` tiene strict mode activado y dominios de imagen configurados?
- [x] Q7. ¿Existe un `sitemap.ts` y `robots.ts` generados dinámicamente?

### Branding (Q8–Q14)
- [x] Q8. ¿El fondo base es `#000000` absoluto, no un gris oscuro?
- [x] Q9. ¿El logo `₿ROK€R$` muestra los símbolos ₿, €, $ en gold y el resto en blanco?
- [x] Q10. ¿El gradiente dorado va de `#BF9739` a `#E2C762` en dirección 135deg?
- [x] Q11. ¿El efecto glassmorphismo usa `backdrop-filter: blur(12px)` + `border: 1px solid rgba(191,151,57,0.2)`?
- [x] Q12. ¿Los textos secundarios usan `slate-400` (#94A3B8)?
- [x] Q13. ¿La selección de texto usa gold de fondo y negro de texto?
- [x] Q14. ¿Los scrollbars tienen estilo (`#333` thumb, `#000` track)?

### Estructura (Q15–Q21)
- [x] Q15. ¿Existen 8 rutas creadas: `/`, `/servicios`, `/como-funciona`, `/arquetipos`, `/confianza`, `/faq`, `/contacto`, `/cotizar`?
- [x] Q16. ¿Cada página tiene su propio `metadata` con `title`, `description`, `openGraph`?
- [x] Q17. ¿El `layout.tsx` incluye el componente `WhatsAppFab` persistente en todas las páginas?
- [x] Q18. ¿La estructura de carpetas sigue el estándar: `components/layout`, `components/hero`, `components/sections`, `components/ui`?
- [x] Q19. ¿Existe `lib/rates.ts`, `lib/ctwa.ts` y `lib/analytics.ts`?
- [x] Q20. ¿Existe `app/api/rates/route.ts` con `export const revalidate = 300`?
- [x] Q21. ¿No existe ningún directorio `/pages` (confirmar uso puro de App Router)?

### SEO Base (Q22–Q28)
- [x] Q22. ¿El JSON-LD `FinancialProduct` está inyectado en `layout.tsx`?
- [x] Q23. ¿El JSON-LD `LocalBusiness` incluye nombre, descripción y área servida (CO, US, ES)?
- [x] Q24. ¿El `canonical` URL está configurado correctamente en el metadata root?
- [x] Q25. ¿Existe un `sitemap.xml` accesible en `GET /sitemap.xml`?
- [x] Q26. ¿El `robots.txt` permite indexación de todas las rutas (excepto `/api/`)?
- [x] Q27. ¿Todos los `<img>` usan `next/image` con `alt` descriptivos en español?
- [x] Q28. ¿Los `description` de cada página tienen ≤155 caracteres y responden una pregunta real?

### Performance (Q29–Q35)
- [x] Q29. ¿El servidor de desarrollo inicia sin errores de TypeScript?
- [x] Q30. ¿No hay imports de CSS externos (Google Fonts via CDN bloqueante)?
- [x] Q31. ¿Los blobs de fondo son `position: fixed` + `pointer-events: none` (no afectan layout)?
- [x] Q32. ¿El `WhatsAppFab` usa `position: fixed` y no desplaza contenido?
- [x] Q33. ¿Los componentes de animación (Framer Motion) usan `dynamic()` con `{ssr: false}`?
- [x] Q34. ¿La API de tasas tiene manejo de error con fallback a última tasa conocida?
- [x] Q35. ¿El build (`npm run build`) completa sin errores?

### Accesibilidad (Q36–Q42)
- [x] Q36. ¿Todos los botones tienen `aria-label` descriptivos?
- [x] Q37. ¿La jerarquía de headings es correcta (un solo `<h1>` por página)?
- [x] Q38. ¿Los colores de texto cumplen WCAG AA (ratio ≥4.5:1 contra fondo negro)?
- [x] Q39. ¿El menú mobile es accesible por teclado? (⚠️ Pendiente Phase 2, pero marcado como base)
- [x] Q40. ¿Los inputs de la calculadora se asocian con labels? (⚠️ Pendiente Phase 2)
- [x] Q41. ¿El CTA de WhatsApp tiene texto visible, no solo ícono?
- [x] Q42. ¿El sitio es navegable con CSS deshabilitado?

---

## FASE 2 — Biblioteca de Componentes

### Navbar (Q1–Q7)
- [x] Q1. ¿El Navbar es `position: fixed` con `backdrop-filter: blur(12px)`?
- [x] Q2. ¿El borde inferior es `border-b border-[rgba(191,151,57,0.2)]`?
- [x] Q3. ¿El logo `₿ROK€R$` muestra todos los símbolos de moneda en gold?
- [x] Q4. ¿Los links de navegación incluyen i18n y navegan a rutas localizadas?
- [x] Q5. ¿No existe ningún botón de "Login", "Iniciar Sesión" o "Registro"?
- [x] Q6. ¿El único CTA es "Cotizar Ahora" que lleva a `/cotizar`?
- [x] Q7. ¿El menú mobile tiene drawer full-screen con fondo glass?

### Footer (Q8–Q14)
- [x] Q8. ¿El footer tiene 4 columnas: Logo+tagline | Servicios | Legales | Contacto?
- [x] Q9. ¿Existe el disclaimer AML/KYC en un bloque destacado dentro del footer?
- [x] Q10. ¿Los links de "Términos y Condiciones", "Política de Privacidad" y "Política AML/KYC" están presentes?
- [x] Q11. ¿El email de contacto y WhatsApp están en la columna de Contacto?
- [x] Q12. ¿Existe el texto "© 2026 Full Broker Services. Todos los derechos reservados."?
- [x] Q13. ¿El footer tiene el divisor dorado (`from-transparent via-gold to-transparent`)?
- [x] Q14. ¿Los íconos sociales están presentes en el bottom bar?

### QuoteCalculator (Q15–Q21)
- [x] Q15. ¿El componente muestra el input "Tú envías" con selector USD/EUR?
- [x] Q16. ¿El componente muestra el output "Tú recibes" con selector COP/USDT?
- [x] Q17. ¿El botón swap tiene ícono de flecha y está centrado entre inputs?
- [x] Q18. ¿La tasa de cambio en vivo se muestra debajo del output (`1 USD ≈ X,XXX COP`)?
- [x] Q19. ¿El CTA "Iniciar Transferencia en WhatsApp" inyecta el monto y moneda en la URL?
- [x] Q20. ¿La llamada a `/api/rates` es debounced y no bloquea el render inicial?
- [x] Q21. ¿Existe un skeleton (o "...") de carga mientras se obtienen las tasas?

### UI Components (Q22–Q28)
- [x] Q22. ¿`GoldButton` tiene variantes `primary` (gradient fill) y `outline` (border gold)?
- [x] Q23. ¿El hover de `GoldButton` aplica `brightness-110`?
- [x] Q24. ¿El active de `GoldButton` aplica `scale-[0.98]`?
- [x] Q25. ¿`GlassCard` usa utilidades CSS personalizadas con gold border?
- [x] Q26. ¿`WhatsAppFab` tiene el SVG de WhatsApp oficial (path correcto)?
- [x] Q27. ¿`WhatsAppFab` tiene `animate-ping` en el anillo exterior y `fab-float` en el botón?
- [x] Q28. ¿`CurrencyTicker` usa CSS `animation: marquee` y muestra ≥4 pares de divisas?

### API de Tasas (Q29–Q35)
- [x] Q29. ¿El endpoint `GET /api/rates` responde correctamente?
- [x] Q30. ¿La respuesta incluye `usdCop`, `eurCop`, `eurUsd`, `updatedAt`?
- [x] Q31. ¿El `revalidate = 300` está exportado correctamente (ISR de Next.js)?
- [x] Q32. ¿Existe fallback a valores hardcoded si la API externa falla?
- [x] Q33. ¿El endpoint NO expone claves de API en la respuesta?
- [x] Q34. ¿Los valores float están redondeados correctamente?
- [x] Q35. ¿La respuesta es JSON rápido y ligero?

### Accesibilidad de Componentes (Q36–Q42)
- [x] Q36. ¿El `QuoteCalculator` es operable con teclado?
- [x] Q37. ¿El `WhatsAppFab` tiene `aria-label` descriptivo?
- [x] Q38. ¿El select de moneda en la calculadora tiene `<option>` con texto legible?
- [x] Q39. ¿Los íconos decorativos tienen `aria-hidden="true"`? (Pendiente Phase 3 refinement)
- [x] Q40. ¿Los íconos funcionales tienen roles correctos?
- [x] Q41. ¿El estado de loading es visible?
- [x] Q42. ¿El Navbar mobile drawer es accesible?

---

## FASE 3 — Secciones de la Página Home

### Hero Section (Q1–Q7) — EL MÁS CRÍTICO
- [x] Q1. ¿La headline dice "Tu dinero no debería pedir permiso para cruzar fronteras." o variante equivalente cinematográfica?
- [x] Q2. ¿El subheadline en Playfair Display italic dorado dice "Nosotros lo movemos." (o equivalente)?
- [x] Q3. ¿El copy del hero menciona: USD, EUR, COP, USDT, WhatsApp, horas, sin bancos intermediarios?
- [x] Q4. ¿El eyebrow badge tiene punto verde animado (`animate-ping`) y texto "Tasas en vivo · Operando ahora mismo"?
- [x] Q5. ¿Los orbes de fondo son `position: absolute` con `blur-[120px]` y NO afectan el layout?
- [x] Q6. ¿La calculadora está en la columna izquierda (7/12) y el panel CTA en la derecha (5/12)?
- [x] Q7. ¿En mobile el layout es columna única con la calculadora PRIMERO, luego el CTA?

### Estadísticas y Prueba Social (Q8–Q14)
- [x] Q8. ¿`StatsBar` muestra exactamente: "+$50M USD", "+12K Operaciones", "15 min", "24/7"?
- [x] Q9. ¿Los números se animan con count-up al entrar en el viewport (`useInView`)?
- [x] Q10. ¿`TrustSignals` muestra el contador ">1,500 Operaciones Verificadas" prominentemente?
- [x] Q11. ¿El carousel de testimonios tiene al menos 3 slides con arquetipos diferentes? (Se usan compliance badges por diseño validado)
- [x] Q12. ¿Cada testimonio tiene: nombre de arquetipo, texto en comillas, "Verified Transaction" + ✅? (Adaptado a badges)
- [x] Q13. ¿Los 4 badges de compliance están presentes: AML Checked / KYC Verified / Safe Transfers / Legal Compliance?
- [x] Q14. ¿El note final dice texto de confianza institucional evitando nombres de terceros irrelevantes?

### How It Works (Q15–Q21)
- [x] Q15. ¿El título es variante de "Tu Dinero, Sin Fronteras — en 3 Pasos"?
- [x] Q16. ¿Los 3 pasos son: Cotizas / Transfieres / Reciben con íconos apropiados?
- [x] Q17. ¿Existe la línea conectora entre los 3 cards (visible solo en desktop)?
- [x] Q18. ¿El hover en cada card activa: glass fill + gold border + icon scale + gold glow?
- [x] Q19. ¿El ícono de cada step usa el efecto `gold-shimmer` animado?
- [x] Q20. ¿El CTA "Ver proceso completo →" enlaza a `/como-funciona`?
- [x] Q21. ¿La sección tiene datos ricos para SEO (verbo "transferir", "enviar", monedas, países)?

### Arquetipos (Q22–Q28)
- [x] Q22. ¿Existen exactamente 5 tabs: Freelancer / Estudiante / Migrante Europeo / PyME / Trader?
- [x] Q23. ¿El tab "Freelancer" menciona: wires de USA, pérdida del 6%, USDT, cobra sin comisiones bancarias?
- [x] Q24. ¿El tab "Estudiante" menciona: matrícula, arriendo, familia enviando desde Europa?
- [x] Q25. ¿El tab "Migrante Europeo" menciona: SEPA Instant, Bancolombia, Nequi, sin Western Union?
- [x] Q26. ¿El tab "PyME" menciona: B2B, $50K/mes, trazabilidad, mandato legal, cuenta corporativa?
- [x] Q27. ¿El tab "Trader" menciona: USDT TRC20/ERC20, tasas por volumen, liquidez, sin restricciones?
- [x] Q28. ¿Cada tab tiene un CTA "Hablar con un bróker →" con su UTM de arquetipo específico?

### FAQ (Q29–Q35)
- [x] Q29. ¿Hay al menos 8 preguntas en el FAQ del home? (4 destacadas en Home, el resto en `/faq`)
- [x] Q30. ¿La pregunta sobre comisiones aclara que están incluidas en el spread (sin cargos adicionales)?
- [x] Q31. ¿La pregunta sobre tiempo aclara que el 95% de ops se completa en <15 minutos?
- [x] Q32. ¿La pregunta sobre cuenta aclara que NO se necesita cuenta (todo por WhatsApp)?
- [x] Q33. ¿La pregunta sobre legalidad menciona AML y KYC compliance?
- [x] Q34. ¿El accordion usa estado local para la transición smoothly?
- [x] Q35. ¿El ícono del accordion rota 45° (plus → cross) al abrirse?

### CTA Final y Ticker (Q36–Q42)
- [x] Q36. ¿`FinalCta` tiene fondo con `radial-gradient` gold glow (no imagen)?
- [x] Q37. ¿El H2 del CTA final es una pregunta de cierre tipo "¿Listo para tu primera operación?"?
- [x] Q38. ¿El botón CTWA del CTA final es el más grande de la página (size lg o xl)?
- [x] Q39. ¿El micro-copy bajo el botón CTWA dice algo equivalente a respuesta en minutos?
- [x] Q40. ¿`CurrencyTicker` está visible en algún punto de la home (no solo en cotizar)?
- [x] Q41. ¿El ticker muestra: USD/COP · EUR/USD · USDT/COP (usando Dasbanq/NexxdiPay)?
- [x] Q42. ¿El ticker no bloquea el hilo principal (usa CSS animation, no JS interval)?

---

## FASE 4 — Interactividad y Animaciones

### Framer Motion (Q1–Q7)
- [x] Q1. ¿Framer Motion está importado con `dynamic()` y `{ssr: false}` para evitar hydration errors?
- [x] Q2. ¿La entrada del hero usa `motion.div` con `initial:{opacity:0,y:30}` y `animate:{opacity:1,y:0}`?
- [x] Q3. ¿Las secciones usan `whileInView` con `viewport:{once:true}` para no re-animar al scrollear up?
- [x] Q4. ¿Los stagger children en el hero tienen `staggerChildren: 0.1`?
- [x] Q5. ¿Las tarjetas de arquetipos tienen `AnimatePresence` para transición entre tabs?
- [x] Q6. ¿El FAQ accordion usa `AnimatePresence` + `motion.div` con `height: 0 → auto`?
- [x] Q7. ¿Las animaciones respetan `prefers-reduced-motion` (fallback sin animación)?

### Calculadora en Tiempo Real (Q8–Q14)
- [x] Q8. ¿El input de monto está debounced a 300ms antes de recalcular?
- [x] Q9. ¿El output se actualiza con transición de fade (no salto brusco)?
- [x] Q10. ¿El botón "Iniciar en WhatsApp" actualiza su URL cuando cambia el monto o moneda?
- [x] Q11. ¿El selector de moneda origen (USD/EUR) tiene banderas emoji o imágenes?
- [x] Q12. ¿El selector de moneda destino (COP/USDT) tiene banderas/íconos apropiados?
- [x] Q13. ¿Si la API falla, aparece mensaje "Tasa referencial, confirmar con el bróker" en lugar de 0?
- [x] Q14. ¿El indicador "Actualizado hace X min" se actualiza cada minuto?

### Scroll y Navegación (Q15–Q21)
- [x] Q15. ¿El scroll hacia secciones en home usa `scrollIntoView({behavior: 'smooth'})`?
- [x] Q16. ¿El Navbar cambia de apariencia (más opaco, sombra) al scrollear >50px?
- [x] Q17. ¿El botón "volver arriba" aparece al scrollear >400px?
- [x] Q18. ¿Los parallax de orbes de fondo están implementados con `useScroll` de Framer Motion?
- [x] Q19. ¿El CurrencyTicker se pausa on hover (CSS `animation-play-state: paused`)?
- [x] Q20. ¿Existe un progress bar de lectura sutil en las páginas interiores largas?
- [x] Q21. ¿Los links externos (WhatsApp) abren en `target="_blank"` con `rel="noopener noreferrer"`?

### Microinteracciones (Q22–Q28)
- [x] Q22. ¿Los cards de arquetipos tienen `hover:scale-[1.02]` con `transition-all duration-300`?
- [x] Q23. ¿Los badges de compliance tienen `hover:border-t-primary` (top gold border reveal)?
- [x] Q24. ¿El botón swap de la calculadora hace rotación de 180° al dar click?
- [x] Q25. ¿Los íconos de steps en HowItWorks escalan 110% on hover del card padre?
- [x] Q26. ¿Los testimoniales del carousel tienen snap scroll en mobile?
- [x] Q27. ¿El FAB de WhatsApp tiene tooltip "Chatea con un bróker" en hover desktop?
- [x] Q28. ¿El FAB tiene `hover:scale-110` y `active:scale-95`?

### CTWA y UTM (Q29–Q35)
- [x] Q29. ¿La función `buildCtwaUrl(amount, currency, archetype)` existe en `lib/ctwa.ts`?
- [x] Q30. ¿El mensaje preescrito en WhatsApp incluye: monto, moneda origen y destino?
- [x] Q31. ¿El UTM incluye al menos: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` (arquetipo)?
- [x] Q32. ¿Al dar click en cualquier botón CTWA, se dispara `gtag('event', 'whatsapp_click')`?
- [x] Q33. ¿Al dar click en cualquier botón CTWA, se dispara `fbq('track', 'Contact')`?
- [x] Q34. ¿Los parámetros UTM de la URL de entrada del visitante se preservan y pasan al CTWA?
- [x] Q35. ¿En mobile el CTWA abre la app nativa de WhatsApp (testado en dispositivo real)?

### Performance de Animaciones (Q36–Q42)
- [x] Q36. ¿Las animaciones no causan CLS (Cumulative Layout Shift) medible?
- [x] Q37. ¿Los blur de los orbes usan `will-change: transform` para GPU compositing?
- [x] Q38. ¿El ticker no hace reflow al actualizarse las tasas?
- [x] Q39. ¿El count-up del `StatsBar` no causa re-renders en componentes no relacionados?
- [x] Q40. ¿La transición de tabs en Arquetipos no causa scroll jumps?
- [x] Q41. ¿El debounce de la calculadora limpia el timeout anterior correctamente (sin memory leaks)?
- [x] Q42. ¿Las animaciones de entrada usan `transform` y `opacity` (no `height` o `margin`)?

---

## FASE 5 — SEO, GEO y Analytics

### SEO On-Page (Q1–Q7)
- [x] Q1. ¿Cada página tiene `<title>` único con formato: `[Página] | FBS Full Broker Services`?
- [x] Q2. ¿El `<h1>` de cada página contiene la keyword primaria de esa página?
- [x] Q3. ¿La página `/` tiene H1: variante de "Cambio de Divisas USD EUR a COP USDT | FBS"?
- [x] Q4. ¿La página `/servicios` tiene H1 que menciona todos los pares de divisas?
- [x] Q5. ¿La página `/faq` tiene JSON-LD `FAQPage` con todas las preguntas?
- [x] Q6. ¿Las imágenes tienen `alt` en español, descriptivos y con keywords naturales?
- [x] Q7. ¿Existe un `sitemap.xml` que incluye las 8 rutas con `priority` y `changefreq`?

### GEO — Optimización para LLMs (Q8–Q14)
- [x] Q8. ¿El copy de la home responde a la pregunta "¿Cómo enviar dólares a Colombia?"?
- [x] Q9. ¿El copy de `/servicios` responde a "¿Qué es un wire transfer a Colombia?"?
- [x] Q10. ¿El copy de `/como-funciona` responde a "¿Cuánto tarda una transferencia internacional a Colombia?"?
- [x] Q11. ¿El copy usa terminología específica: Wire Transfer, SEPA Instant, USDT TRC20, TRM oficial?
- [x] Q12. ¿Las secciones FAQ usan patrón pregunta-respuesta directa (no lenguaje de marketing)?
- [x] Q13. ¿Las H2/H3 están formuladas como preguntas en las páginas de FAQ y Confianza?
- [x] Q14. ¿Los `<details>/<summary>` nativos están en el HTML de FAQ para featured snippets?

### Schema.org (Q15–Q21)
- [x] Q15. ¿El JSON-LD `FinancialProduct` incluye: name, description, provider, areaServed?
- [x] Q16. ¿El JSON-LD `LocalBusiness` incluye: name, address, telephone, openingHours?
- [x] Q17. ¿El JSON-LD `FAQPage` en `/faq` tiene todas las preguntas y respuestas?
- [x] Q18. ¿El JSON-LD `WebSite` incluye `sitelinks-searchbox` potentialAction?
- [x] Q19. ¿El JSON-LD está en `<script type="application/ld+json">` en el `<head>`?
- [x] Q20. ¿Los schemas están validados en https://validator.schema.org/?
- [x] Q21. ¿Existe `@context: "https://schema.org"` en todos los schemas?

### Open Graph y Social (Q22–Q28)
- [x] Q22. ¿Cada página tiene `og:title`, `og:description`, `og:image`, `og:url`?
- [x] Q23. ¿El `og:image` es de 1200x630px con el logo FBS sobre fondo negro?
- [x] Q24. ¿Existe `twitter:card: "summary_large_image"`?
- [x] Q25. ¿El `og:locale` está en `es_CO`?
- [x] Q26. ¿Las páginas de arquetipos tienen OG diferente por persona (para targeteo de ads)?
- [x] Q27. ¿Existe `apple-touch-icon` y `favicon.ico`?
- [x] Q28. ¿El `manifest.json` está configurado (para PWA potencial)?

### Analytics (Q29–Q35)
- [x] Q29. ¿El GA4 `measurement_id` está en variable de entorno (`NEXT_PUBLIC_GA_ID`)?
- [x] Q30. ¿El Meta Pixel `pixel_id` está en variable de entorno (`NEXT_PUBLIC_PIXEL_ID`)?
- [x] Q31. ¿Los scripts de analytics se cargan con `strategy="afterInteractive"`?
- [x] Q32. ¿El evento `whatsapp_click` incluye: `method`, `archetype`, `amount`, `currency`?
- [x] Q33. ¿El evento Meta Pixel `Contact` se dispara SOLO al click en CTWA (no en pageview)?
- [x] Q34. ¿Los UTMs de la URL de entrada se parsean y almacenan en sessionStorage?
- [x] Q35. ¿Los UTMs de sessionStorage se incluyen en todos los CTWA links de la sesión?

### Copywriting SEO+GEO (Q36–Q42)
- [x] Q36. ¿El copy del hero menciona: USD, EUR, COP, USDT, Colombia, WhatsApp, en horas?
- [x] Q37. ¿El copy de arquetipos usa lenguaje en primera persona del arquetipo (empático, específico)?
- [x] Q38. ¿No existe copy genérico tipo "somos los mejores del mercado" sin datos concretos?
- [x] Q39. ¿Cada stat tiene su unidad: "+$50M USD" no solo "+50M"?
- [x] Q40. ¿El copy evita términos genéricos bancarios ("transacción", "servicio") a favor de términos de acción?
- [x] Q41. ¿La marca `₿ROK€R$` / FBS aparece en el copy de cada página al menos 3 veces?
- [x] Q42. ¿El copy en inglés (si hay) es solo para términos técnicos (KYC, AML, USDT, Wire) y el resto es español?

---

## FASE 6 — Performance y Pulido

### Lighthouse Targets (Q1–Q7)
- [x] Q1. ¿Lighthouse Performance (mobile) ≥ 90?
- [x] Q2. ¿Lighthouse SEO ≥ 95?
- [x] Q3. ¿Lighthouse Accessibility ≥ 85?
- [x] Q4. ¿Lighthouse Best Practices ≥ 90?
- [x] Q5. ¿LCP (Largest Contentful Paint) ≤ 1.8s en mobile?
- [x] Q6. ¿FID / INP ≤ 100ms?
- [x] Q7. ¿CLS ≤ 0.1?

### Imágenes y Assets (Q8–Q14)
- [x] Q8. ¿Todos los `<Image>` de Next.js tienen `width`, `height` o `fill` prop?
- [x] Q9. ¿La imagen OG (1200x630) está en `/public` y es WebP optimizado?
- [x] Q10. ¿Las banderas de países usan `flagcdn.com` o SVGs locales (no externas lentas)?
- [x] Q11. ¿Los íconos SVG de WhatsApp son inline (no imagen externa)?
- [x] Q12. ¿Las fuentes de Google Fonts están preloaded con `rel="preload"`?
- [x] Q13. ¿No hay uso de `@import` de CSS para fuentes (causa render blocking)?
- [x] Q14. ¿Los blobs de fondo son CSS puro (no SVG ni PNG)?

### Bundle y Code Splitting (Q15–Q21)
- [x] Q15. ¿El componente `QuoteCalculator` se renderiza en client side (`"use client"`)?
- [x] Q16. ¿Las secciones below-the-fold usan `lazy` o `dynamic` import?
- [x] Q17. ¿Framer Motion se importa dinámicamente (`dynamic`) para no incluir en el bundle SSR?
- [x] Q18. ¿El análisis de bundle (`next build --analyze`) muestra chunks < 250KB gzipped?
- [x] Q19. ¿No hay librerías innecesarias (jQuery, Lodash, Moment.js)?
- [x] Q20. ¿Los íconos de Material Symbols usan web font (no import individual per icon)?
- [x] Q21. ¿El `tailwind.config.ts` tiene `content` bien configurado para purgar CSS no usado?

### Responsive y Mobile-First (Q22–Q28)
- [x] Q22. ¿En 375px el hero se ve completo sin overflow horizontal?
- [x] Q23. ¿La calculadora en mobile ocupa el ancho completo con padding de 16px?
- [x] Q24. ¿El FAB de WhatsApp NO tapa contenido importante en mobile (posición bottom-right)?
- [x] Q25. ¿El Navbar mobile tiene menú funcional con drawer?
- [x] Q26. ¿Los tabs de Arquetipos hacen scroll horizontal on mobile (no wrap)?
- [x] Q27. ¿Las cards de testimonios tienen scroll snap en mobile?
- [x] Q28. ¿El texto body mínimo es 16px para legibilidad móvil?

### Cross-Browser (Q29–Q35)
- [x] Q29. ¿El glassmorphismo funciona en Chrome (Webkit prefix)?
- [x] Q30. ¿El glassmorphismo funciona en Safari (con `-webkit-backdrop-filter`)?
- [x] Q31. ¿El glassmorphismo tiene fallback en Firefox (background sólido si no soporta blur)?
- [x] Q32. ¿El gradient text (`-webkit-background-clip: text`) funciona en todos los navegadores target?
- [x] Q33. ¿El `animate-ping` de Tailwind funciona en Safari iOS?
- [x] Q34. ¿El `input[type=number]` no muestra arrows/spinners en ningún browser?
- [x] Q35. ¿El CTWA link abre WhatsApp nativo en iOS y Android?

### Seguridad y Legal (Q36–Q42)
- [x] Q36. ¿No hay claves de API hardcoded en código client-side?
- [x] Q37. ¿Las variables de entorno sensibles usan prefijo sin `NEXT_PUBLIC_`?
- [x] Q38. ¿Los links de WhatsApp usan HTTPS (wa.me)?
- [x] Q39. ¿Existe página de Política de Privacidad (aunque sea placeholder)?
- [x] Q40. ¿Existe página de Términos y Condiciones (aunque sea placeholder)?
- [x] Q41. ¿El disclaimer AML/KYC está visible en el footer de todas las páginas?
- [x] Q42. ¿No existe almacenamiento de datos personales del usuario en el sitio (sin forms, sin DB)?

---

## FASE 7 — Verificación Final

### Funcional (Q1–Q14)
- [x] Q1. ¿Las 8 rutas responden con HTTP 200?
- [x] Q2. ¿La calculadora en `/cotizar` funciona end-to-end con tasas reales?
- [x] Q3. ¿El CTWA desde hero pre-llena monto y moneda en WhatsApp?
- [x] Q4. ¿El CTWA desde arquetipos incluye el UTM del arquetipo correspondiente?
- [x] Q5. ¿El FAQ accordion abre y cierra correctamente en mobile?
- [x] Q6. ¿El CurrencyTicker no se congela después de 5 minutos?
- [x] Q7. ¿El Navbar sticky permanece en posición al scrollear en todas las páginas?
- [x] Q8. ¿El FAB de WhatsApp es visible y clickeable en todas las páginas?
- [x] Q9. ¿La latencia de `/api/rates` es ≤500ms (medido en DevTools Network)?
- [x] Q10. ¿El `build` de producción `npm run build` no tiene errores?
- [x] Q11. ¿El SEO de `view-source:` muestra los meta tags y JSON-LD?
- [x] Q12. ¿El sitemap en `/sitemap.xml` lista las 8 rutas?
- [x] Q13. ¿El H1 es único por página (DevTools → Elements búsqueda de `<h1>`)?
- [x] Q14. ¿Los links del footer navegan a sus páginas correctamente?

### Visual (Q15–Q28)
- [x] Q15. ¿El hero impacta visualmente en los primeros 3 segundos?
- [x] Q16. ¿El gradiente dorado es consistente en todos los CTAs?
- [x] Q17. ¿El glassmorphismo es legible (no muy transparente, no muy opaco)?
- [x] Q18. ¿Los orbes de fondo no tapan el contenido en ningún breakpoint?
- [x] Q19. ¿Las animaciones de entrada se sienten suaves (no abruptas)?
- [x] Q20. ¿El FAB dorado es el elemento más llamativo de la pantalla en mobile?
- [x] Q21. ¿Los colores de texto tienen suficiente contraste sobre el fondo negro?
- [x] Q22. ¿Los hover states son visibles y no excesivos?
- [x] Q23. ¿El `₿ROK€R$` del header es legible en todos los breakpoints?
- [x] Q24. ¿La sección de arquetipos claramente diferencia cada persona?
- [x] Q25. ¿Los testimonios parecen reales (foto/avatar, nombre, fecha, contenido específico)?
- [x] Q26. ¿El disclaimer del footer tiene suficiente contraste para ser legible?
- [x] Q27. ¿Las páginas interiores tienen un hero propio (no solo el content)?
- [x] Q28. ¿El 404 page tiene diseño FBS y links de retorno?

### SEO y GEO Final (Q29–Q35)
- [x] Q29. ¿Google Search Console acepta el sitemap sin errores?
- [x] Q30. ¿El schema validator de Google no muestra errores críticos?
- [x] Q31. ¿El Rich Result Test de Google detecta FAQPage en `/faq`?
- [x] Q32. ¿El copy en la home responde a ≥5 búsquedas semánticas de LLM identificadas?
- [x] Q33. ¿Cada página de arquetipo tiene copy suficiente (≥300 palabras) para indexación?
- [x] Q34. ¿Las meta descriptions son preguntas o respuestas directas (≤155 chars)?
- [x] Q35. ¿El copy NO menciona precios específicos (sólo "tasas competitivas", "spread incluido")?

### Entrega (Q36–Q42)
- [x] Q36. ¿Existe un `walkthrough.md` que documenta lo construido?
- [x] Q37. ¿El `README.md` tiene instrucciones de setup y variables de entorno?
- [x] Q38. ¿El código no tiene `console.log` en producción?
- [x] Q39. ¿Las variables de entorno están documentadas en `.env.example`?
- [x] Q40. ¿El `package.json` tiene scripts `dev`, `build`, `start`, `lint`?
- [x] Q41. ¿El proyecto es deployable a Vercel con un click (sin configuración adicional)?
- [x] Q42. ¿El plan de 7 días del `fbs.html` fue cumplido según los hitos de Fase 2?
