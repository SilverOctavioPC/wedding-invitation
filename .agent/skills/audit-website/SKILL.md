---
name: audit-website
description: Audita sitios web para detectar problemas de SEO, técnicos, de contenido, rendimiento y seguridad utilizando el CLI de squirrelscan.
---

# Habilidad de Auditoría Web (Audit Website)

Esta habilidad permite a los agentes de IA auditar sitios web utilizando más de 230 reglas en 21 categorías, incluyendo SEO, problemas técnicos, rendimiento, calidad de contenido y seguridad, a través de la herramienta CLI `squirrelscan` (`squirrel`).

`squirrelscan` proporciona una lista de problemas y sugerencias para solucionarlos, emulando un navegador y un rastreador de búsqueda para analizar la estructura y el contenido del sitio web.

**Enlaces Útiles:**
- Sitio web: [squirrelscan.com](https://squirrelscan.com)
- Documentación: [docs.squirrelscan.com](https://docs.squirrelscan.com)
- Referencia de reglas: `https://docs.squirrelscan.com/rules/{categoría}/{id-regla}`

## Cuándo usar esta habilidad

- Úsala cuando necesites analizar la salud general de una aplicación web.
- Úsala para depurar problemas técnicos de SEO.
- Úsala para generar reportes, validar meta etiquetas, verificar enlaces rotos y mejorar rendimiento, accesibilidad y seguridad.
- Úsala para comparar la salud del sitio antes y después de realizar cambios.
- **Importante:** Se recomienda auditar sitios en vivo para obtener una representación real, aunque también se puede usar en entornos locales.

## Requisitos Previos

Esta habilidad requiere que el CLI de `squirrel` esté instalado y en el PATH.
- Instalación: [squirrelscan.com/download](https://squirrelscan.com/download)
- Verificación: `squirrel --version`

## Configuración

Ejecuta `squirrel init` para crear un archivo `squirrel.toml` si no existe:
```bash
squirrel init -n nombre-del-proyecto
```

## Cómo usarla

### Flujo Básico

El proceso de auditoría consta de dos pasos principales: ejecución y reporte.

1.  **Ejecutar Auditoría** (Guardado en base de datos local):
    ```bash
    squirrel audit https://ejemplo.com --format console
    ```

2.  **Exportar Reporte (Formato LLM - RECOMENDADO)**:
    Siempre prefiere el formato `llm` ya que es exhaustivo y compacto para el análisis del agente.
    ```bash
    squirrel report <id-auditoria> --format llm
    ```
    O directamente en el comando de auditoría:
    ```bash
    squirrel audit https://ejemplo.com --format console
    # Luego exportar
    squirrel report --last --format llm
    ```
    *(Nota: El comando `audit` es un wrapper de `crawl` y `analyze`).*

### Estrategia de Escaneo

1.  **PRIMER ESCANEO (Superficial - `surface`):**
    Úsalo para obtener información básica sobre estructura, contenido y stack tecnológico sin impactar el rendimiento.
    ```bash
    squirrel audit https://ejemplo.com --coverage surface --format llm
    ```

2.  **SEGUNDO ESCANEO (Profundo - `full`):**
    Úsalo para un análisis detallado de seguridad, rendimiento y accesibilidad.
    ```bash
    squirrel audit https://ejemplo.com --coverage full --format llm
    ```

### Ejecutar Correcciones e Iterar

1.  **Presentar el Reporte:** Muestra al usuario los resultados y el puntaje.
2.  **Proponer Correcciones:** Lista los problemas que puedes arreglar y pide confirmación.
3.  **Paralelizar:** Si el usuario aprueba, usa sub-agentes para correcciones masivas (textos alternativos, encabezados, descripciones).
    - Agrupa 3-5 archivos por sub-agente para el mismo tipo de corrección.
    - Confirma siempre antes de lanzar sub-agentes.
4.  **Pausar para Juicio:** Marca enlaces rotos o cambios estructurales ambiguos para revisión humana.
5.  **Re-auditar:** Después de aplicar un lote de correcciones, ejecuta una nueva auditoría (`squirrel audit --refresh`) para verificar mejoras.
6.  **Comparar (Diff):** Muestra la comparación de puntajes antes/después.
    ```bash
    squirrel report --diff <id-auditoria-anterior> --format llm
    ```

**Objetivos de Puntaje:**
- < 50 (F) -> Requiere correcciones mayores (meta: 75+)
- 50-70 (D) -> Requiere correcciones moderadas (meta: 85+)
- 70-85 (C) -> Pulido final (meta: 90+)
- > 85 (B+) -> Ajustes finos (meta: 95+)

### Opciones Avanzadas Comunes

- **Más páginas:** `--max-pages 200`
- **Forzar escaneo fresco:** `--refresh` (Ignora caché)
- **Resumir escaneo interrumpido:** `--resume`
- **Verbosidad:** `--verbose` (Para debugging o sitios muy grandes)

### Modos de Cobertura (`--coverage`)

- `quick` (25 págs): Chequeos rápidos de salud, CI/CD.
- `surface` (100 págs): Auditorías generales, muestreo por patrones de URL (Default).
- `full` (500 págs): Análisis exhaustivo antes de lanzamientos.

### Comandos Útiles Adicionales

- `squirrel report --list`: Listar auditorías recientes.
- `squirrel report --severity error`: Filtrar por severidad.
- `squirrel self update`: Actualizar la herramienta.

## Solución de Problemas

- **Comando no encontrado:** Asegúrate que `squirrel` está en tu PATH.
- **Permiso denegado:** Verifica permisos de ejecución.
- **Timeout/Lento:** Usa `--verbose` para ver el progreso.
- **URL inválida:** Asegúrate de incluir `http://` o `https://`.
