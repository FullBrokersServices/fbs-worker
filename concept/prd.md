# 🚀 Product Requirements Document (PRD)
## Full Broker Services (FBS) - Conversion & Marketing Landing Page

**Status:** Active
**Version:** 1.0.0
**Execution Timeline:** 7 Days

---

### 1. 🎯 Objetivos y Naturaleza del Producto
La Landing Page de **Full Broker Services (FBS)** no es una plataforma web bancaria tradicional ni transaccional per se. Su única y exclusiva misión es funcionar como el **embudo final de marketing** para capturar tráfico pago y orgánico, generar confianza absoluta y convertir esa intención en **Click-to-WhatsApp (CTWA)**.

*   **Pasillo Meta:** USD (Wire) / EUR (SEPA) ➔ COP / USDT.
*   **KPI Principal:** ≥ 15% de conversión de Visitante a Inicio de Conversación en WhatsApp.
*   **Velocidad de carga:** LCP ≤ 1.8s (Toda fricción visual cuesta leads).

---

### 2. 🎨 Identidad Visual y Branding (Strict Compliance)
La página debe reflejar exclusividad, formalidad financiera y fluidez crypto basándose en los lineamientos del Brandbook (`brand.jpg`, `brand-01.jpg`, `branding .pdf`).

#### 2.1 Paleta de Colores
La interfaz debe ceñirse rigurosamente a la siguiente estructura visual:
*   **Fondo/Base:** `#000000` (Negro absoluto, denota lujo y exclusividad).
*   **Acentos y Gradientes Dorados (Premium):**
    *   `#BF9739` (Dorado Profundo)
    *   `#CFAB42` (Dorado Medio)
    *   `#E2C762` (Dorado Claro / Iluminación)
*   **Contraste:** Uso de espacios negativos y blancos puros (`#FFFFFF`) para textos legibles o tarjetas platino (`rgba(255,255,255, 0.05)`).

#### 2.2 Tratamiento de Logo e Iconografía
El logotipo entrelaza "FB" e incluye símbolos monetarios intrínsecos que deben ser la piedra angular de toda la narrativa visual:
*   **B:** Símbolo de Bitcoin (₿) en "BROK€R$"
*   **E:** Símbolo de Euro (€) en "BROK€R$"
*   **S:** Símbolo de Dólar ($) en "BROK€R$"
*   *Nota de Uso Permitido:* Se debe respetar la composición horizontal del logo oscuro sobre fondos transparentes/claros, y su versión dorada sobre fondos oscuros (Black `#000000`). Se prohíben alteraciones de proporciones, colores pálidos, u opacidades que resten fuerza al "Dorado/Negro".

---

### 3. 🧠 Arquitectura de la Información (UX/Marketing)
Estructura *one-page* optimizada para lectura vertical rápida en teléfonos móviles (Mobile-First 80%+ traffic).

#### Sección 1: Hero Section (Captura Inmediata)
*   **Copy Principal:** *"Envía USD y EUR. Tu familia, empleados o proveedores reciben USDT o Pesos Colombianos hoy mismo."*
*   **El Gancho (Widget): Calculadora de Tasa (UI Seamless).**
    *   Input: "Envías" (USD / EUR)
    *   Output: "Reciben" (COP / USDT)
    *   La calculadora filtra la lógica detrás de cámaras (Dasbanq para EUR/USD, NexxdiPay/LoopayX para COP, deduciendo fees de SEPA/Wire/ACH/Crypto). El usuario solo ve el resultado final exacto sin fricción.
*   **CTA Principal:** Un botón imponente y adherente (Golden Gradient `#BF9739` a `#E2C762`): **"📈 Iniciar Transferencia en WhatsApp"**.
    *   *Link CTWA de ejemplo:* `https://wa.me/1234567890?text=Hola,%20quiero%20cotiar%20un%20envío%20de%20[MONEDA]` (Se inyectará un UTM dinámico según la fuente).

#### Sección 2: How it Works (3 Pasos de Cero Fricción)
Simplificar visualmente el proceso:
1.  **Cotizas 📱:** Dime por WhatsApp cuánto deseas enviar.
2.  **Transfieres 🏦:** Envías el Wire/SEPA siguiendo nuestras instrucciones.
3.  **Reciben 💸:** Validamos comprobante y dispersamos los USDT/COP en cuestión de horas.

#### Sección 3: Trust Signals & Social Proof (Rompiendo el Escepticismo)
*   Contador dinámico: "+X.XXX Operaciones Completadas".
*   Testimonios anclados a Arquetipos: ("El freelancer", "El estudiante", "La PYME").
*   Insignias de Compliance: *AML Checked*, *KYC Verificado*, *Transferencias Formales con Mandato Legal*.

#### Sección 4: FAQ Dinamizado
Preguntas clave enfocadas en objeciones que el usuario tiene antes de escribir por WhatsApp:
*   ¿Cuánto demoran en enviar los USDT?
*   ¿Están ocultas las comisiones?
*   ¿Necesito abrir una cuenta en su plataforma? (Respuesta: *No, todo se gestiona en WhatsApp por tu comodidad*).

---

### 4. 📣 Batería de Comunicaciones (Marketing & Tráfico)

#### 4.1 Tracking y Atribución
Para medir el ROI del plan de medios (Fase Marketing a ejecutar el Día 4 del Maestro), el desarrollo incluye:
*   **Meta Pixel & Conversions API:** Evento `Lead` o `Contact` debe dispararse *exclusivamente* cuando se hace clic hacia el ecosistema CTWA de WhatsApp.
*   **Google Analytics 4:** Seguimiento de funnels, tasa de rebote en móvil y scroll-depth.
*   **UTM a WhatsApp:** La URL del CTA atrapará UTMs de campañas de Ads. Así el bot en Respond.io / BSP sabrá si el usuario viene del "Ad para Freelancers en Miami" o "Ad para Migrantes en Madrid".

#### 4.2 Ángulos de Campaña por Arquetipo
(Textos apoyados desde el diseño de la web y que sincronizan con el bot WhatsApp)
*   **Freelancers Internacionales:** "No pierdas 6% del wire de tu cliente. Te lo convertimos directo a USDT o COP sin tocar bancos tradicionales."
*   **Migrantes Europeos (SEPA):** "Manda Euros a tu familia por SEPA Instant. Sin Western Union, sin filas, directo a su cuenta Bancolombia o Nequi."
*   **PyMES y Arbitradores:** "Límites amplios ($3K/operación), trazabilidad total y automatización B2B."

---

### 5. 🛠 Criterios de Aceptación Técnicos (Definition of Done)
1.  **Fidelidad Visual:** Cumple 100% las restricciones del Brandbook. Hexágonos precisos de dorado y negro absoluto. Emblemas cripto (BTC, EUR, USD) legibles en *Dark Mode*.
2.  **Velocidad:** Las Web Vitals de Google (Lighthouse) marcan ≥ 90 en Performance móvil.
3.  **Calculadora Latency:** Consultar las APIs de cambio demora ≤ 500ms y no bloquea el render de la web.
4.  **CTWA Funcional:** Al tocar el botón en móvil abre la app nativa de WhatsApp; en Desktop abre WhatsApp Web, con texto pre-llenado y *tags* invisibles de origen correctamente añadidos.
5.  **SEO:** Contiene el H1 correcto, Schema.org orgánico (*FinancialProduct*, *LocalBusiness*).
6.  **Alineación Estratégica:** Cumple los hitos de la **Fase 2 de los 7 Días** definidos en `fbs.html`.
