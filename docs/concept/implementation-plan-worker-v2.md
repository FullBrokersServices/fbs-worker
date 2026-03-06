# Plan de Implementación: Python Rate Harvester (PRH) v2.0
> **Objetivo**: Transición completa a worker autónomo con 100% de paridad y gobernanza de datos en Supabase.

---

## 📅 Roadmap de Fases

### Fase 1: Infraestructura y Gobernanza (Día 1)
**Foco**: Establecer el "Ground Truth" de la base de datos y el entorno.
- **[ ]** Ejecutar `migrations/20260305_init_harvester.sql` en Supabase.
- **[ ]** Configurar el entorno de Python 3.11 con `playwright` y `pyotp`.
- **[ ]** Definir el archivo `.env` con los secretos de brokers y Supabase.
- **[ ]** Implementar el `HealthCheck` básico del worker.

### Fase 2: Motores de Extracción (Día 2-3)
**Foco**: Scrapers robustos con manejo de TOTP y balances.
- **[ ]** **NexxdiPay Engine**: Incluyendo la lógica de "Editar monto" y regex corregido.
- **[ ]** **LoopayX Engine**: Detección de $0 y estatus Offline.
- **[ ]** **Dasbanq Engine**: Extracción de 4 variables (EUR/MXN Buy/Sell).
- **[ ]** Implementar la extracción de **Balances y Límites** para gestión de liquidez.

### Fase 3: Engine Matemático y Sincronización (Día 4)
**Foco**: Transformación de datos y persistencia.
- **[ ]** Implementar la lógica `MAX(NexxdiPay, LoopayX) - Spread`.
- **[ ]** Manejo de "Stale Data": Si no hay datos hace >5 min, alertar en `worker_health`.
- **[ ]** Sincronización periódica (cada 1 min) hacia Supabase.
- **[ ]** Pruebas de integración: Verificar que los datos de la DB coincidan con los brokers.

### Fase 4: Despliegue y Switch de Front-end (Día 5-7)
**Foco**: Producción y desconexión de la extensión.
- **[ ]** Contenerización con Docker y despliegue en Railway.
- **[ ]** Actualizar `src/lib/rates.ts` para leer de Supabase en lugar de fallback local.
- **[ ]** **Switchover**: Desactivar la extensión y verificar que la landing refleje los rates del worker.
- **[ ]** Auditoría 42Q Final de Producción.

---

## 🛠️ Plan de Verificación

### Pruebas Automatizadas
- **Scraper Tests**: Scripts unitarios por broker para validar selectores contra el DOM actual.
- **Math Logic Tests**: Validar que la fórmula del spread y los tiers se calculen correctamente con datos mock.
- **DB Sync Test**: Verificar que los inserts en Supabase se realicen con el `service_role`.

### Verificación Manual
- Comprobar visualmente que los balances extraídos por el worker coinciden con el dashboard real del broker.
- Forzar un error (ej. credencial inválida) y verificar que se registre en `worker_health`.
- Validar que la landing page muestra el precio correcto en dispositivos móviles.
