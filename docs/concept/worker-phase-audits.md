# Auditoría 42Q por Fase: Python Rate Harvester
> **Instrucciones**: Antes de avanzar a la siguiente fase, se deben marcar como [x] todas las preguntas correspondientes.

---

## 🏛️ Fase 1: Infraestructura y Gobernanza (Q1-Q10)
1. **[ ] Q1:** ¿Las tablas creadas en Supabase siguen la nomenclatura definida en el SQL de migración?
2. **[ ] Q2:** ¿Se aplicaron las políticas RLS `Anon read` y `Service role full access`?
3. **[ ] Q3:** ¿El archivo `.env` local contiene todas las variables listadas en `.env.example`?
4. **[ ] Q4:** ¿Se inicializó el entorno de Playwright correctamente (`playwright install`)?
5. **[ ] Q5:** ¿Existe un log inicial en `worker_health` confirmando la conexión con Supabase?
6. **[ ] Q6:** ¿El repo local está limpio de credenciales (usando `.gitignore`)?
7. **[ ] Q7:** ¿Se implementó el patrón Singleton para la conexión a la base de datos?
8. **[ ] Q8:** ¿Se verificó que el `service_role_key` tiene permisos de escritura en `live_rates`?
9. **[ ] Q9:** ¿Están los índices de PostgreSQL creados para optimizar las consultas de `created_at`?
10. **[ ] Q10:** ¿El plan de migración fue guardado en la carpeta `pending-to-check`?

## 🕷️ Fase 2: Motores de Extracción - Nexxdi/Loopay (Q11-Q21)
11. **[ ] Q11:** ¿El scraper de NexxdiPay maneja el TOTP (Google Authenticator) con éxito?
12. **[ ] Q12:** ¿Se replica el trigger de "Editar monto" para refrescar el precio en NexxdiPay?
13. **[ ] Q13:** ¿El regex de Nexxdi maneja los puntos y comas de la moneda colombiana?
14. **[ ] Q14:** ¿LoopayX detecta correctamente el estado "Offline" cuando ve $0?
15. **[ ] Q15:** ¿Se extraen los balances de USDT en LoopayX y se guardan en `broker_balances`?
16. **[ ] Q16:** ¿Se extrae el balance de COP/USD en NexxdiPay?
17. **[ ] Q17:** ¿Los scrapers cierran el contexto del navegador para liberar memoria al terminar?
18. **[ ] Q18:** ¿Existe un timeout por broker para evitar que el worker se bloquee infinitamente?
19. **[ ] Q19:** ¿Se capturan screenshots en caso de que un selector CSS haya cambiado?
20. **[ ] Q20:** ¿Las tasas extraídas pasan el filtro de validación 3000-5000 COP?
21. **[ ] Q21:** ¿El User-Agent utilizado simula un navegador real para evitar bloqueos?

## 🧮 Fase 3: Dasbanq y Engine Matemático (Q22-Q32)
22. **[ ] Q22:** ¿Dasbanq extrae con éxito las 4 variables (EUR Buy/Sell, MXN Buy/Sell)?
23. **[ ] Q23:** ¿Se extraen los saldos por moneda de Dasbanq?
24. **[ ] Q24:** ¿La lógica `MAX(Nexxdi, Loopay) - Spread` calcula el valor correcto en el servidor?
25. **[ ] Q25:** ¿El spread (12) se aplica correctamente antes de subir a `live_rates`?
26. **[ ] Q26:** ¿Se actualiza el registro global en `live_rates` cada minuto?
27. **[ ] Q27:** ¿Se inserta una fila en `rate_history` ante cada cambio detectado?
28. **[ ] Q28:** ¿Se detectan datos "Stale" (>5 min) y se reportan en `worker_health`?
29. **[ ] Q39:** ¿Se maneja correctamente el re-intento si un broker falla (Exponential Backoff)?
30. **[ ] Q30:** ¿La auditoría técnica confirma paridad 100% con los valores de la extensión?
31. **[ ] Q31:** ¿Se loguea el tiempo exacto que tomó la ejecución del motor matemático?
32. **[ ] Q32:** ¿Se notificó al owner sobre la primera sincronización exitosa de balances?

## 🚀 Fase 4: Despliegue e Integración (Q33-Q42)
33. **[ ] Q33:** ¿El worker corre estable en Railway (u otro PaaS) sin fugas de memoria?
34. **[ ] Q34:** ¿Se actualizó `src/lib/rates.ts` para consumir de Supabase?
35. **[ ] Q35:** ¿La Landing Page carga correctamente los precios en < 200ms desde Supabase?
36. **[ ] Q36:** ¿Se validó el switch en producción (desconectar extensión -> verificar landing)?
37. **[ ] Q37:** ¿Las políticas RLS impiden que un usuario `anon` escriba en las tablas?
38. **[ ] Q38:** ¿Se documentaron todas las variables de entorno en la plataforma de despliegue?
39. **[ ] Q39:** ¿El dashboard de Supabase muestra actividad consistente de inserciones?
40. **[ ] Q40:** ¿Se realizó la limpieza de logs temporales y archivos de prueba?
41. **[ ] Q41:** ¿Se actualizó el `Walkthrough` final con evidencias de éxito?
42. **[ ] Q42:** ¿El sistema está 100% libre de "Fake Metrics" y regresiones visuales?
