# PRD: Python Rate Harvester (PRH) — Full Production Spec

## 🎯 Objetivo
Hacer la transición del sistema de extracción de tasas de una **Extensión de Chrome** (local) a un **Worker de Python** (servidor, autónomo y 24/7) que alimente una base de datos **Supabase** centralizada.

---

## 🏗️ Requisitos Técnicos

### 1. Fuentes de Extracción (Scraping & Auth)
El worker extraerá datos cada **1 minuto** manejando **TOTP (Google Authenticator)**. Se extraerá toda la información disponible (tasas, balances, límites).

| Fuente | URL Objetivo | Datos a Extraer | Autenticación |
| :--- | :--- | :--- | :--- |
| **NexxdiPay** | `nexxdipay.com/admin/exchange` | USD → COP, **Balance Cuenta**, Límites | User, Pass + TOTP |
| **LoopayX** | `app.loopayx.com` | USD → COP, **Balance USDT**, Status | User, Pass + TOTP |
| **Dasbanq** | `dasbanq.com/es/dashboard` | EUR/MXN (Buy/Sell), **Saldos por moneda** | User, Pass + TOTP |

### 2. Lógica de Cálculo (Math Engine)
- **Frecuencia:** Cada 1 minuto.
- **Precio Colombia:** `Precio Final = MAX(NexxdiPay, LoopayX) - Spread`.
- **Validación:** Ignorar tasas fuera de rango (3000-5000 COP).
- **Stale Data:** Marcar como "Stale" si no hay actualización en 5 min.

### 3. Arquitectura de Base de Datos (Supabase)
Se crearán las siguientes tablas en el esquema `public`:

- **`broker_rates`**: Tasas crudas extraídas de cada proveedor.
- **`broker_balances`**: Balances y límites disponibles en cada broker (para gestión de liquidez).
- **`live_rates`**: Tasa final calculada (USDT/COP) para consumo de la App.
- **`rate_history`**: Histórico auditado de todas las variaciones.
- **`worker_health`**: Heartbeat y logs de errores del worker.

### 4. Seguridad & CI/CD
- **Variables de Entorno:** Credenciales en `.env`.
- **RBAC:** Políticas RLS para que el `service_role` escriba y `anon` solo lea tasas públicas.

---

## 🛤️ Roadmap de Diseño
1. **Paso 1:** Definición y ejecución de Migraciones SQL en Supabase.
2. **Paso 2:** Desarrollo de Scrapers (Playwright + PyOTP).
3. **Paso 3:** Sincronización y lógica de agregación.
