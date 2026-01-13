# n8n System Diagnostic Tool (Doctor)

Workflow de mantenimiento diseñado para monitorear la salud operativa de instancias self-hosted de n8n. Ejecuta comprobaciones periódicas sobre recursos críticos y notifica anomalías.

## Funcionalidades
*   **Monitoreo de Recursos:** Verificación de consumo de RAM y CPU del contenedor/servidor.
*   **Análisis de Ejecuciones:** Detección de workflows fallidos en las últimas 24 horas.
*   **Integridad de Base de Datos:** Comprobación básica de conectividad y latencia.
*   **Alertas:** Notificación multicanal configurada (Email/WhatsApp) en caso de fallos críticos.

## Implementación
1. Importar `n8n-doctor.json` en una nueva hoja de trabajo.
2. Configurar el nodo de Trigger (Cron) según la frecuencia deseada (recomendado: cada 6 horas).
3. Ajustar los umbrales de alerta en las variables de entorno o nodos de configuración.

## Vista Previa
![Diagrama del flujo](./screenshot.png)
