# 🚀 Reporte de Ejecución: fbs-worker

Este reporte detalla los pasos exactos para poner en marcha el trabajador de Python, manejando correctamente el 2FA por SMS de LoopayX y el 2FA por App de los otros brokers.

---

### Paso 1: Configuración de Credenciales
Asegúrate de que tu archivo `.env` en la raíz del proyecto tenga las credenciales correctas.

1.  **Nexxdi/Dasbanq**: Ingresa Usuario, Contraseña y la Semilla TOTP (Secret Key).
2.  **LoopayX**: Ingresa Usuario y Contraseña. **Deja el campo `LOOPAY_TOTP_SEED` vacío**, ya que usaremos el método de SMS.

---

### Paso 2: Inicialización de Sesiones (Manual)
Este es el paso más importante para que el sistema funcione de forma autónoma después.

1.  Abre una terminal en la carpeta del proyecto.
2.  Ejecuta el script de verificación:
    ```bash
    python scripts/verify_sessions.py
    ```
3.  Selecciona la opción `1` para **LoopayX**.
4.  Se abrirá una ventana de Chrome (Visible):
    *   Ingresa tus datos si el broker los pide.
    *   **Loopay enviará un SMS a tu teléfono.**
    *   Escribe el código del SMS directamente en la ventana del navegador.
5.  Una vez estés dentro del Dashboard de Loopay, el script detectará el éxito y se cerrará solo.
6.  *(Opcional)*: Repite el proceso para los otros brokers si quieres verificar que el login automático de Google Authenticator funciona bien.

---

### Paso 3: Ejecución Autónoma
Ahora que la sesión de Loopay está guardada en tu disco (carpeta `sessions/`), puedes correr el trabajador principal.

1.  Ejecuta el comando:
    ```bash
    python harvester.py
    ```
2.  El sistema entrará en un ciclo infinito:
    *   Extraerá datos cada 60 segundos.
    *   **LoopayX**: Reutilizará la sesión guardada en el Paso 2. **No te pedirá SMS de nuevo** mientras la sesión siga activa en el broker.
    *   **Nexxdi/Dasbanq**: Generará los códigos de 6 dígitos automáticamente.

---

### Notas de Mantenimiento
*   **¿Si reinicio la PC?**: No pasa nada. Los archivos de sesión están en el disco duro. Solo vuelve a ejecutar `python harvester.py`.
*   **¿Si Loopay pide SMS otra vez?**: Esto solo pasará si cierras sesión manualmente o si el broker invalida el token (usualmente cada 30-60 días). En ese caso, simplemente repite el **Paso 2**.
*   **Logs**: Cualquier error guardará una captura de pantalla en la carpeta `logs/` para diagnóstico.
