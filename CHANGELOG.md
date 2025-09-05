# Changelog

Todos los cambios notables a este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.2] - 2025-09-05

### 🔍 SEO y Analytics
- **Robots.txt completo**: Implementado archivo robots.txt con configuración optimizada para crawlers
  - Permite indexación de todo el contenido público
  - Bloquea directorios de build y desarrollo
  - Referencia al sitemap automático
- **Sitemap automático**: Integrada generación automática de sitemap con `@astrojs/sitemap`
  - Sitemap XML generado dinámicamente en build
  - Configurado para actualización automática
- **Meta robots**: Agregado meta tag `robots` con `index, follow` para optimización SEO
- **Canonical URL**: Implementada URL canónica para evitar contenido duplicado
- **Vercel Analytics**: Integrada analítica de Vercel para tracking de usuarios
  - Componente `<Analytics />` de `@vercel/analytics/astro`
  - Tracking automático de páginas y eventos

### 🛠️ Técnico
- Configurado dominio del sitio en `astro.config.mjs` para generación correcta de sitemap
- Optimizada estructura de meta tags para mejor indexación
- Integración nativa con Astro para máximo rendimiento

### 📈 Rendimiento
- Analytics ligero sin impacto en velocidad de carga
- Sitemap automático reduce crawl budget
- Configuración SEO optimizada para Core Web Vitals

## [1.1] - 2025-09-05

### 🐛 Arreglado
- **Bug crítico de inicialización**: Solucionado problema donde la página mostraba "GANASTE" al cargar inicialmente en lugar de mostrar la palabra para jugar
- **CI/CD GitHub Actions**: Corregido error "Unable to locate executable file: pnpm" reordenando los pasos de instalación en el workflow
- **TypeScript en CI**: Solucionado error de tipos en `astro.config.mjs` con el plugin de Tailwind CSS v4
- **Configuración de lockfile**: Cambiado `--frozen-lockfile` por `--no-frozen-lockfile` para evitar errores en CI cuando el lockfile es incompatible

### 🔧 Mejorado
- **Calidad de código**: Solucionados todos los problemas detectados por el linter Biome:
  - Uso de optional chaining (`?.`) en lugar de verificaciones manuales
  - Agregado `type="button"` explícito a todos los elementos button
  - Optimizadas dependencias de `useEffect` con `useCallback` para mejor rendimiento
  - Reordenado el código para evitar referencias antes de declaración

### 🛠️ Técnico
- Reorganizada la lógica del hook `useHangmanGame` para mejor legibilidad
- Agregada verificación de palabra vacía antes de evaluar condición de victoria
- Mejorada la configuración de GitHub Actions para despliegue automático
- Actualizada configuración de Astro para TypeScript sin errores

## [1.0] - 2025-09-05

### ✨ Agregado
- Juego del ahorcado completo y funcional
- Canvas con dibujo artístico (efectos de trazado a mano)
- Soporte para teclado físico (A-Z, Ñ, Enter)
- Teclado virtual interactivo
- Base de datos con más de 200 palabras en español
- Diseño responsivo para móviles y escritorio
- Cara expresiva con ojos X y lengua fuera
- Sistema de reinicio rápido
- Contador de errores y letras incorrectas
- Instrucciones dinámicas de teclado

### 🛠️ Técnico
- Arquitectura modular con componentes separados
- Hook personalizado `useHangmanGame` para lógica del juego
- Algoritmo de dibujo consistente con semillas
- Sistema de escalado responsivo para canvas
- Manejo completo de eventos de teclado
- Componentes TypeScript con Preact
- Integración con Astro y Tailwind CSS

### 🎨 Diseño
- Layout de dos columnas (canvas + controles)
- Efectos hover y transiciones suaves
- Tipografía clara y legible
- Esquema de colores accesible
- Botones con estados visuales
- Instrucciones contextúales

## [Unreleased]

### 🚀 Próximas características
- [ ] Categorías de palabras (animales, países, etc.)
- [ ] Niveles de dificultad
- [ ] Estadísticas de juego
- [ ] Modo multijugador
- [ ] Temas visuales personalizables
- [ ] Sonidos y efectos de audio
