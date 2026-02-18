---
name: crear-habilidad
description: Utiliza esta habilidad para crear OTRAS habilidades (skills) nuevas en el workspace. Sigue convenciones y buenas prácticas para la estructura de skills en español.
---

# Habilidad para Crear Habilidades (Meta-Skill)

Esta habilidad documenta el proceso estándar para generar nuevas habilidades en el sistema Antigravity dentro de este workspace. **El idioma por defecto para la documentación de las nuevas habilidades será el Español.**

## Cuándo usar esta habilidad

- Usa esta habilidad cuando el usuario solicite explícitamente "crear una nueva habilidad", "skill" o "workflow".
- Úsala para estandarizar la creación de herramientas reutilizables dentro del proyecto.

## Cómo usarla

Para crear una nueva habilidad, sigue estos pasos rigurosamente:

1.  **Identificar el Nombre y Propósito**:
    *   Determina un nombre corto y descriptivo en **kebab-case** (ej. `generar-tests`, `desplegar-app`).
    *   Redacta una descripción clara en tercera persona para el frontmatter (ej. `Genera pruebas unitarias...`).

2.  **Crear la Estructura de Directorios**:
    *   La ruta base debe ser: `.agent/skills/<nombre-habilidad>/`.
    *   Si la habilidad requiere scripts o plantillas, crea subcarpetas: `scripts/`, `examples/` o `resources/`.

3.  **Generar el Archivo `SKILL.md`**:
    *   Crea el archivo `.agent/skills/<nombre-habilidad>/SKILL.md`.
    *   Usa el siguiente formato de plantilla en Markdown:

    ```markdown
    ---
    name: <nombre-habilidad>
    description: <Descripción para el agente sobre qué hace y cuándo usar esta habilidad>
    ---

    # <Título de la Habilidad>

    <Descripción detallada de la habilidad y su objetivo>

    ## Cuándo usar esta habilidad

    - <Caso de uso 1>
    - <Caso de uso 2>
    - <Caso de uso 3>

    ## Cómo usarla

    <Instrucciones paso a paso que el agente debe seguir>
    1. <Paso 1...>
    2. <Paso 2...>
    ```

4.  **Verificación**:
    *   Asegúrate de que el archivo `SKILL.md` tenga el frontmatter YAML correcto.
    *   Confirma que las instrucciones sean claras y ejecutables por un agente de IA.

## Mejores Prácticas

- **Un solo propósito**: Cada habilidad debe hacer una cosa bien.
- **Descripciones Claras**: El agente decide usar la habilidad basándose en la descripción del frontmatter.
- **Idioma**: A menos que se especifique lo contrario, redacta todo el contenido de la nueva habilidad en **Español**.
