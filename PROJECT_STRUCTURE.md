# 📁 Estructura del Proyecto — Wedding Invitation

> Última actualización: Febrero 2026

## Árbol de Archivos

```
wedding-invitation/
├── public/                     # Archivos estáticos
│   ├── favicon.svg             # Favicon SVG (iniciales S&A)
│   ├── robots.txt              # Directivas para crawlers
│   └── sitemap.xml             # Sitemap para SEO
│
├── src/                        # Código fuente
│   ├── components/
│   │   ├── sections/           # Secciones de la invitación
│   │   │   ├── index.ts        # Barrel export
│   │   │   ├── WelcomeScreen.tsx   # Pantalla de bienvenida (overlay)
│   │   │   ├── HeroSection.tsx     # Hero con foto y nombres
│   │   │   ├── Countdown.tsx       # Cuenta regresiva al evento
│   │   │   ├── StorySection.tsx    # "Nuestra Historia"
│   │   │   ├── EventDetails.tsx    # Detalles del evento (lugar, hora)
│   │   │   ├── Gallery.tsx         # Galería de fotos
│   │   │   ├── GiftSection.tsx     # Mesa de regalos
│   │   │   ├── RSVPForm.tsx        # Formulario de confirmación
│   │   │   └── FinalMessage.tsx    # Mensaje de cierre
│   │   │
│   │   └── ui/                 # Componentes reutilizables
│   │       ├── index.ts        # Barrel export
│   │       ├── ErrorBoundary.tsx    # Manejo global de errores
│   │       ├── LoadingSpinner.tsx   # Spinner de carga (Suspense fallback)
│   │       └── MusicPlayer.tsx     # Reproductor de música flotante
│   │
│   ├── context/                # Estado global
│   │   ├── index.ts            # Barrel export
│   │   └── WeddingContext.tsx   # Provider: isEntered, isMusicPlaying
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── index.ts            # Barrel export
│   │   └── useCountdown.ts     # Hook para cuenta regresiva
│   │
│   ├── App.tsx                 # Componente raíz (lazy loading + ErrorBoundary)
│   ├── main.tsx                # Entry point (ReactDOM.createRoot)
│   ├── index.css               # Tailwind @theme + estilos globales
│   ├── constants.ts            # Constantes del evento (fecha, nombres, etc.)
│   └── types.ts                # Tipos TypeScript (TimeLeft, etc.)
│
├── .editorconfig               # Configuración de editor (indent, charset)
├── .env                        # Variables de entorno (no en Git)
├── .env.example                # Plantilla de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── .prettierrc                 # Configuración de Prettier
├── eslint.config.js            # ESLint flat config (v10)
├── index.html                  # HTML principal (SEO: meta, OG, noscript)
├── package.json                # Dependencias y scripts
├── postcss.config.js           # PostCSS + Tailwind plugin
├── tailwind.config.js          # (Legacy v3 — migrado a @theme en index.css)
├── tsconfig.json               # TypeScript config + path aliases
├── vite.config.ts              # Vite config + alias @/ → src/
└── README.md                   # Documentación del proyecto
```

## 🛠 Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2 | UI library |
| TypeScript | 5.8 | Tipado estático |
| Vite | 6.4 | Bundler + Dev Server |
| Tailwind CSS | 4.1 | Utilidades CSS (`@theme`) |
| Framer Motion | 12.x | Animaciones |
| Lucide React | 0.564 | Iconos |
| ESLint | 10.x | Linting |
| Prettier | 3.8 | Formateo de código |

## 📋 Scripts

```bash
npm run dev           # Servidor de desarrollo (HMR)
npm run build         # Build optimizado para producción
npm run preview       # Preview del build local
npm run lint          # Verificar código con ESLint
npm run lint:fix      # Auto-corregir problemas de ESLint
npm run format        # Formatear código con Prettier
```

## 🔑 Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_SITE_URL` | URL del sitio en producción | `https://sofia-alejandro-boda.com` |
| `VITE_AUDIO_URL` | URL del archivo de música | `https://cdn.pixabay.com/...` |

## 🏗 Patrones de Arquitectura

### Barrel Exports
Cada directorio tiene un `index.ts` que re-exporta todos sus módulos:
```typescript
// ✅ Import limpio
import { WelcomeScreen, HeroSection } from '@/components/sections';
import { ErrorBoundary, MusicPlayer } from '@/components/ui';
import { WeddingProvider } from '@/context';
```

### Lazy Loading (Code Splitting)
Las secciones se cargan bajo demanda con `React.lazy`:
```typescript
const HeroSection = React.lazy(() => import('@/components/sections/HeroSection'));
```

### Error Boundary
Componente clase que captura errores de React y muestra un fallback elegante:
```
<ErrorBoundary> ← Captura cualquier error
  <WeddingProvider> ← Estado global
    <Suspense> ← Lazy loading
      <Secciones />
    </Suspense>
  </WeddingProvider>
</ErrorBoundary>
```

### Path Aliases
`@/` se resuelve a `./src/` (configurado en `vite.config.ts` y `tsconfig.json`).

## 🔍 SEO

- ✅ `<meta name="description">` optimizada
- ✅ Open Graph + Twitter Cards
- ✅ `<link rel="canonical">`
- ✅ `lang="es"` en `<html>`
- ✅ `<noscript>` con H1 y contenido fallback
- ✅ Favicon SVG personalizado
- ✅ `robots.txt` + `sitemap.xml`
