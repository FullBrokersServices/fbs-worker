# 🔐 Harvester Credential & Security Guide

Este documento explica cómo el trabajador de Python gestiona tus credenciales de forma segura y cómo obtener las semillas TOTP necesarias para el 2FA.

---

## 1. Gestión de Credenciales (Security Flow)

El sistema utiliza un flujo de "Cero Contacto" (Zero-Touch) para garantizar la seguridad:

1.  **Localización**: Las credenciales residen ÚNICAMENTE en tu archivo local `.env` ubicado en `worker-python/.env`.
2.  **Aislamiento**: El agente de IA (yo) nunca ve los valores reales. Solo he escrito el código que *lee* esas variables desde tu sistema local al momento de la ejecución.
3.  **Prevención de Fugas**: El archivo `.gitignore` está configurado para que el archivo `.env` nunca se guarde en repositorios de Git o nubes externas.
4.  **Generación Interna**: El trabajador genera los códigos de 6 dígitos de Google Authenticator (TOTP) de forma interna. Esto evita que tengas que estar presente para aprobar inicios de sesión manualmente.

---

## 2. Cómo Obtener las Semillas TOTP (Secret Keys)

Para que el trabajador genere los códigos automáticamente, necesita la "Semilla" o "Llave Secreta" de cada broker. Sigue estos pasos:

1.  **Login Manual**: Entra manualmente a **NexxdiPay, LoopayX y Dasbanq** en tu navegador.
2.  **Seguridad**: Ve a **Ajustes** (Settings) -> **Seguridad** -> **Autenticación de Dos Factores (2FA)**.
3.  **Configuración**:
    *   Si el 2FA ya está activo, es posible que debas desactivarlo y volverlo a activar para ver la pantalla de configuración inicial.
    *   En la pantalla donde aparece el Código QR, busca un enlace que diga **"¿No puedes escanear el código?"**, **"Ingresar código manualmente"** o **"Llave Secreta"** (Secret Key).
4.  **Copiar la Semilla**: Verás una cadena alfanumérica (ej: `JBSW Y3DP EHPK 3PXP`).
5.  **Configurar `.env`**: Copia esa cadena en tu archivo `.env` en la variable correspondiente (ej: `NEXXDI_TOTP_SEED`). **Elimina los espacios** al pegarla.

---

## 3. Configuración del Archivo `.env`

Asegúrate de que tu archivo `worker-python/.env` tenga este formato:

```bash
# NexxdiPay y Dasbanq (Google Authenticator)
# Estos brokers usan TOTP tradicional.
NEXXDI_TOTP_SEED=TU_SEMILLA_SIN_ESPACIOS
DASBANQ_TOTP_SEED=TU_SEMILLA_SIN_ESPACIOS

# LoopayX (SMS 2FA)
# LoopayX NO usa semilla TOTP. Usa mensajes de texto.
# Para este broker, deja la semilla vacía y usa el script de verificación.
LOOPAY_TOTP_SEED=
```

---

## 4. Manejo de SMS 2FA (LoopayX)

Como LoopayX envía un código por SMS, el trabajador no puede generarlo automáticamente desde una semilla. Para solucionar esto, utilizamos **Persistencia de Sesión**:

1.  **Ejecuta el Verificador**: En tu terminal, ejecuta:
    ```bash
    python scripts/verify_sessions.py
    ```
2.  **Selecciona LoopayX**: Presiona `1`.
3.  **Login Manual**: Se abrirá una ventana del navegador (Visible). Ingresa tu usuario y contraseña.
4.  **Ingresa el SMS**: Cuando LoopayX envíe el SMS a tu teléfono, escríbelo en la ventana del navegador y completa el login.
5.  **Cierra el Navegador**: Una vez veas el dashboard de LoopayX, el script terminará.
6.  **Sesión Guardada**: La sesión ahora está guardada localmente en la carpeta `sessions/loopayx/`. 

> [!TIP]
> El trabajador principal (`harvester.py`) reutilizará esta sesión guardada en sus ciclos automáticos, por lo que **no te pedirá el SMS de nuevo** hasta que la sesión expire (lo cual suele tardar semanas o meses).

---

## 5. Dasbanq (Notas Especiales)

Dasbanq opera en `dasbanq.com`. El proceso para obtener la semilla TOTP es idéntico al de los otros brokers (Ajustes -> Seguridad -> 2FA). 

> [!NOTE]
> Dasbanq es parte de la **Fase 3**. Aunque puedes configurar las credenciales ahora, el motor de extracción específico para este broker se activará en la siguiente etapa del desarrollo.

Si el inicio de sesión falla:
*   El trabajador tomará una **captura de pantalla (screenshot)** del error.
*   Se guardará en la carpeta `worker-python/logs/`.
*   Esto nos permite diagnosticar si el broker cambió un botón o una URL sin necesidad de que yo vea tu contraseña.
