# Audit: Python Worker Extraction Fidelity (42Q)
> **Context**: Extension Parity Verification
> **Status**: ANALYSIS_COMPLETE

## 🛠️ Extraction Logic (Q1-Q7)
1. **[ ] Q1:** ¿Maneja el worker los formatos de número europeos (punto como miles, coma como decimal) de NexxdiPay?
2. **[ ] Q2:** ¿Replica el worker el trigger de "Editar monto" para forzar el refresco de tasa en NexxdiPay?
3. **[ ] Q3:** ¿Detecta el worker el estado "$0" en LoopayX para marcar el broker como Offline?
4. **[ ] Q4:** ¿Implementa el worker la validación de rangos (3000-5000 COP) para evitar outlayers?
5. **[ ] Q5:** ¿Se extraen tanto la tasa de Compra como la de Venta en Dasbanq (EUR/MXN)?
6. **[ ] Q6:** ¿Tiene el worker un timeout de sesión para re-loguear si la cookie expira?
7. **[ ] Q7:** ¿Se implementó el "Debounce" de 1000ms después de cambios en el DOM para evitar lecturas parciales?

## 📊 Business Rules & Math (Q8-Q14)
8. **[ ] Q8:** ¿El cálculo `MAX(brokers) - spread` se realiza en el servidor antes de guardar en Supabase?
9. **[ ] Q9:** ¿Están los spreads (default 12) configurados como variables de entorno o tabla de config?
10. **[ ] Q10:** ¿Se migraron correctamente los tiers internacionales ($100-$1K: 2.5%, etc.)?
11. **[ ] Q11:** ¿Se incluyen los fees fijos (Wire $25, ACH $5, SEPA $2) en la lógica del engine?
12. **[ ] Q12:** ¿Maneja el worker el fee porcentual de USDT ($3 + 0.55%) detectado en el background script?
13. **[ ] Q13:** ¿Existe una validación para no actualizar la DB si la nueva tasa fluctúa más de un X% (circuit breaker)?
14. **[ ] Q14:** ¿Se guarda el `lastUpdate` individual por broker y uno global para el cálculo final?

## 🔒 Security & Auth (Q15-Q21)
15. **[ ] Q15:** ¿Están los secretos de TOTP (Google Authenticator) cifrados en el entorno de Railway?
16. **[ ] Q16:** ¿Utiliza el worker `service_role` para las inserciones en Supabase?
17. **[ ] Q17:** ¿Existen políticas RLS en `live_rates` que permitan solo lectura a `anon`?
18. **[ ] Q18:** ¿El worker corre en un contenedor Docker con privilegios mínimos?
19. **[ ] Q19:** ¿Se rotan las sesiones de Playwright para evitar bloqueos por IP/User-Agent?
20. **[ ] Q20:** ¿Las credenciales de los brokers están fuera del código fuente (en `.env`)?
21. **[ ] Q21:** ¿Se implementó HTTPS para cualquier comunicación externa del worker?

## 🩺 Monitoring & Health (Q22-Q28)
22. **[ ] Q22:** ¿Existe un Heartbeat que actualice la tabla `worker_health` cada minuto?
23. **[ ] Q23:** ¿Se capturan y guardan los screenshots de error en caso de fallo de selectores?
24. **[ ] Q24:** ¿Están los logs de errores clasificados por severidad (Warning vs Fatal)?
25. **[ ] Q25:** ¿Se detecta si una tasa queda "Stale" (> 5 min) y se marca visualmente en la DB?
26. **[ ] Q26:** ¿Hay un log de los tiempos de respuesta de cada broker (performance tracking)?
27. **[ ] Q27:** ¿Se alerta si el balance de un broker cae por debajo de un umbral crítico?
28. **[ ] Q28:** ¿Es resiliente el worker a micro-caídas de internet (re-intentos exponenciales)?

## 🏗️ Architecture & Scale (Q29-Q35)
29. **[ ] Q29:** ¿Se usa Playwright en modo Headless para ahorro de recursos?
30. **[ ] Q30:** ¿La base de datos tiene índices en las columnas de búsqueda frecuentes (created_at)?
31. **[ ] Q31:** ¿Se implementó una tabla dimensional para el histórico de tasas (Data Integrity)?
32. **[ ] Q32:** ¿Es modular el código para añadir un 4to broker fácilmente (Provider Pattern)?
33. **[ ] Q33:** ¿Se maneja la zona horaria `America/Bogota` de forma consistente?
34. **[ ] Q34:** ¿El worker puede escalar horizontalmente si se añaden más fuentes?
35. **[ ] Q35:** ¿La lógica de "Exhaustive Extraction" (balances/límites) impacta el tiempo de ejecución del minuto?

## 📋 Compliance & Documentation (Q36-Q42)
36. **[ ] Q36:** ¿Se actualizó el `schema.sql` en `pending-to-check` con las nuevas tablas?
37. **[ ] Q37:** ¿Existe un plan de rollback en caso de fallo de la migración?
38. **[ ] Q38:** ¿Están documentados los selectores CSS actuales y su versión de fecha?
39. **[ ] Q39:** ¿Se realizó un walkthrough de la primera extracción exitosa?
40. **[ ] Q40:** ¿El owner recibió el archivo `.env.example` actualizado?
41. **[ ] Q41:** ¿Se cumple con la política de "Zero Drift" en la base de datos?
42. **[ ] Q42:** ¿El PRD final fue firmado/aprobado por el usuario?
