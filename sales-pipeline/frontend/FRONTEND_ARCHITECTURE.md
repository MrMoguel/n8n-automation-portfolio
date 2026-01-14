# Frontend Architecture Guide

## Overview
Guía técnica detallada de la arquitectura del dashboard Sales Pipeline.

## Estructura de Directorios

### `/src/components`
Componentes React reutilizables:
- **DashboardLayout**: Estructura principal (header, sidebar, contenido).
- **LeadsTable**: Tabla de leads con filtros, búsqueda y ordenamiento.
- **LeadDetailModal**: Modal con detalles completos del lead.
- **MetricsCard**: Tarjetas de KPI (reutilizable).
- **ConversationViewer**: Visualizador de mensajes de WhatsApp.
- **PipelineStageSelector**: Selector visual del estado del lead.

### `/src/contexts`
React Context para state management:
- **LeadsContext**: Gestión global de leads, sincronización con Firebase.
- **UIContext**: Gestión de estado de UI (modales, filtros, temas).
- **AuthContext**: Gestión de autenticación y sesión de usuario.

### `/src/services`
Servicios de conexión con backend:
- **n8nService.ts**: Comunicación con webhooks de n8n para acciones.
- **firebaseService.ts**: Configuración y operaciones con Firebase SDK.
- **leadsApi.ts**: Operaciones CRUD específicas para leads.

### `/src/features`
Módulos de features principales:
- **dashboard/**: Componentes específicos de la vista principal.
- **leads/**: Componentes y lógica para gestión de leads.
- **analytics/**: Gráficos de rendimiento y reportes.

### `/src/types`
Interfaces TypeScript:
- `Lead`: Estructura principal de un lead.
- `Conversation`: Mensajes y metadata de chat.
- `Metric`: Tipos para KPIs y estadísticas.
- `WebhookPayload`: Estructuras de envío a n8n.

### `/src/hooks`
Custom React Hooks:
- `useLeads()`: Acceso a leads y acciones del context.
- `useDashboardMetrics()`: Cálculo de métricas agregadas.
- `useFirebaseSync()`: Lógica de suscripción a Realtime Database.

## Data Flow

1. **Input**: Webhook desde n8n → Firebase Realtime Database.
2. **Sync**: `LeadsContext` detecta cambios en Firebase via listeners.
3. **Display**: Componentes suscritos al context se actualizan automáticamente.
4. **Interaction**: Usuario interactúa (ej. cambia estado de lead).
5. **Action**: `n8nService` envía acción a n8n y/o se actualiza Firebase directamente.

## State Management

- **Global State**: React Context API (Leads, Auth, UI).
- **Form State**: `useState` / `useReducer` local en componentes.
- **UI State**: `UIContext` para modales globales y preferencias.

## Firebase Integration

- **Realtime Database**: Sincronización en vivo de datos de negocio.
- **Authentication**: Firebase Auth para login seguro.
- **Hosting**: Despliegue estático de la SPA.

## Build Process

1. **Vite** transpilas JSX y TypeScript (esbuild).
2. **Tailwind CSS** genera los estilos usados.
3. Assets se optimizan y minifican en `/dist`.

## Performance Considerations

- **Memoización**: Uso de `React.memo` en componentes de tablas y listas.
- **Lazy Loading**: Importación dinámica de rutas/features pesadas.
- **Virtualización**: Considerar para tablas con miles de registros.
- **Debouncing**: En inputs de búsqueda y filtros.

## Testing

- **Unit Tests**: Vitest para utilidades y hooks.
- **Component Tests**: React Testing Library.

## Deployment

- **Development**: `npm run dev`
- **Production**: `npm run build && firebase deploy`
