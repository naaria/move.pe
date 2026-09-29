# MOVE — Landing Page

Landing page de **MOVE**, una app personal de nutrición, actividad, fuerza y progreso corporal (web + PWA).

- **Público objetivo:** personas adultas que entrenan o quieren cuidar su alimentación y prefieren entender sus datos antes que seguir dietas rígidas.
- **Propuesta de valor:** todo tu progreso —comida, movimiento y fuerza— en un solo lugar, explicado sin juicios.

## Laboratorio 01 — HTML5 semántico, accesibilidad y formularios

- Estructura semántica: `header`, `nav`, `main`, `section`, `footer`.
- Jerarquía de encabezados: un solo `h1`, `h2` por sección, `h3` en las características.
- Imagen del hero con `alt` descriptivo.
- Iconos SVG de redes sociales con `alt=""` y `aria-label` en cada enlace.
- Formulario de contacto con `label for` / `id` en todos los campos (incluye `select` de motivo).
- Retos: favicon, sección de Preguntas Frecuentes, 4.º icono (TikTok), campo `select`.
- Logros extra: modo oscuro con variables CSS y microinteracciones en botones y enlaces.
- Enlace "Saltar al contenido" y foco visible para navegación con teclado.

## Laboratorio 02 — CSS Layout con Flexbox

- Normalización con `* { margin: 0; padding: 0; box-sizing: border-box }`.
- Flexbox básico (`display: flex`, `gap`, `justify-content`, `align-items`) en nav, hero, footer y formulario.
- Logo dentro del nav con `flex-grow: 1` para empujar el menú a la derecha.
- Características como grilla de tarjetas con `flex-wrap`, `flex-basis: 280px` y `flex-grow: 1`, con íconos SVG.
- Galería de 4 imágenes con `figure` + `figcaption` agrupadas con Flexbox interno.
- Mobile-first con 3 breakpoints: móvil (base), tablet (`min-width: 640px`) y escritorio (`min-width: 1024px`).
- Retos y logros: segunda fila del footer con Términos y Privacidad, hover en tarjetas, sección de Testimonios y microinteracciones en botones e imágenes.

| Viewport | Hero | Tarjetas | Galería | Testimonios |
| --- | --- | --- | --- | --- |
| < 640px | apilado | 1 columna | 1 columna | columna |
| 640–1023px | apilado | 2 columnas | 2 columnas | columna |
| ≥ 1024px | lado a lado | 3 columnas | 4 columnas | fila |

## Laboratorio 03 — CSS Grid

- Nav con rutas relativas (`index.html`, `precios.html`, `testimonios.html`) e ícono SVG para `faq.html` con `aria-label`.
- Layout Grid compartido (`.site-layout` con `grid-template-areas: "header" "main" "footer"`) en `index.html`, `precios.html`, `testimonios.html` y `compra.html`.
- `precios.html`: grid básico mobile-first (1 → `1fr 1fr` → `repeat(4, 1fr)`), plan Pro destacado con badge "Más popular" y sección de logos con `repeat(auto-fit, minmax(150px, 1fr))`.
- `faq.html`: `grid-template-areas` apilado en móvil, T invertida con sidebar desde 640px y sidebar a la derecha desde 1024px (reto: orden visual independiente del DOM).
- `testimonios.html`: muro de testimonios con `grid-auto-flow: dense`, `grid-column: span 2` y `grid-row: span 2`.
- `compra.html`: checkout con `grid-template-areas` (resumen arriba en móvil, formulario + resumen lado a lado en escritorio). Recibe el plan por URL (`compra.html?plan=pro`).
- Logro: enlaces de WhatsApp con mensaje predeterminado por plan.

| Página | Móvil (< 640px) | Tablet (640–1023px) | Escritorio (≥ 1024px) |
| --- | --- | --- | --- |
| Precios | 1 columna | 2 columnas | 4 columnas |
| FAQ | apilado | sidebar izquierda + main | main + sidebar derecha |
| Testimonios | 1 columna | 2 columnas | 3 columnas |
| Compra | apilado | apilado | formulario + resumen |

## Identidad visual

Paleta de marca: naranja `#FF7A2E`, lavanda `#A78BFA`, crema `#F6E7D9`, negro `#171717`, blanco `#FFFFFF`.
Tipografía: Manrope. El degradado naranja-lavanda se reserva para el hero.

## Estructura

```
product-landing-page/
├── index.html
├── precios.html
├── faq.html
├── testimonios.html
├── compra.html
├── css/styles.css
├── js/theme.js
├── js/compra.js
├── img/
└── README.md
```

## Créditos

- Foto del hero: [Unsplash](https://unsplash.com/) (foto `photo-1571019613454-1cb2f99b2d8b`, licencia Unsplash).
- Fotos de la galería: [Unsplash](https://unsplash.com/) (licencia Unsplash).
- Iconos de redes: [Simple Icons](https://simpleicons.org/) (CC0).
- Iconos de características y FAQ: [Lucide](https://lucide.dev/) (ISC).
- Logo, isotipo y degradado: marca MOVE.
