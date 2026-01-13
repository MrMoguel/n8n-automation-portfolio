# SEO Article Generator with LangChain Agents

Sistema automatizado de generación de artículos SEO-optimizados usando agentes de IA multimodales. Genera contenido completo (títulos, cuerpos, imágenes) y lo almacena en PostgreSQL para distribución y análisis.

## Descripción General

Este workflow es un motor de producción de contenido empresarial que automatiza el ciclo completo de creación de artículos:
1. Generar títulos SEO únicos a partir de un tema.
2. Crear contenido en Markdown (2000+ palabras).
3. Generar imágenes relacionadas con IA.
4. Almacenar en base de datos PostgreSQL.
5. Exportar como archivos descargables.

**Caso de Uso Primario:** Producción masiva de contenido blog para HORECA, e-commerce y servicios B2B.

## Arquitectura Técnica

```
Input: Tema / Keyword
  ↓
[Agent 1] Generador de Títulos SEO
  ↓ (Usa OpenAI + OpenRouter)
[Agent 2] Generador de Contenido Markdown
  ↓ (LangChain Multi-tool Agent)
[Agent 3] Generador de Imágenes (Opcional)
  ↓
[Pipeline] Procesar & Convertir a Archivo
  ↓
[Storage] PostgreSQL + Filesystem
  ↓
Output: JSON + Markdown + PNG
```

## Capacidades Principales

### 1. Generación de Títulos SEO
- Crea títulos únicos y optimizados para búsqueda.
- Usa patrones de copywriting high-conversion.
- Evita duplicados consultando la base de datos.
- Output: Lista de 5-10 variantes.

### 2. Generación de Contenido en Markdown
- Produce artículos completos de 2000-3000 palabras.
- Estructura: Intro, H2s, H3s, ejemplos, CTA.
- Incluye meta-descripción y etiquetas.
- SEO optimizado con densidad de keyword controlada.
- Estilo: Profesional, accesible, persuasivo.

### 3. Generación de Imágenes (Modular)
- Crea imágenes de portada relevantes al tema.
- Usa modelo visual compatible (DALL-E o alternativas).
- Descarga y comprime automáticamente.

### 4. Almacenamiento Multi-destino
- PostgreSQL: Metadatos, tracking, deduplicación.
- Filesystem: Archivos Markdown y PNG.
- JSON: Export estructurado para CMS integration.

## Stack Tecnológico

| Componente | Herramienta | Uso |
|-----------|-----------|-----|
| **Agent Framework** | LangChain (v0.1+) | Orquestación de agentes multi-herramienta |
| **LLM Principal** | OpenAI GPT-4 / OpenRouter | Generación de texto |
| **LLM Alternativa** | OpenRouter (fallback) | Redundancia y costo-eficiencia |
| **Visión/Imágenes** | OpenAI Vision / DALL-E | Análisis y generación de imágenes |
| **Base de Datos** | PostgreSQL | Persistencia de artículos y metadatos |
| **Procesamiento** | n8n Code Nodes (JS) | Transformaciones y lógica personalizada |
| **Almacenamiento** | Filesystem (local/NAS) | Archivos finales |

## Instalación

### Requisitos Previos

1. **n8n**: Self-hosted o cloud con acceso a ejecutar workflows complejos.
2. **PostgreSQL 12+**: Base de datos para almacenar artículos.
3. **Credenciales:**
   - OpenAI API Key (con acceso a GPT-4).
   - OpenRouter API Key (como fallback).
   - Acceso a modelo de visión (DALL-E o similar).

### Pasos

1. **Importa el workflow** en n8n:
   - Copy-paste el archivo JSON o usa "Import from file".
   - Resuelve conflictos de credenciales.

2. **Configura PostgreSQL:**
   ```sql
   CREATE TABLE articles (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255),
     slug VARCHAR(255) UNIQUE,
     content TEXT,
     markdown_file_path VARCHAR(500),
     image_url VARCHAR(500),
     meta_description VARCHAR(160),
     keywords VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP,
     status VARCHAR(50) DEFAULT 'draft'
   );
   ```

3. **Configura paths de almacenamiento:**
   - Edita el nodo "Read/Write Files" y define rutas locales.
   - Ej: `/data/articles/`, `/data/images/`.

4. **Ejecuta una prueba:**
   - Ingresa un keyword: "cómo mejorar la presencia digital de un restaurante".
   - Espera 2-5 minutos dependiendo de los modelos.
   - Verifica que el artículo se guarde en PostgreSQL y filesystem.

## Flujo de Ejecución (Ejemplo Real)

**Input:**
```json
{
  "keyword": "automatización de cocina en restaurantes",
  "target_audience": "Dueños de restaurantes",
  "tone": "Profesional pero accesible"
}
```

**Proceso:**
1. Agent 1 genera: `"Automatización de Cocina: Guía Completa para Restauranteros 2026"`
2. Agent 2 escribe: Artículo de 2500 palabras con H2s, ejemplos, ROI calculations.
3. Agent 3 descarga imagen de cocina moderna con automatización.
4. Pipeline convierte a Markdown + JSON.
5. Almacena en: `articles/automatizacion-cocina.md` + PostgreSQL record.

**Output:**
```
✅ Articulo guardado
   Título: Automatización de Cocina...
   URL: /articulos/automatizacion-cocina
   Imagen: /images/cocina-auto.png
   Metadata: SEO ready
```

## Customización y Extensiones

### Cambiar el Modelo de IA
En el nodo "OpenRouter Chat Model":
- Edita el campo `model` para usar: `meta-llama/llama-2-70b-chat` u otros.
- Mantén compatibilidad con formato de prompt (system/user).

### Agregar Nuevos Idiomas
En los nodos de "Generar contenido":
- Modifica el system prompt para incluir: "Escribe en [IDIOMA] con tono [TONO]".
- Listo: El workflow generará en ese idioma.

### Publicación Automática a Blog
Agrega un nodo HTTP POST después de PostgreSQL:
```javascript
POST /api/articles
Body: { title, content, image_url }
```
Redirige a tu Wordpress, Ghost o CMS custom.

### Feedback Loop con Analytics
Conecta con Google Analytics:
- Trackea cuál de los 10 títulos generados da mejor CTR.
- Usa ese data para refinar los prompts del Agent 1.

## Monitoreo

### Métricas Clave
- **Tiempo de generación:** 2-5 minutos por artículo (depende modelo).
- **Costo:** ~$0.10-0.30 por artículo (OpenAI) o ~$0.02 (OpenRouter).
- **Calidad:** Audita manualmente los primeros 10 artículos.

### Logs y Debugging
- Habilita "Save Data" en cada nodo agent.
- Revisa los logs de n8n para ver el razonamiento del agent.
- Consulta PostgreSQL para verificar deduplicación.

---

## Notas Importantes

1. **Disclaimers legales:** Asegúrate de que los artículos generados cumplan con políticas de copyright y no plagien contenido.
2. **Validación humana:** Este flujo no reemplaza editores. Revisa al menos títulos e intro antes de publicar.
3. **Costos:** Monitorea el consumo de API. OpenRouter es más barato que OpenAI directo.
4. **Rate limits:** Configura delays entre ejecuciones para evitar throttling.

---

## Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| Agent "piensa" pero nunca responde | Rate limit de API | Agrega espera de 30s entre agentes |
| Imagen no descarga | DALL-E indisponible | Usa fallback (URL placeholder) |
| Artículo muy genérico | Prompt demasiado amplio | Especifica más: industria, público, tono |
| Postgresql timeout | Tabla sin índices | Crea índice en `slug` column |

---

## Roadmap Potencial

- [ ] Integración con SEMrush/Ahrefs para keyword research.
- [ ] Soporte multiidioma con traducción automática.
- [ ] Publicación automática a Wordpress/Ghost.
- [ ] Análisis de sentimiento y A/B testing de títulos.
- [ ] Generación de video resumido del artículo.

---

**Versión:** 1.0 | **Creado:** 2025 | **Última actualización:** Enero 2026 | **Desarrollado por eDEA SpA**

**Nota:** Este workflow fue uno de los primeros experimentos de eDEA con agentes de IA. Refleja aprendizajes sobre automatización de contenido que ahora alimentan soluciones más complejas.
