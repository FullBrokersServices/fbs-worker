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
# NexxdiPay
NEXXDI_USER=tu_email@ejemplo.com
NEXXDI_PASS=tu_contraseña_segura
NEXXDI_TOTP_SEED=TU_SEMILLA_SIN_ESPACIOS

# LoopayX
LOOPAY_USER=tu_usuario
LOOPAY_PASS=tu_contraseña_segura
LOOPAY_TOTP_SEED=TU_SEMILLA_SIN_ESPACIOS

# Dasbanq (Phase 3)
DASBANQ_USER=tu_usuario
DASBANQ_PASS=tu_contraseña_segura
DASBANQ_TOTP_SEED=TU_SEMILLA_SIN_ESPACIOS
```

---

## 4. Dasbanq (Notas Especiales)

Dasbanq opera en `dasbanq.com`. El proceso para obtener la semilla TOTP es idéntico al de los otros brokers (Ajustes -> Seguridad -> 2FA). 

> [!NOTE]
> Dasbanq es parte de la **Fase 3**. Aunque puedes configurar las credenciales ahora, el motor de extracción específico para este broker se activará en la siguiente etapa del desarrollo.

Si el inicio de sesión falla:
*   El trabajador tomará una **captura de pantalla (screenshot)** del error.
*   Se guardará en la carpeta `worker-python/logs/`.
*   Esto nos permite diagnosticar si el broker cambió un botón o una URL sin necesidad de que yo vea tu contraseña.
