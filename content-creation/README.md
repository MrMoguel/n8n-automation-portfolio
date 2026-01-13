# generador contenido eDEA

Workflow de n8n para automatizar la generación y preparación de contenido usando IA y servicios de Google, con notificaciones por Telegram.

## Objetivo

Estandarizar un pipeline de creación de contenido: toma insumos estructurados, genera piezas con OpenAI y organiza los entregables en Google (Drive/Docs/Sheets), notificando el estado al finalizar.

## Integraciones

- Google (Drive/Docs/Sheets), HTTP, OpenAI, Telegram

## Componentes del workflow

- Nodos totales: 63
- Tipos de trigger detectados: n8n-nodes-base.errorTrigger, @n8n/n8n-nodes-langchain.chatTrigger

## Configuración

### Credenciales requeridas

- OpenAI (o proveedor compatible) para generación de texto.
- Google OAuth (Drive/Docs/Sheets) para lectura/escritura de archivos.
- Telegram (bot token/chat) para notificaciones.

### Parámetros a revisar antes de publicar/usar

- Rutas/IDs de Google Drive (carpetas destino).
- IDs de hojas/documentos si aplican (Sheets/Docs).
- Mensajes/plantillas (prompts) en los nodos de IA, para evitar incluir datos de clientes.

## Instalación

1. Descarga el archivo JSON del workflow.
2. Importa en n8n: *Import from file*.
3. Reconecta credenciales (OpenAI/Google/Telegram) en tu instancia.
4. Ejecuta una prueba con datos de ejemplo y valida el output.

## Vista previa

Si agregas una captura del flujo a esta carpeta, referencia el archivo así:

# 🧩 Subflujo de Procesamiento
![Workflow diagram](./content-creation-screenshot.png)

## Seguridad

- Este repositorio no incluye secretos (tokens/contraseñas). Los accesos se gestionan mediante el sistema de credenciales de n8n.
- Evita hardcodear emails, teléfonos o datos de clientes dentro de nodos *Code* o prompts.

## Identificadores públicos

Este workflow contiene IDs de recursos (por ejemplo, carpetas de Google Drive) para enrutar archivos. Estos IDs no otorgan acceso por sí solos; el acceso depende de las credenciales OAuth configuradas en tu instancia de n8n.

IDs detectados:
- `15cm38TF5zusBczLLXPq0uwbzLYYNfbNR`
