# Development Guide

## Getting Started

1. **Setup environment**: Copia `.env.example` a `.env.local` y configura las variables (ver README.md).
2. **Start Dev Server**: Ejecuta `npm run dev`.
3. **Open Browser**: Visita `http://localhost:5173`.

## Code Style & Linting

- **ESLint**: Configurado en `eslint.config.js`.
- **Run Lint**: `npm run lint`
- **Auto-fix**: `npm run lint -- --fix`

## Making Changes

### Agregar un nuevo componente
Estructura recomendada:
```bash
src/components/MyComponent/
├── MyComponent.tsx      # Lógica y UI
├── MyComponent.module.css (opcional)
└── index.ts             # Export público
```

### Agregar una nueva feature
Crear carpeta en `src/features/`:
```bash
src/features/myFeature/
├── components/          # Componentes internos
├── pages/               # Vistas de ruta
├── services/            # APIs específicas
├── types/               # Tipos locales
└── index.ts             # Punto de entrada
```

### Actualizar state
1. Agregar acciones o reducers en el Context correspondiente (`LeadsContext`, etc.).
2. Exponer funciones o estado en el value del Provider.
3. Usar el hook del context (ej. `useLeads()`) en los componentes.

## Testing

```bash
npm run test              # Ejecutar tests
npm run test -- --ui      # Ver UI de tests (si está configurado)
```

## Building

```bash
npm run build             # Build para producción
npm run preview           # Previsualizar production build localmente
```

## Debugging

- **React DevTools**: Para inspeccionar árbol de componentes y props.
- **Firebase Console**: Para verificar sincronización de datos en tiempo real.
- **Network Tab**: Para inspeccionar llamadas a webhooks y requests.

## Performance Tips

- Usar `React.memo()` para componentes que re-renderizan frecuentemente sin cambios de props.
- Lazy load de rutas principales con `React.lazy()`.
- Debounce en búsquedas para evitar llamadas excesivas.

## Common Tasks

### Agregar un nuevo endpoint
1. Crear función en `/src/services/`.
2. Exportar desde `index.ts`.
3. Consumir en componentes o context.

### Conectar un nuevo webhook
1. Documentar payload esperado en `types`.
2. Crear handler en `LeadsContext` o `n8nService`.
3. Integrar respuesta o estado de carga en UI.
