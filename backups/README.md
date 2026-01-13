# Automated Backup System with Dropbox & Local Storage

Pipeline de respaldo multi-destino que exporta workflows de n8n hacia Dropbox y almacenamiento local. Diseñado para redundancia geográfica y recuperación de desastres.

## Características Principales

### Capas de Respaldo
*   **Dropbox Cloud:** Sincronización remota de todos los workflows en formato JSON comprimido.
*   **Local Storage:** Copia de seguridad en el servidor host para acceso de baja latencia.
*   **File Conversion:** Transformación de datos a múltiples formatos (JSON, CSV).

### Operaciones Críticas
1.  **Extracción de Workflows:** Lectura completa desde la instancia de n8n mediante API interna.
2.  **Procesamiento en Lotes:** Division de operaciones en batches para optimizar memoria.
3.  **Compresión:** Reducción de tamaño de archivo mediante ejecución de comandos del sistema (`gzip`, `tar`).
4.  **Distribución:** Sube simultáneamente a Dropbox y almacenamiento local.
5.  **Notificación:** Envía confirmación por email con estadísticas del respaldo.

## Configuración Requerida

### Credenciales Necesarias
Asegúrese de haber conectado las siguientes integraciones en su instancia de n8n:
*   **Dropbox OAuth2:** Para acceso a carpetas de respaldo.
*   **SMTP/Email:** Credenciales de servidor de correo para notificaciones.
*   **n8n Internal API:** Token de acceso (auto-generado en settings).

### Parámetros de Ejecución
*   **Schedule:** Definido en los nodos `Schedule Trigger` (recomendado: cada 24 horas).
*   **Dropbox Path:** Ruta destino en Dropbox (ej: `/backups/n8n/`).
*   **Local Path:** Directorio del servidor (ej: `/data/backups/`).
*   **Retention Policy:** Los respaldos más antiguos de 30 días se eliminan automáticamente.

## Flujo de Ejecución

```
Trigger (Cron) 
  ↓
Obtener todos los workflows (API)
  ↓
Procesar en lotes (Loop Over Items)
  ↓
Convertir a archivos (JSON → Comprimido)
  ↓
Subir a Dropbox (paralelo)
  ↓
Guardar localmente (paralelo)
  ↓
Enviar email de confirmación
```

## Recuperación

Para restaurar workflows desde un respaldo:
1.  Descargue el archivo desde Dropbox o storage local.
2.  Descomprima si es necesario.
3.  Importe masivamente en n8n:
    ```bash
    n8n import:workflow --input=./workflows.json
    ```

## Notas de Seguridad

*   Los respaldos incluyen la estructura de credenciales (sin valores).
*   Las contraseñas y tokens se almacenan únicamente en la base de datos de n8n.
*   Se recomienda encriptar los archivos de backup en tránsito y en reposo.

---
**Monitoreo:** Revise regularmente los logs del workflow para detectar fallos de sincronización.
