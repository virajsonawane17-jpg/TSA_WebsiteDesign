"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/contexts/language-context";
import type { Lang } from "@/lib/i18n";
import {
  Code2, Globe, Database, Palette, MapPin, Rss,
  Image as ImageIcon, Type, Cpu, Package, Shield,
  ExternalLink,
} from "lucide-react";
import { DocViewerSection } from "@/components/doc-viewer-section";

/* ─── Bilingual item shape ─── */
interface BiItem {
  name: string;
  version?: string;
  license?: string;
  url: string;
  en: { description: string; role: string };
  es: { description: string; role: string };
}

interface RefItem {
  name: string;
  version?: string;
  license?: string;
  url: string;
  description: string;
  role: string;
}

function pick(items: BiItem[], lang: Lang): RefItem[] {
  return items.map(({ name, version, license, url, en, es }) => ({
    name, version, license, url, ...( lang === "es" ? es : en),
  }));
}

/* ─── Bilingual item data ─── */
const FRAMEWORK: BiItem[] = [
  {
    name: "Next.js 15", version: "^15.5.7", license: "MIT", url: "https://nextjs.org",
    en: { description: "The React framework powering the entire site. Uses the App Router for file-based routing, server components for fast data fetching (events/news from Tampa.gov), and Turbopack for instant HMR in development.", role: "Core framework — SSR, SSG, routing, API routes" },
    es: { description: "El marco de React que impulsa todo el sitio. Utiliza el App Router para enrutamiento basado en archivos, componentes de servidor para obtención rápida de datos (eventos/noticias de Tampa.gov) y Turbopack para HMR instantáneo en desarrollo.", role: "Marco principal — SSR, SSG, enrutamiento, rutas de API" },
  },
  {
    name: "React 19", version: "19.2.0", license: "MIT", url: "https://react.dev",
    en: { description: "The UI component library. All interactive pages (directory search, events calendar, insights charts) are built as React components. React 19 brings improved server actions and concurrent rendering.", role: "UI component layer" },
    es: { description: "La biblioteca de componentes UI. Todas las páginas interactivas (búsqueda de directorio, calendario de eventos, gráficos de insights) se construyen como componentes React. React 19 trae mejoras en acciones de servidor y renderizado concurrente.", role: "Capa de componentes UI" },
  },
  {
    name: "TypeScript 5", version: "^5", license: "Apache 2.0", url: "https://www.typescriptlang.org",
    en: { description: "Adds static typing across the entire codebase. All resource, event, and news data shapes are type-checked, eliminating runtime bugs from mismatched API responses.", role: "Type-safe JavaScript throughout the project" },
    es: { description: "Añade tipado estático en todo el código. Todas las estructuras de datos de recursos, eventos y noticias son verificadas por tipo, eliminando errores en tiempo de ejecución por respuestas de API incorrectas.", role: "JavaScript con seguridad de tipos en todo el proyecto" },
  },
];

const STYLING: BiItem[] = [
  {
    name: "Tailwind CSS v4", version: "^4", license: "MIT", url: "https://tailwindcss.com",
    en: { description: "Utility-first CSS framework used for layout, spacing, and responsive design. The custom Tampa warm-coastal palette (coral, teal, cream, sand) is wired into Tailwind's theme via CSS custom properties in globals.css.", role: "Utility styling and responsive layout" },
    es: { description: "Marco CSS de utilidades primero usado para diseño, espaciado y diseño responsivo. La paleta cálida costera de Tampa (coral, teal, crema, arena) está integrada en el tema de Tailwind mediante propiedades CSS personalizadas en globals.css.", role: "Estilos utilitarios y diseño responsivo" },
  },
  {
    name: "tw-animate-css", version: "^1.4.0", license: "MIT", url: "https://github.com/jamiebuilds/tailwindcss-animate",
    en: { description: "Provides Tailwind-compatible animation utility classes. Used for entry animations on modal dialogs, dropdowns, and the reveal scroll-fade effect.", role: "CSS animation utilities" },
    es: { description: "Proporciona clases utilitarias de animación compatibles con Tailwind. Se usan para animaciones de entrada en diálogos modales, menús desplegables y el efecto de desvanecimiento al desplazar.", role: "Utilidades de animación CSS" },
  },
  {
    name: "Custom Tampa Design System", version: "Internal", url: "#",
    en: { description: "A hand-crafted design system defined in globals.css. Includes the warm coastal palette (--coral #e85a3a, --teal #2d8a8a, --cream, --sand, --sun), typography scale, shadow tokens, border-radius tokens, and all custom component classes (spotlight, stats-band, cat-grid, news-card, calendar, etc.).", role: "Brand identity and all visual component styles" },
    es: { description: "Un sistema de diseño artesanal definido en globals.css. Incluye la paleta cálida costera (--coral #e85a3a, --teal #2d8a8a, --cream, --sand, --sun), escala tipográfica, tokens de sombra, tokens de radio de borde y todas las clases de componentes personalizadas (spotlight, stats-band, cat-grid, news-card, calendar, etc.).", role: "Identidad de marca y todos los estilos de componentes visuales" },
  },
  {
    name: "PostCSS v4", version: "^4", license: "MIT", url: "https://postcss.org",
    en: { description: "Processes Tailwind CSS directives at build time. Configured via postcss.config.mjs to transform @tailwind and @apply directives into plain CSS for the browser.", role: "CSS build pipeline / Tailwind processor" },
    es: { description: "Procesa directivas de Tailwind CSS en tiempo de construcción. Configurado mediante postcss.config.mjs para transformar directivas @tailwind y @apply en CSS puro para el navegador.", role: "Pipeline de construcción CSS / procesador de Tailwind" },
  },
];

const UI_LIBS: BiItem[] = [
  {
    name: "Radix UI Primitives", version: "various ^1–2", license: "MIT", url: "https://www.radix-ui.com",
    en: { description: "A suite of 20+ unstyled, accessible UI primitives (accordion, dialog, tooltip, select, tabs, checkbox, radio-group, scroll-area, popover, dropdown-menu, and more). Provides WAI-ARIA compliance without requiring us to implement keyboard navigation from scratch.", role: "Accessible headless component primitives" },
    es: { description: "Un conjunto de 20+ primitivos UI sin estilos y accesibles (acordeón, diálogo, tooltip, select, pestañas, checkbox, radio-group, área de desplazamiento, popover, menú desplegable y más). Proporciona cumplimiento WAI-ARIA sin necesidad de implementar navegación por teclado desde cero.", role: "Primitivos de componentes sin cabeza y accesibles" },
  },
  {
    name: "shadcn/ui", version: "components.json", license: "MIT", url: "https://ui.shadcn.com",
    en: { description: "Pre-built components layered on top of Radix UI with class-variance-authority (CVA) styling. Used for the command palette (cmdk), date picker (react-day-picker), OTP input, and other higher-level UI elements.", role: "Styled component library built on Radix" },
    es: { description: "Componentes prebuilt sobre Radix UI con estilos de class-variance-authority (CVA). Usado para la paleta de comandos (cmdk), selector de fechas (react-day-picker), entrada OTP y otros elementos UI de nivel superior.", role: "Biblioteca de componentes estilizados sobre Radix" },
  },
  {
    name: "Lucide React", version: "^0.554.0", license: "ISC", url: "https://lucide.dev",
    en: { description: "Open-source icon library with 1000+ consistent SVG icons. Used throughout the site for navigation (ArrowRight, Menu), resource cards (MapPin, Phone, Globe), category icons (Utensils, Heart, Home, Book), and UI indicators (TrendingUp, RefreshCw, CalendarDays).", role: "Icon system across every page" },
    es: { description: "Biblioteca de iconos de código abierto con 1000+ iconos SVG consistentes. Usada en todo el sitio para navegación (ArrowRight, Menu), tarjetas de recursos (MapPin, Phone, Globe), iconos de categorías (Utensils, Heart, Home, Book) e indicadores UI (TrendingUp, RefreshCw, CalendarDays).", role: "Sistema de iconos en cada página" },
  },
  {
    name: "Framer Motion", version: "^12.23.24", license: "MIT", url: "https://www.framer.com/motion",
    en: { description: "Production-grade motion library for React. Powers the hover-glow button's cursor-following radial glow effect and could be extended for page transitions. Provides physics-based spring animations for a polished feel.", role: "Animation and gesture library" },
    es: { description: "Biblioteca de movimiento de nivel producción para React. Impulsa el efecto de brillo radial del botón hover-glow que sigue al cursor y puede extenderse para transiciones de página. Proporciona animaciones de resorte basadas en física para una sensación pulida.", role: "Biblioteca de animaciones y gestos" },
  },
  {
    name: "class-variance-authority (CVA)", version: "^0.7.1", license: "Apache 2.0", url: "https://cva.style",
    en: { description: "Type-safe variant management for component styling. Used internally by shadcn/ui components to manage size, color, and state variants without string concatenation.", role: "Component variant management" },
    es: { description: "Gestión de variantes con seguridad de tipos para el estilo de componentes. Usado internamente por los componentes de shadcn/ui para gestionar variantes de tamaño, color y estado sin concatenación de cadenas.", role: "Gestión de variantes de componentes" },
  },
  {
    name: "tailwind-merge", version: "^3.4.0", license: "MIT", url: "https://github.com/dcastil/tailwind-merge",
    en: { description: "Intelligently merges conflicting Tailwind class names. Prevents duplicate utility classes when combining conditional classes in component props.", role: "Tailwind class deduplication utility" },
    es: { description: "Fusiona inteligentemente nombres de clase de Tailwind en conflicto. Previene clases utilitarias duplicadas al combinar clases condicionales en props de componentes.", role: "Utilidad de deduplicación de clases de Tailwind" },
  },
  {
    name: "Sonner", version: "^2.0.7", license: "MIT", url: "https://sonner.emilkowal.ski",
    en: { description: "Elegant toast notification library. Used for user-facing feedback messages (e.g., when sharing a resource link to the clipboard on the directory page).", role: "Toast / notification system" },
    es: { description: "Elegante biblioteca de notificaciones toast. Usada para mensajes de retroalimentación al usuario (p.ej., al compartir un enlace de recurso al portapapeles en la página de directorio).", role: "Sistema de notificaciones toast" },
  },
  {
    name: "Embla Carousel React", version: "^8.6.0", license: "MIT", url: "https://www.embla-carousel.com",
    en: { description: "Lightweight, accessible carousel/slider component. Available for use in event galleries or featured resource slideshows.", role: "Carousel component" },
    es: { description: "Componente de carrusel/slider ligero y accesible. Disponible para usar en galerías de eventos o presentaciones de recursos destacados.", role: "Componente de carrusel" },
  },
  {
    name: "Recharts", version: "^2.15.4", license: "MIT", url: "https://recharts.org",
    en: { description: "React-native charting library. Used on the Insights page for visualizing category distributions. Supports responsive SVG charts out of the box.", role: "Data visualization / charts" },
    es: { description: "Biblioteca de gráficos nativa de React. Usada en la página de Insights para visualizar distribuciones de categorías. Soporta gráficos SVG responsivos sin configuración adicional.", role: "Visualización de datos / gráficos" },
  },
];

const MAPPING: BiItem[] = [
  {
    name: "Leaflet", version: "^1.9.4", license: "BSD 2-Clause", url: "https://leafletjs.com",
    en: { description: "The leading open-source JavaScript mapping library. Powers the interactive resource map on the directory page — renders markers for each of the 12 partner organizations with their geographic coordinates.", role: "Interactive map engine" },
    es: { description: "La biblioteca de mapas JavaScript de código abierto líder. Impulsa el mapa interactivo de recursos en la página de directorio — renderiza marcadores para cada una de las 12 organizaciones asociadas con sus coordenadas geográficas.", role: "Motor de mapas interactivo" },
  },
  {
    name: "React Leaflet", version: "^5.0.0", license: "Hippocratic 3.0", url: "https://react-leaflet.js.org",
    en: { description: "React bindings for Leaflet. Provides MapContainer, TileLayer, Marker, and Popup components that integrate naturally with Next.js. The map is loaded lazily with next/dynamic to avoid SSR issues.", role: "React wrapper for Leaflet maps" },
    es: { description: "Enlace de React para Leaflet. Proporciona los componentes MapContainer, TileLayer, Marker y Popup que se integran naturalmente con Next.js. El mapa se carga de forma diferida con next/dynamic para evitar problemas de SSR.", role: "Envolvente React para mapas Leaflet" },
  },
  {
    name: "OpenStreetMap", version: "tile service", license: "ODbL", url: "https://www.openstreetmap.org",
    en: { description: "Free, open-source map tile data used as the base layer in the resource map. Community-maintained geographic data for Tampa Bay area streets, neighborhoods, and landmarks.", role: "Map tile provider (base layer imagery)" },
    es: { description: "Datos de teselas de mapa gratuitos y de código abierto utilizados como capa base en el mapa de recursos. Datos geográficos mantenidos por la comunidad para calles, vecindarios y puntos de referencia del área de Tampa Bay.", role: "Proveedor de teselas de mapa (imágenes de capa base)" },
  },
];

const APIS: BiItem[] = [
  {
    name: "City of Tampa Events API", version: "REST / JSON", url: "https://www.tampa.gov/mobile-feeds/events/all",
    en: { description: "Official City of Tampa open data API returning all city-hosted events in JSON format. Fetched server-side with a 15-minute revalidation window. Powers the live Events page calendar and list, the EventsTeaser on the homepage, and the event count on the Insights page. No API key required.", role: "Live Tampa city events — dynamic events page" },
    es: { description: "API de datos abiertos oficial de la Ciudad de Tampa que devuelve todos los eventos organizados por la ciudad en formato JSON. Se obtiene del lado del servidor con una ventana de revalidación de 15 minutos. Impulsa el calendario y la lista de la página de Eventos en vivo, el EventsTeaser en la página principal y el conteo de eventos en la página de Insights. No requiere clave de API.", role: "Eventos en vivo de la ciudad de Tampa — página de eventos dinámica" },
  },
  {
    name: "City of Tampa News RSS Feed", version: "RSS 2.0 / XML", url: "https://tampa.gov/news/feed",
    en: { description: "Official City of Tampa press releases and news items delivered as RSS XML. Parsed server-side using a custom XML parser (no external dependency). Fetched hourly (revalidate: 3600). Powers the featured story, trending sidebar, and editorial grid on the News page.", role: "Live city news and press releases" },
    es: { description: "Comunicados de prensa y noticias oficiales de la Ciudad de Tampa entregados como RSS XML. Analizado del lado del servidor usando un analizador XML personalizado (sin dependencia externa). Se obtiene cada hora (revalidate: 3600). Impulsa la historia destacada, la barra lateral de tendencias y la cuadrícula editorial en la página de Noticias.", role: "Noticias en vivo y comunicados de prensa de la ciudad" },
  },
  {
    name: "City of Tampa Calendar Types API", version: "REST / JSON", url: "https://www.tampa.gov/taxonomy/terms/calendar_type",
    en: { description: "Returns event taxonomy/category types from Tampa's content management system. Used to classify incoming events by type (Community, Recreation, Public Meetings, etc.). Cached for 24 hours.", role: "Event category classification" },
    es: { description: "Devuelve tipos de taxonomía/categoría de eventos del sistema de gestión de contenido de Tampa. Usado para clasificar eventos entrantes por tipo (Comunidad, Recreación, Reuniones Públicas, etc.). Almacenado en caché por 24 horas.", role: "Clasificación de categorías de eventos" },
  },
  {
    name: "NewsData.io", version: "v2 REST API", url: "https://newsdata.io",
    en: { description: "Supplemental news API providing localized Tampa Bay news articles from regional outlets. Fills in the editorial grid on the News page when Tampa.gov RSS has fewer recent items. Returns title, description, image URL, and publication date.", role: "Supplemental Tampa Bay regional news" },
    es: { description: "API de noticias suplementaria que proporciona artículos de noticias localizados de Tampa Bay de medios regionales. Completa la cuadrícula editorial en la página de Noticias cuando Tampa.gov RSS tiene menos artículos recientes. Devuelve título, descripción, URL de imagen y fecha de publicación.", role: "Noticias regionales suplementarias de Tampa Bay" },
  },
  {
    name: "Google Calendar Deep Link", version: "URL scheme", url: "https://calendar.google.com/calendar/render",
    en: { description: "Not an API key — uses Google Calendar's public URL scheme to let users add any event directly to their Google Calendar from the Events page with a single click. Encodes event title, date, location, and description as URL parameters.", role: "Add-to-calendar functionality" },
    es: { description: "No es una clave de API — usa el esquema de URL público de Google Calendar para permitir a los usuarios agregar cualquier evento directamente a su Google Calendar desde la página de Eventos con un solo clic. Codifica el título, fecha, ubicación y descripción del evento como parámetros de URL.", role: "Funcionalidad de agregar al calendario" },
  },
];

const BACKEND: BiItem[] = [
  {
    name: "Supabase", version: "^2.93.1", license: "Apache 2.0", url: "https://supabase.com",
    en: { description: "Open-source Firebase alternative providing a hosted PostgreSQL database, authentication, and file storage. The project uses Supabase for user auth (login/profile pages), storing submitted resources pending review, and hosting uploaded images in the references section.", role: "Database, auth, and file storage backend" },
    es: { description: "Alternativa de código abierto a Firebase que proporciona una base de datos PostgreSQL alojada, autenticación y almacenamiento de archivos. El proyecto usa Supabase para autenticación de usuarios (páginas de inicio de sesión/perfil), almacenamiento de recursos enviados pendientes de revisión y alojamiento de imágenes subidas en la sección de referencias.", role: "Backend de base de datos, autenticación y almacenamiento de archivos" },
  },
  {
    name: "@supabase/ssr", version: "^0.8.0", license: "Apache 2.0", url: "https://supabase.com/docs/guides/auth/server-side",
    en: { description: "Supabase's server-side rendering helpers for Next.js. Manages session cookies across server components and API routes so users stay logged in across page navigations using Next.js middleware.", role: "Server-side Supabase session management" },
    es: { description: "Helpers de renderizado del lado del servidor de Supabase para Next.js. Gestiona cookies de sesión en componentes de servidor y rutas de API para que los usuarios permanezcan autenticados durante la navegación usando middleware de Next.js.", role: "Gestión de sesiones de Supabase del lado del servidor" },
  },
];

const FORMS: BiItem[] = [
  {
    name: "React Hook Form", version: "^7.66.1", license: "MIT", url: "https://react-hook-form.com",
    en: { description: "Performant, minimal re-render form library. Used on the Submit Resource page for managing form state, validation errors, and submission — without causing a full page re-render on every keystroke.", role: "Form state management (Submit page)" },
    es: { description: "Biblioteca de formularios de alto rendimiento con re-renderizado mínimo. Usada en la página de Envío de Recursos para gestionar el estado del formulario, errores de validación y envío — sin causar un re-renderizado completo de la página con cada pulsación de tecla.", role: "Gestión del estado del formulario (página de Envío)" },
  },
  {
    name: "Zod", version: "^4.1.12", license: "MIT", url: "https://zod.dev",
    en: { description: "TypeScript-first schema validation library. Defines the data shape for resource submissions and validates incoming form data both client-side and in API route handlers before inserting to Supabase.", role: "Schema validation and type inference" },
    es: { description: "Biblioteca de validación de esquemas con TypeScript primero. Define la forma de los datos para envíos de recursos y valida los datos del formulario entrante tanto del lado del cliente como en los manejadores de rutas API antes de insertar en Supabase.", role: "Validación de esquemas e inferencia de tipos" },
  },
  {
    name: "date-fns", version: "^4.1.0", license: "MIT", url: "https://date-fns.org",
    en: { description: "Modern date manipulation library. Used for date formatting, comparison (e.g., filtering events older than 7 days for the Past News section), and computing relative dates across news and events pages.", role: "Date parsing, formatting, and comparison" },
    es: { description: "Biblioteca moderna de manipulación de fechas. Usada para formateo de fechas, comparación (p.ej., filtrar eventos de más de 7 días para la sección de Noticias Pasadas) y cálculo de fechas relativas en las páginas de noticias y eventos.", role: "Análisis, formateo y comparación de fechas" },
  },
];

const FONTS: BiItem[] = [
  {
    name: "Inter", version: "Variable", license: "SIL OFL 1.1", url: "https://rsms.me/inter",
    en: { description: "The primary body typeface loaded via next/font/google for zero-CLS font loading. Used for all body text, navigation, labels, and UI elements. Its wide numeric character set makes it ideal for displaying the stats and data counters on the site.", role: "Body text, navigation, labels, data displays" },
    es: { description: "La tipografía principal del cuerpo cargada mediante next/font/google para carga de fuentes sin CLS. Usada para todo el texto del cuerpo, navegación, etiquetas y elementos UI. Su amplio conjunto de caracteres numéricos la hace ideal para mostrar las estadísticas y contadores de datos en el sitio.", role: "Texto del cuerpo, navegación, etiquetas, visualización de datos" },
  },
  {
    name: "Instrument Serif", version: "Italic", license: "SIL OFL 1.1", url: "https://fonts.google.com/specimen/Instrument+Serif",
    en: { description: "The accent serif typeface loaded via next/font/google. Used exclusively for <em> elements inside headings to create the editorial warmth and humanity that distinguishes the site's brand voice.", role: "Italic accent text in all section headings" },
    es: { description: "La tipografía serif de acento cargada mediante next/font/google. Usada exclusivamente para elementos <em> dentro de encabezados para crear la calidez editorial y humanidad que distingue la voz de marca del sitio.", role: "Texto de acento en cursiva en todos los encabezados de sección" },
  },
];

const MEDIA: BiItem[] = [
  {
    name: "Unsplash", version: "Free License", url: "https://unsplash.com",
    en: { description: "The primary source for all photography on the site. Specific uses: (1) Hero background — Tampa beach waterfront (photo-1507525428034-b723cf961d3e). (2) Community news fallback images — community gathering, youth event, wellness walk. (3) Category page images. All images are fetched at runtime via CDN URL with width/quality parameters for performance.", role: "Hero photo, community news images, fallback photography" },
    es: { description: "La fuente principal de toda la fotografía del sitio. Usos específicos: (1) Fondo del Hero — frente costero de la playa de Tampa (photo-1507525428034-b723cf961d3e). (2) Imágenes de respaldo de noticias comunitarias — reunión comunitaria, evento juvenil, caminata de bienestar. (3) Imágenes de la página de categorías. Todas las imágenes se obtienen en tiempo de ejecución mediante URL de CDN con parámetros de anchura/calidad para el rendimiento.", role: "Foto del Hero, imágenes de noticias comunitarias, fotografía de respaldo" },
  },
  {
    name: "Supabase Storage", version: "Hosted CDN", url: "https://supabase.com/storage",
    en: { description: "Used to host project-specific uploaded images referenced in the static news and event fallback data. Images are served from the Supabase CDN at slelguoygbfzlpylpxfs.supabase.co.", role: "Hosted project images for static data fallbacks" },
    es: { description: "Usado para alojar imágenes subidas específicas del proyecto referenciadas en los datos de respaldo estáticos de noticias y eventos. Las imágenes se sirven desde el CDN de Supabase en slelguoygbfzlpylpxfs.supabase.co.", role: "Imágenes del proyecto alojadas para respaldos de datos estáticos" },
  },
];

const DEV_TOOLS: BiItem[] = [
  {
    name: "Vercel", version: "Hosting / Edge", url: "https://vercel.com",
    en: { description: "The production deployment platform. Handles edge caching (ISR), serverless function execution for API routes, automatic HTTPS, and CI/CD from the GitHub repository. The site's revalidation intervals (15 min for events, 1 hr for news) are enforced at the Vercel edge layer.", role: "Production hosting, CI/CD, ISR edge caching" },
    es: { description: "La plataforma de despliegue en producción. Maneja caché en el borde (ISR), ejecución de funciones sin servidor para rutas API, HTTPS automático y CI/CD desde el repositorio de GitHub. Los intervalos de revalidación del sitio (15 min para eventos, 1 hr para noticias) se aplican en la capa de borde de Vercel.", role: "Alojamiento en producción, CI/CD, caché en el borde ISR" },
  },
  {
    name: "npm / bun", version: "package managers", url: "https://bun.sh",
    en: { description: "Bun is the primary JavaScript runtime and package manager for fast installs and builds. npm is the fallback. Both lockfiles are present; npm is used for production builds on Vercel.", role: "Package management and local development runtime" },
    es: { description: "Bun es el runtime de JavaScript principal y gestor de paquetes para instalaciones y compilaciones rápidas. npm es el respaldo. Ambos archivos de bloqueo están presentes; npm se usa para compilaciones en producción en Vercel.", role: "Gestión de paquetes y runtime de desarrollo local" },
  },
  {
    name: "ESLint v9", version: "^9", license: "MIT", url: "https://eslint.org",
    en: { description: "Configured with eslint-config-next for Next.js-specific rules. Catches common mistakes such as missing alt attributes on images, improper use of next/image vs <img>, and exhaustive dependency rules in React hooks.", role: "Code quality linting" },
    es: { description: "Configurado con eslint-config-next para reglas específicas de Next.js. Detecta errores comunes como atributos alt faltantes en imágenes, uso incorrecto de next/image vs <img> y reglas de dependencias exhaustivas en hooks de React.", role: "Revisión de calidad de código" },
  },
  {
    name: "Playwright", version: "^1.58.0", license: "Apache 2.0", url: "https://playwright.dev",
    en: { description: "End-to-end testing framework. Can be used to test critical user flows — resource search, event filtering, and form submission — across Chromium, Firefox, and WebKit browsers.", role: "End-to-end browser testing" },
    es: { description: "Marco de pruebas de extremo a extremo. Puede usarse para probar flujos críticos de usuario — búsqueda de recursos, filtrado de eventos y envío de formularios — en los navegadores Chromium, Firefox y WebKit.", role: "Pruebas de navegador de extremo a extremo" },
  },
];

const STANDARDS: BiItem[] = [
  {
    name: "WCAG 2.2 AA", version: "W3C · 2023", url: "https://www.w3.org/TR/WCAG22",
    en: { description: "Web Content Accessibility Guidelines. The site follows AA compliance: color contrast ratios ≥4.5:1 for normal text, ≥3:1 for large text, keyboard-navigable interactive elements via Radix UI, proper ARIA roles and labels on all icon-only buttons (aria-label), and semantic HTML heading hierarchy.", role: "Accessibility compliance standard" },
    es: { description: "Pautas de Accesibilidad para el Contenido Web. El sitio sigue la conformidad AA: relaciones de contraste de color ≥4.5:1 para texto normal, ≥3:1 para texto grande, elementos interactivos navegables por teclado mediante Radix UI, roles y etiquetas ARIA adecuados en todos los botones solo de iconos (aria-label) y jerarquía de encabezados HTML semánticos.", role: "Estándar de cumplimiento de accesibilidad" },
  },
  {
    name: "Next.js App Router", version: "Next.js 15", url: "https://nextjs.org/docs/app",
    en: { description: "The file-system-based routing convention used throughout the project. Each page lives in src/app/[route]/page.tsx. Server components fetch data at the top level; client components are explicitly marked with 'use client' and handle interactivity.", role: "Routing architecture and server/client component model" },
    es: { description: "La convención de enrutamiento basada en el sistema de archivos usada en todo el proyecto. Cada página vive en src/app/[route]/page.tsx. Los componentes de servidor obtienen datos en el nivel superior; los componentes de cliente están marcados explícitamente con 'use client' y manejan la interactividad.", role: "Arquitectura de enrutamiento y modelo de componentes servidor/cliente" },
  },
  {
    name: "navigator.share / Clipboard API", version: "Web API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share",
    en: { description: "The native browser share sheet (navigator.share) is used as the primary share mechanism on the Directory page. Falls back to navigator.clipboard.writeText for environments that don't support the Web Share API (e.g., desktop Chrome on non-HTTPS).", role: "Resource sharing functionality" },
    es: { description: "La hoja de compartir nativa del navegador (navigator.share) se usa como mecanismo principal de compartir en la página de Directorio. Recurre a navigator.clipboard.writeText para entornos que no admiten la API de Compartir Web (p.ej., Chrome de escritorio en no-HTTPS).", role: "Funcionalidad de compartir recursos" },
  },
];

/* ─── Section renderer ─── */
interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: RefItem[];
  roleLabel: string;
  accent?: "coral" | "teal" | "sun";
}

function RefDetailSection({ icon, title, subtitle, items, roleLabel, accent = "coral" }: SectionProps) {
  const accentColor = accent === "coral" ? "var(--coral)" : accent === "teal" ? "var(--teal)" : "#b07a14";
  const accentBg    = accent === "coral" ? "var(--coral-soft)" : accent === "teal" ? "var(--teal-soft)" : "#fdf3da";

  return (
    <Reveal>
      <div style={{ marginTop: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center", color: accentColor, flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: ".04em", textTransform: "uppercase" }}>{title}</h3>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "rgba(255,255,255,.55)" }}>{subtitle}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 16, padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>{item.name}</span>
                  {item.version && <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 9999, background: accentBg, color: accentColor, letterSpacing: ".04em" }}>{item.version}</span>}
                  {item.license && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 9999, background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.5)" }}>{item.license}</span>}
                </div>
                {item.url && item.url !== "#" && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: accentColor, textDecoration: "none", flexShrink: 0 }}>
                    {item.url.replace(/^https?:\/\//, "").split("/")[0]}
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.55, borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 10 }}>
                <span style={{ display: "inline-block", marginBottom: 6, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: accentColor }}>
                  {roleLabel}: {item.role}
                </span>
                <br />
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function ReferencesPage() {
  const { lang, s } = useLanguage();
  const r = s.references;

  const framework  = pick(FRAMEWORK,  lang);
  const styling    = pick(STYLING,    lang);
  const uiLibs     = pick(UI_LIBS,    lang);
  const mapping    = pick(MAPPING,    lang);
  const apis       = pick(APIS,       lang);
  const backend    = pick(BACKEND,    lang);
  const forms      = pick(FORMS,      lang);
  const fonts      = pick(FONTS,      lang);
  const media      = pick(MEDIA,      lang);
  const devTools   = pick(DEV_TOOLS,  lang);
  const standards  = pick(STANDARDS,  lang);

  const summaryCards = [
    { label: r.card1, count: "30+" },
    { label: r.card2, count: "4" },
    { label: r.card3, count: "2" },
    { label: r.card4, count: "2" },
    { label: r.card5, count: "MIT / OFL" },
    { label: r.card6, count: "WCAG 2.2 AA" },
  ];

  const copyItems = [
    { label: r.copy1l, value: r.copy1v },
    { label: r.copy2l, value: r.copy2v },
    { label: r.copy3l, value: r.copy3v },
    { label: r.copy4l, value: r.copy4v },
    { label: r.copy5l, value: r.copy5v },
    { label: r.copy6l, value: r.copy6v },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "#0E1525", minHeight: "100vh" }}>
        <section id="references" className="section" style={{ color: "#fff" }}>
          <Reveal>
            <span className="section-eyebrow" style={{ background: "rgba(255,255,255,.1)", color: "#ffcebe", border: "1px solid rgba(255,255,255,.12)" }}>
              <span className="dot" style={{ background: "var(--coral)" }} />{r.eyebrow}
            </span>
            <h2 className="section-title" style={{ color: "#fff" }}>{r.headingPre}<em>{r.headingEm}</em>{r.headingPost}</h2>
            <p className="section-sub" style={{ color: "rgba(255,255,255,.65)", maxWidth: 600 }}>{r.sub}</p>
          </Reveal>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 36 }}>
              {summaryCards.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>{s.count}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: 48 }}>
              <DocViewerSection />
            </div>
          </Reveal>

          <RefDetailSection icon={<Cpu size={18} />}      title={r.s1t}  subtitle={r.s1s}  items={framework} roleLabel={r.roleLabel} accent="coral" />
          <RefDetailSection icon={<Palette size={18} />}  title={r.s2t}  subtitle={r.s2s}  items={styling}   roleLabel={r.roleLabel} accent="teal" />
          <RefDetailSection icon={<Package size={18} />}  title={r.s3t}  subtitle={r.s3s}  items={uiLibs}    roleLabel={r.roleLabel} accent="sun" />
          <RefDetailSection icon={<MapPin size={18} />}   title={r.s4t}  subtitle={r.s4s}  items={mapping}   roleLabel={r.roleLabel} accent="teal" />
          <RefDetailSection icon={<Rss size={18} />}      title={r.s5t}  subtitle={r.s5s}  items={apis}      roleLabel={r.roleLabel} accent="coral" />
          <RefDetailSection icon={<Database size={18} />} title={r.s6t}  subtitle={r.s6s}  items={backend}   roleLabel={r.roleLabel} accent="teal" />
          <RefDetailSection icon={<Code2 size={18} />}    title={r.s7t}  subtitle={r.s7s}  items={forms}     roleLabel={r.roleLabel} accent="sun" />
          <RefDetailSection icon={<Type size={18} />}     title={r.s8t}  subtitle={r.s8s}  items={fonts}     roleLabel={r.roleLabel} accent="coral" />
          <RefDetailSection icon={<ImageIcon size={18} />} title={r.s9t} subtitle={r.s9s}  items={media}     roleLabel={r.roleLabel} accent="teal" />
          <RefDetailSection icon={<Globe size={18} />}    title={r.s10t} subtitle={r.s10s} items={devTools}  roleLabel={r.roleLabel} accent="sun" />
          <RefDetailSection icon={<Shield size={18} />}   title={r.s11t} subtitle={r.s11s} items={standards} roleLabel={r.roleLabel} accent="coral" />

          <Reveal>
            <div style={{ marginTop: 64, padding: "28px 32px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>
                {r.copyTitle}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {copyItems.map((c, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--coral)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)" }}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
