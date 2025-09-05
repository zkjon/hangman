# Guía de Contribución

¡Gracias por tu interés en contribuir al Juego del Ahorcado! 🎉

## 🤝 Cómo contribuir

### Reportar bugs
1. Verifica que el bug no haya sido reportado antes
2. Crea un [issue](../../issues/new) con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Capturas de pantalla si es relevante
   - Información del navegador/dispositivo

### Sugerir mejoras
1. Crea un [issue](../../issues/new) con:
   - Descripción detallada de la funcionalidad
   - Justificación de por qué sería útil
   - Posible implementación (opcional)

### Contribuir código

#### 1. Fork y clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/zkjon/hangman.git
cd hangman
```

#### 2. Configurar entorno
```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

#### 3. Crear rama
```bash
# Crear rama para tu feature/fix
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/nombre-del-bug
```

#### 4. Desarrollar
- Escribe código limpio y bien documentado
- Sigue las convenciones existentes del proyecto
- Asegúrate de que el código funcione correctamente
- Prueba en diferentes navegadores si es posible

#### 5. Commit
```bash
# Commits descriptivos
git add .
git commit -m "feat: agregar nueva funcionalidad X"
# o
git commit -m "fix: corregir problema con Y"
```

**Convención de commits:**
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` documentación
- `style:` formato/estilo (sin cambios de lógica)
- `refactor:` refactoring de código
- `test:` agregar/modificar tests
- `chore:` tareas de mantenimiento

#### 6. Push y Pull Request
```bash
# Subir cambios
git push origin tu-rama

# Crear Pull Request en GitHub con:
# - Título descriptivo
# - Descripción de los cambios
# - Referencias a issues relacionados
```

## 📋 Estándares de código

### TypeScript/JavaScript
- Usar TypeScript para tipado fuerte
- Preferir `const` sobre `let`
- Funciones arrow para callbacks
- Destructuring cuando sea apropiado
- Nombres descriptivos para variables y funciones

### React/Preact
- Componentes funcionales con hooks
- Props con interfaces TypeScript
- Usar `useEffect` responsablemente
- Memoización cuando sea necesario

### CSS/Tailwind
- Usar clases de Tailwind CSS
- Mantener consistencia en spacing y colores
- Responsive design mobile-first

### Estructura de archivos
```
src/
├── components/     # Componentes reutilizables
├── hooks/          # Hooks personalizados
├── lib/            # Utilidades y datos
├── layouts/        # Layouts de Astro
├── pages/          # Páginas de Astro
└── styles/         # Estilos globales
```

## 🎯 Áreas de contribución

### 🚀 Funcionalidades prioritarias
- Sistema de categorías de palabras
- Niveles de dificultad
- Estadísticas persistentes
- Modo multijugador

### 🎨 Mejoras de UI/UX
- Animaciones y transiciones
- Temas personalizables
- Mejor accesibilidad
- Optimizaciones móviles

### 🧹 Mejoras técnicas
- Tests unitarios
- Optimización de rendimiento
- Accesibilidad (a11y)
- SEO y meta tags

### 📚 Documentación
- Tutoriales de desarrollo
- Comentarios en código
- Ejemplos de uso
- Guías de despliegue

## ❓ ¿Necesitas ayuda?

- 💬 Abre un [issue](../../issues) para preguntas
- 📧 Contacta al mantenedor principal
- 📖 Revisa la documentación existente

## 🙏 Reconocimientos

Todos los contribuidores serán agregados al README y reconocidos por sus aportes.

¡Gracias por hacer este proyecto mejor! 🚀
