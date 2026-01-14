# Sales Pipeline Dashboard - Frontend

**Sales Pipeline & Lead Qualification System**

Un dashboard React profesional que visualiza en tiempo real los leads capturados por el bot de WhatsApp e integrados en el ecosistema de automatización de ventas B2B.

## Características Principales

- **Visualización en Tiempo Real**: Sincronización instantánea de leads capturados.
- **Lead Scoring**: Gráficos y métricas de calificación de leads.
- **Historial de Conversaciones**: Visualización completa de chats de WhatsApp.
- **Pipeline Tracking**: Gestión de estados (Prospect → Qualified → Meeting Booked → Lost).
- **Activity Logs**: Registro detallado de emails y presentaciones enviadas.
- **KPI Dashboard**: Métricas clave como total de leads, tasa de conversión y leads calificados.

## Tech Stack

- **Framework**: React 18+ con Vite
- **Styling**: Tailwind CSS
- **Backend/Data**: Firebase Realtime Database + n8n Webhooks
- **State Management**: React Context API
- **Hosting**: Firebase Hosting / Vercel (Ready)

## Requisitos Previos

- **Node.js**: v18+
- **npm**: v9+
- **Navegador**: Chrome, Firefox, Edge o Safari (versiones recientes)

## Installation

1. **Clonar/Acceder a la carpeta:**
   ```bash
   cd sales-pipeline/frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env.local`
   - Llenar las variables requeridas (ver sección Environment Variables)

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```
   La app estará disponible en `http://localhost:5173`

## Environment Variables

Crea un archivo `.env.local` en la raíz de `frontend/` con:

```env
VITE_N8N_WEBHOOK_BASE_URL=https://[tu-instancia-n8n].com/webhook
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_DATABASE_URL=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Project Structure

```
src/
├── components/     # Componentes reutilizables (UI, Layouts)
├── contexts/       # React Context (Auth, Leads, UI state)
├── services/       # Servicios de API y Firebase
├── features/       # Módulos funcionales (Dashboard, Analytics)
├── types/          # Definiciones TypeScript
├── hooks/          # Custom React hooks (useLeads, etc.)
├── utils/          # Funciones de utilidad y helpers
├── assets/         # Imágenes, iconos y recursos estáticos
├── App.tsx         # Componente raíz y routing
└── main.tsx        # Punto de entrada de la aplicación
```

## Available Scripts

- `npm run dev`      - Inicia servidor de desarrollo (Vite)
- `npm run build`    - Compila para producción
- `npm run preview`  - Previsualiza build de producción
- `npm run lint`     - Ejecuta ESLint

## Development Guide

### Componentes Principales
- **DashboardLayout**: Contenedor principal con sidebar y header.
- **LeadsTable**: Tabla interactiva de leads con filtros y búsqueda.
- **LeadDetailModal**: Vista detallada con historial de conversación y metadata.
- **MetricsCard**: Componentes visuales para KPIs.
- **ConversationViewer**: Interfaz tipo chat para ver el historial de WhatsApp.

### Conexión con n8n
- Los leads se sincronizan vía **webhooks** desde los workflows de n8n.
- Los datos persisten en **Firebase Realtime Database**.
- **Context API** gestiona el estado global y la sincronización.

## Build & Deployment

1. **Build:**
   ```bash
   npm run build
   ```
   Genera la carpeta `dist/` lista para producción.

2. **Deploy a Firebase Hosting:**
   ```bash
   firebase login
   firebase deploy
   ```

## Troubleshooting

### Error: "VITE_* variables not found"
→ Verificar que `.env.local` exista y tenga las variables correctas. Reiniciar el servidor de desarrollo.

### Error: "Firebase connection failed"
→ Verificar credenciales de Firebase en `.env.local`. Asegurar que las reglas de seguridad de Firebase permitan la conexión.

### Error: "Webhooks no reciben datos"
→ Verificar que `VITE_N8N_WEBHOOK_BASE_URL` sea correcto y accesible desde el frontend.

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Web SDK](https://firebase.google.com/docs/web)
- [n8n Webhooks](https://docs.n8n.io/workflows/triggers/webhook/)
