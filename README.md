# Sofia & Alejandro — Wedding Invitation 💍

Invitación de boda digital con React, TypeScript y Tailwind CSS.

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — Bundler ultrarrápido
- **Tailwind CSS v4** — Utilidades CSS con `@theme`
- **Framer Motion** — Animaciones fluidas
- **Lucide React** — Iconografía

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── sections/    # Secciones de la invitación (Hero, Countdown, RSVP...)
│   ├── ui/          # Componentes reutilizables (MusicPlayer, ErrorBoundary...)
│   └── layout/      # Layouts (preparado)
├── context/         # React Context (WeddingContext)
├── hooks/           # Custom hooks (useCountdown)
├── App.tsx          # Componente raíz con lazy loading
├── main.tsx         # Entry point
├── index.css        # Tailwind @theme + estilos globales
├── constants.ts     # Constantes del evento
└── types.ts         # Tipos TypeScript
```

## 🚀 Getting Started

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📋 Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (HMR) |
| `npm run build` | Build optimizado para producción |
| `npm run preview` | Preview del build local |
| `npm run lint` | Verificar código con ESLint |
| `npm run lint:fix` | Auto-corregir issues de ESLint |
| `npm run format` | Formatear código con Prettier |

## 🔧 Variables de Entorno

| Variable | Descripción |
|---|---|
| `VITE_SITE_URL` | URL del sitio en producción |
| `VITE_AUDIO_URL` | URL del archivo de audio de fondo |

## 📄 Licencia

Proyecto privado.
