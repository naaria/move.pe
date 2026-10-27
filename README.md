# MOVE — Landing Page

Landing page de **MOVE**, una app personal de nutrición, actividad, fuerza y progreso corporal (web + PWA).

- **Público objetivo:** personas adultas que entrenan o quieren cuidar su alimentación y prefieren entender sus datos antes que seguir dietas rígidas.
- **Propuesta de valor:** todo tu progreso —comida, movimiento y fuerza— en un solo lugar, explicado sin juicios.

**Sitio publicado (GitHub Pages):** https://naaria.github.io/move.pe/

Páginas: [Inicio](https://naaria.github.io/move.pe/) · [Precios](https://naaria.github.io/move.pe/precios.html) · [FAQ](https://naaria.github.io/move.pe/faq.html) · [Testimonios](https://naaria.github.io/move.pe/testimonios.html) · [Compra](https://naaria.github.io/move.pe/compra.html)

## Proyecto del Módulo 1 — Product Landing Page

**Sitio:** https://naaria.github.io/move.pe/ · **Repositorio:** https://github.com/naaria/move.pe

### Retos adicionales implementados

Cada reto se desarrolló en su propia rama y se integró a `main` con un Pull Request:

| Rama | Pull Request | Qué agrega |
| --- | --- | --- |
| `feature/form-validado` | [#1](https://github.com/naaria/move.pe/pull/1) | Tokens CSS + formulario de contacto con validación nativa (Lab 04) |
| `bootstrap` | [#2](https://github.com/naaria/move.pe/pull/2) | Página de compra con Bootstrap 5 |
| `tailwind` | [#3](https://github.com/naaria/move.pe/pull/3) | Testimonios y secciones del index con Tailwind CSS |
| `feature/hu1-calculadora-energia` | [#4](https://github.com/naaria/move.pe/pull/4) | HU1: calculadora de gasto energético en reposo |
| `feature/hu2-confirmacion-contacto` | [#5](https://github.com/naaria/move.pe/pull/5) | HU2: confirmación al enviar el formulario de contacto |
| `docs/readme-proyecto` | [#6](https://github.com/naaria/move.pe/pull/6) | Este README |

#### HU1: Calculadora de gasto energético en reposo

Como persona que quiere cuidar su alimentación, quiero calcular cuánta energía gasto en reposo para tener un punto de partida antes de registrarme en MOVE.

**Criterios de aceptación**
- La sección "Calculadora" del index pide sexo, edad, peso y talla, y muestra el gasto en reposo estimado en kcal/día con la ecuación de Mifflin–St Jeor (`10·peso + 6,25·talla − 5·edad + 5` en hombres, `− 161` en mujeres).
- Todos los campos son obligatorios y tienen rangos (edad 19–100, peso 30–300 kg, talla 120–230 cm). Fuera de rango, el navegador bloquea el cálculo con su mensaje nativo.
- El resultado se redondea a 10 kcal y se presenta como "estimado", sin juicios.
- Accesibilidad: `<label for>` en cada campo, `<fieldset>` + `<legend>` para el sexo, ayuda con `aria-describedby` y resultado anunciado con `role="status"`.
- Los datos no se guardan ni se envían.

#### HU2: Confirmación del formulario de contacto

Como persona que escribe a MOVE, quiero ver una confirmación clara cuando envío el formulario para saber que mi mensaje llegó y a qué correo me responderán.

**Criterios de aceptación**
- La confirmación solo aparece si el formulario pasa la validación nativa (vacío, email inválido o teléfono inválido siguen bloqueando el envío).
- El mensaje incluye nombre, motivo y correo; la página no se recarga y el formulario se limpia.
- Accesibilidad: región `role="status"` + `aria-live="polite"`, y el mensaje recibe el foco.
- Seguridad: el texto se arma con `textContent`, así el HTML escrito en un campo se muestra como texto.
- Se aclara que es una demostración: no se envía a ningún servidor.

#### Frameworks CSS

- **Bootstrap 5.3 en `compra.html`**: grilla `row`/`col-lg-*`, `form-control`, `form-select`, `form-check`, `btn-check` para elegir el plan, `alert` y validación con `.was-validated` + `.invalid-feedback`.
- **Tailwind CSS v4 en `index.html` y `testimonios.html`**: muro de testimonios (`grid`, `sm:grid-cols-2`, `lg:grid-cols-3`, `grid-flow-dense`, `col-span`, `row-span`), frase destacada, panel de testimonios del index, calculadora (HU1) y confirmación (HU2).

### Decisiones técnicas clave

1. **Un solo sistema de tokens para tres tecnologías.** Los colores, radios y sombras viven en `:root` (`css/styles.css`). Tailwind los lee directamente (`bg-(--color-accent)`, `rounded-(--radius)`) y Bootstrap a través de sus propias variables (`--bs-body-font-family`, `--bs-border-radius`, `--bs-btn-*`), que redefinimos en `.compra`. Resultado: las 5 páginas se ven como una sola marca y el modo oscuro funciona en todas cambiando solo los tokens (más `data-bs-theme` para Bootstrap).
2. **Capas de cascada para que los frameworks convivan.** El reset `* { margin: 0; padding: 0 }` está en `@layer reset`. Una capa tiene menos prioridad que el CSS sin capa, así las utilidades de Tailwind (que viven en sus propias capas) pueden aplicar su padding y margin. Los márgenes que agrega Bootstrap Reboot se anulan solo en header, footer e intro con `:where(...)`.
3. **Nombres de clase sin choques.** `.btn` y `.badge` existen en Bootstrap, así que las clases propias pasaron a `.btn-move` y `.plan-badge`.
4. **Validación nativa primero.** Los formularios usan `required`, `type`, `pattern`, `min`/`max` y `minlength`. El JavaScript de las HU solo actúa cuando el navegador ya validó (el evento `submit` no se dispara con campos inválidos). En compra se usa la API nativa `checkValidity()` con el estilo de Bootstrap.
5. **Ramas encadenadas.** Como `tailwind` y las HU modifican los mismos archivos que `bootstrap`, cada rama sale de la anterior y los PR se mergean en orden (#2 → #6). Así no hay conflictos.
6. **Tailwind con el build para navegador.** Se carga desde CDN, sin instalar Node ni compilar, lo que permite publicar en GitHub Pages tal cual. En un proyecto en producción se usaría el CLI de Tailwind para generar un CSS estático.

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

## Laboratorio 04 — CSS Variables, formulario validado y flujo Git

### Tokens CSS

Definidos en `:root` al inicio de `css/styles.css`. El modo oscuro solo redefine los tokens de color en `:root[data-theme="dark"]`; las reglas no cambian.

| Token | Valor | Dónde se usa |
| --- | --- | --- |
| `--color-primary` | `#171717` | Botones, íconos sociales, paneles oscuros (testimonios, resumen de compra) |
| `--color-accent` | `#ff7a2e` | Naranja MOVE: tarjeta de actividad, badge "Más popular", borde del plan Pro, subrayado del nav |
| `--color-accent-2` | `#a78bfa` | Lavanda MOVE: tarjeta de nutrición, botón "+" de FAQ, testimonio destacado |
| `--color-cream` | `#f6e7d9` | Plan Pro, tarjeta de progreso, fondo de respaldo de los degradados |
| `--color-text` | `#171717` | Texto base y enlaces del nav |
| `--color-text-muted` | `#5c5c5c` | Textos secundarios, listas de planes, pies de foto |
| `--color-link` | `#b8490c` | Links y hover del nav (naranja oscuro con contraste AA) |
| `--color-bg` | `#fbfaf8` | Fondo del body |
| `--color-bg-soft` | `#f3f1ed` | Footer, `faq-nav`, `details`, logos de clientes, inputs |
| `--color-surface` | `#ffffff` | Tarjetas de planes, formularios, etiquetas |
| `--color-border` | `#e8e6e2` | Bordes de planes, inputs, logos y divisores |
| `--color-focus` | `#6d28d9` | Contorno de foco para navegación con teclado |
| `--color-error` | `#c2255c` | Borde de campos inválidos (`:user-invalid`) |
| `--color-on-primary` | `#ffffff` | Texto sobre botones y fondos oscuros |
| `--color-panel-dark` | `#171717` | Panel de testimonios del index (Tailwind) |
| `--font-text` | `"Manrope", system-ui, sans-serif` | `body` |
| `--font-size` | `16px` | Tamaño base del `body` |
| `--font-size-title` | `2.5rem` | Precios de los planes y total del resumen de compra |
| `--font-size-display` | `clamp(2.75rem, 8vw, 4.75rem)` | Todos los `h1` (título destacado de cada página) |
| `--space-sm` / `--space-md` / `--space-lg` / `--space-xl` | `8px` / `16px` / `32px` / `64px` | `gap`, `padding` y `margin` en todo el sitio |
| `--radius-sm` | `14px` | Inputs, pies de foto de la galería |
| `--radius` | `24px` | Tarjetas, planes, testimonios, `details`, logos |
| `--radius-lg` | `32px` | Paneles grandes: hero, testimonios, contacto, CTA |
| `--radius-pill` | `999px` | Botones, etiquetas, badge |
| `--shadow-sm` | `0 1px 3px rgba(23,23,23,.08)` | Tarjetas y planes en reposo |
| `--shadow-md` | `0 12px 28px rgba(23,23,23,.15)` | Hover de tarjetas, planes y botones |
| `--shadow-lg` | `0 20px 48px rgba(23,23,23,.15)` | Formulario de contacto |

Estética nueva: sombra + `transform: translateY(-4px)` al pasar el mouse sobre `.card` y `.plan`, hover de color en el nav, footer con fondo suave y un mismo token para todos los `h1`.

### Validaciones del formulario de contacto (`index.html`)

Validación 100 % nativa de HTML, sin JavaScript. Los campos inválidos se marcan en rojo con `:user-invalid` solo después de que la persona interactúa.

| Campo | Atributos | Mensaje nativo del navegador (Chrome, español) |
| --- | --- | --- |
| Nombre | `required` `minlength="3"` | "Completa este campo" / "Aumenta la longitud del texto a 3 caracteres como mínimo" |
| Correo electrónico | `type="email"` `required` | "Incluye un signo "@" en la dirección de correo electrónico" |
| Teléfono | `type="tel"` `pattern="[0-9]{9}"` `required` | "Haz coincidir el formato solicitado: Ingresa 9 dígitos, por ejemplo 987654321" |
| Motivo del contacto | `<select required>` con primera opción `value=""` | "Selecciona un elemento de la lista" |
| Fecha preferida (reto) | `type="date"` | Calendario nativo; solo acepta fechas válidas |
| Mensaje | `required` `minlength="10"` | "Completa este campo" / "Aumenta la longitud del texto a 10 caracteres como mínimo" |
| Términos y condiciones | `<input type="checkbox" required>` | "Controla esta casilla si deseas continuar" |

### Flujo Git

1. Tokens y estética (Parte 1) commiteados en `main`.
2. Rama `feature/form-validado` creada desde `main` con `git checkout -b`.
3. Formulario validado y README commiteados en la rama.
4. `git push -u origin feature/form-validado` → Pull Request en GitHub → merge → `git pull` en `main` local.

### Funcionalidades extra de labs anteriores

**Modo oscuro.** Como persona que revisa la app de noche, quiero cambiar a modo oscuro para no cansar la vista.
- El botón ◐ del header alterna entre modo claro y oscuro en todas las páginas.
- La preferencia se recuerda al volver a entrar.
- Si no elegí nada, se respeta la preferencia del sistema operativo.
- El botón anuncia su estado con `aria-pressed`.

**Compra con plan preseleccionado.** Como persona interesada en un plan, quiero que la página de compra ya tenga elegido el plan que vi, para no repetir el paso.
- Cada botón de `precios.html` abre `compra.html?plan=<plan>`.
- El plan llega marcado y el resumen muestra su nombre, precio y beneficios.
- Si cambio de plan en el formulario, el resumen se actualiza al instante.

**Consulta por WhatsApp según el plan.** Como persona con dudas sobre un plan, quiero escribir por WhatsApp con un mensaje ya redactado para no tener que explicarlo.
- Cada plan tiene un enlace de WhatsApp con el mensaje "Hola, quiero el plan <plan> de MOVE".
- El enlace del resumen de compra cambia según el plan elegido.
- Los enlaces se abren en una pestaña nueva.

## Identidad visual

Paleta de marca: naranja `#FF7A2E`, lavanda `#A78BFA`, crema `#F6E7D9`, negro `#171717`, blanco `#FFFFFF` (ver tokens arriba).
Tipografía: Manrope. El degradado naranja-lavanda se reserva para el hero.

## Estructura

```
move.pe/
├── index.html
├── precios.html
├── faq.html
├── testimonios.html
├── compra.html
├── css/styles.css
├── js/theme.js
├── js/compra.js
├── js/calculadora.js
├── js/contacto.js
├── img/
└── README.md
```

## Créditos

- Foto del hero: [Unsplash](https://unsplash.com/) (foto `photo-1571019613454-1cb2f99b2d8b`, licencia Unsplash).
- Fotos de la galería: [Unsplash](https://unsplash.com/) (licencia Unsplash).
- Iconos de redes: [Simple Icons](https://simpleicons.org/) (CC0).
- Iconos de características y FAQ: [Lucide](https://lucide.dev/) (ISC).
- Logo, isotipo y degradado: marca MOVE.
- Frameworks: [Bootstrap 5.3](https://getbootstrap.com/) (MIT) y [Tailwind CSS v4](https://tailwindcss.com/) (MIT).
