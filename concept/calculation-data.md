# 📚 FULL BROKERS SERVICES - Documentación del Sistema

## 🎯 Resumen Ejecutivo

Full Brokers Services es un sistema automatizado de monitoreo de tasas de cambio para servicios de transferencias internacionales y conversión de criptomonedas. El sistema extrae precios en tiempo real de múltiples brokers y calcula automáticamente los precios finales para clientes.

---

## 🏗️ Arquitectura del Sistema

### Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTENSIÓN CHROME                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ NexxdiPay   │  │  LoopayX    │  │  Dasbanq    │         │
│  │ USDT→COP   │  │  USDT→COP   │  │  EUR/MXN    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          ▼                                  │
│                   ┌─────────────┐                          │
│                   │ background  │                          │
│                   │   .js       │                          │
│                   └──────┬──────┘                          │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼ (inyección localStorage)
┌──────────────────────────────────────────────────────────────┐
│                      WEB APPS                                │
│  ┌────────────────────────┐  ┌─────────────────────────┐    │
│  │  fullbrokers-app.html  │  │ fullbrokers-redes.html  │    │
│  │  (Dashboard completo)  │  │ (Streaming/TikTok)      │    │
│  └────────────────────────┘  └─────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## 💰 Fuentes de Datos

### 1. NexxdiPay
- **Qué extrae:** Tasa USDT → COP (Pesos Colombianos)
- **URL:** https://app.nexxdipay.com/
- **Frecuencia:** Cada 5 segundos
- **Uso:** Precio de referencia para Colombia

### 2. LoopayX
- **Qué extrae:** Tasa USDT → COP (Pesos Colombianos)
- **URL:** https://app.loopayx.com/
- **Frecuencia:** Cada 5 segundos
- **Uso:** Precio de referencia alternativo para Colombia

### 3. Dasbanq
- **Qué extrae:** 
  - EUR: Compra y Venta (base USD)
  - MXN: Compra y Venta (base USD)
- **URL:** https://www.dasbanq.com/es/dashboard
- **Frecuencia:** Cada 5 segundos
- **Uso:** Tasas internacionales para Europa y México

---

## 🧮 Cálculo de Precios

### Colombia (USDT → COP)

```
PRECIO FINAL = MAX(NexxdiPay, LoopayX) - Spread

Ejemplo:
- NexxdiPay: $3,640 COP
- LoopayX: $3,650 COP
- Spread configurado: $12 COP

Precio Final = MAX(3640, 3650) - 12 = $3,638 COP
```

**Lógica:**
1. Se toma el precio MÁS ALTO entre NexxdiPay y LoopayX
2. Se resta el spread (ganancia del broker)
3. Si un broker está offline (precio = 0), se usa solo el otro

### Tasas Internacionales (Dasbanq)

Las tasas de EUR y MXN se muestran directamente como las provee Dasbanq:
- **Venta (Entrada):** El cliente vende USD, recibe EUR/MXN
- **Compra (Salida):** El cliente compra USD, paga EUR/MXN

---

## 💵 Estructura de Comisiones

### Colombia - Retiro a Bancos (via ACH)

| Monto | Comisión |
|-------|----------|
| $1K - $5K USD | 0.2% + $2,000 COP |
| > $5K USD | $2,400 COP (fijo) |

### Internacional - Comisiones por Monto

| Monto | Comisión |
|-------|----------|
| $100 - $1,000 USD | 2% |
| $1,000 - $3,000 USD | 1.5% |
| > $3,000 USD | Consultar WhatsApp |

### Fees Fijos por Riel

| Destino | Fee |
|---------|-----|
| 🇪🇺 SEPA (Europa) | $2 USD |
| 🇲🇽 SPEI (México) | $2 USD |
| 🇺🇸 ACH (USA) | $5 USD |
| 🇺🇸 Wire (USA) | $25 USD |
| ₮ Crypto (USDT/USDC) | 0.5% |

---

## 🖥️ Herramientas Disponibles

### 1. fullbrokers-app.html (Dashboard Principal)

**Ubicación:** `file:///C:/Users/sopor/Downloads/fullbrokers-app.html`

**Pestañas:**

#### 💰 Full Brokers (Tab principal)
- Muestra precio Colombia con comisiones
- Tabla de tasas internacionales (EUR/MXN)
- Tabla de comisiones por monto
- Tabla de fees por riel

#### 📊 Precios (Tab técnico)
- Detalle de cada broker (NexxdiPay, LoopayX, Dasbanq)
- Precio broker vs Tu precio
- Estado LIVE/OFFLINE de cada fuente

#### ⚙️ Config (Tab configuración)
- Spread Colombia
- Comisiones por monto ($1K-$5K, >$5K)
- Comisiones internacionales (tier1, tier2)
- Fees por riel (SEPA, SPEI, ACH, Wire, Crypto)

**Botones:**
- 📋 WhatsApp: Copia mensaje formateado para enviar a clientes
- 📺 Redes: Abre la página de streaming

---

### 2. fullbrokers-redes.html (Streaming/TikTok Live)

**Ubicación:** `file:///C:/Users/sopor/Downloads/fullbrokers-redes.html`

**Propósito:** Página optimizada para mostrar en transmisiones en vivo (TikTok, etc.)

**Características:**
- Fondo negro puro (#000)
- Textos grandes y legibles
- Precio Colombia GIGANTE
- Actualización automática en tiempo real
- Banderas como imágenes (no emojis)
- Hora en vivo

**Contenido visible:**
- 🇨🇴 Colombia: Precio USDT → COP
- Comisiones Colombia ($1K-$5K y >$5K)
- 📈 Tasas Internacionales (EUR/MXN)
- 🏦 Fees de Retiro
- 💰 Comisiones por Monto

---

## 🔧 Extensión Chrome

### Funcionalidades

1. **Extracción automática** de precios cada 5 segundos
2. **Detección de broker offline** (cuando muestra $0)
3. **Inyección de datos** a las web apps via localStorage
4. **Botón Actualizar** para forzar extracción
5. **Botón Copiar WhatsApp** para compartir precios

### Estados de Broker

| Estado | Significado |
|--------|-------------|
| 🟢 LIVE | Broker activo, precio válido |
| 🔴 OFFLINE | Broker muestra $0 o no responde |

---

## 📱 Mensaje WhatsApp (Formato)

```
💰 FULL BROKERS SERVICES 💰
━━━━━━━━━━━━━━━━━━
🇨🇴 COLOMBIA
💵 1 USDT = $3,638 COP 
Mínimo 1k de USDT
📤 Comisión retiro a bancos (via ACH):
   $1K-$5K: 0.2% + $2.000
   >$5K: $2.400
📈 TASAS INTERNACIONALES Venta|Compra de USD
🇪🇺 EUR: 0.847 | 0.839
🇲🇽 MXN: 17.28 | 17.11
🇺🇸 USA ACH y Wire
💰 COMISIONES RETIRO INTERNACIONALES
📊 $100-$1K: 2%
📊 $1K-$3K: 1.5%
📊 >$3K: Consultar
🏦 Fees Fijos por Riel
🇪🇺 SEPA $2
🇲🇽 SPEI $2
🇺🇸 ACH $5
🇺🇸 Wire $25
₮ Crypto 0.5%
⏰ 10:30 a.m.
━━━━━━━━━━━━━━━━━━
📋Titular que envía debe estar registrado en https://fullbrokersservices.app/
📌 Las tasas son referenciales y pueden variar según mercado, monto y disponibilidad.
```

---

## ❓ Preguntas Frecuentes para el Agente IA

### ¿Por qué el precio Colombia es X y no Y?

El precio se calcula así:
1. Se toma el MÁS ALTO entre NexxdiPay y LoopayX
2. Se resta el spread configurado (default: $12 COP)
3. Ejemplo: Si NexxdiPay=3640 y LoopayX=3650, precio = 3650 - 12 = $3,638

### ¿Qué pasa si un broker está offline?

- Si NexxdiPay está offline → Se usa solo LoopayX
- Si LoopayX está offline → Se usa solo NexxdiPay
- Si ambos están offline → Muestra "--" (sin datos)

### ¿Cada cuánto se actualizan los precios?

Cada 5 segundos automáticamente mientras las pestañas de los brokers estén abiertas.

### ¿Por qué las comisiones de Colombia cambian según el monto?

- Montos pequeños ($1K-$5K): Cobro porcentual (0.2%) + fee fijo ($2,000)
- Montos grandes (>$5K): Solo fee fijo ($2,400) porque el porcentaje sería muy alto

### ¿Qué significa Venta|Compra en las tasas internacionales?

- **Venta:** El cliente vende USD y recibe la otra moneda
- **Compra:** El cliente compra USD pagando con la otra moneda

### ¿Por qué hay diferentes fees por riel?

Cada sistema de transferencia tiene costos diferentes:
- SEPA/SPEI son económicos ($2)
- ACH es intermedio ($5)
- Wire es caro pero rápido ($25)
- Crypto es porcentual (0.5%)

---

## 🛠️ Configuración Actual (Valores Default)

```javascript
{
  colombia: {
    spread: 12,           // COP a restar del precio
    dispPct: 0.2,         // % comisión $1K-$5K
    dispFijo: 2000,       // COP fijo $1K-$5K
    dispFijoAlto: 2400    // COP fijo >$5K
  },
  tiers: {
    tier1: 2,             // % para $100-$1K
    tier2: 1.5            // % para $1K-$3K
  },
  fees: {
    sepa: 2,              // USD
    spei: 2,              // USD
    ach: 5,               // USD
    wire: 25,             // USD
    crypto: 0.5           // %
  }
}
```

---

## 📝 Notas Importantes

1. **Requisito:** El titular que envía debe estar registrado en https://fullbrokersservices.app/
2. **Disclaimer:** Las tasas son referenciales y pueden variar según mercado, monto y disponibilidad
3. **Mínimo Colombia:** 1,000 USDT
4. **Montos >$3K internacional:** Requiere consulta por WhatsApp para negociar comisión

---

*Documento generado para Full Brokers Services - Sistema de Monitoreo de Tasas*
