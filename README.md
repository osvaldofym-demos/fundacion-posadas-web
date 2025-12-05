# Fundación Posadas - Next.js + Strapi

Sitio web de Fundación Posadas con CMS headless.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con la URL de tu Strapi.

### 3. Iniciar desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📦 Estructura del Proyecto

```
fundacion-posadas-nextjs/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página de inicio
│   └── globals.css     # Estilos globales
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── BentoGrid.tsx
│   ├── Iniciativas.tsx
│   ├── Donation.tsx
│   ├── Newsletter.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── ImpactMessage.tsx
│   └── TaxSection.tsx
├── lib/
│   └── strapi.ts       # Cliente de Strapi
├── types/
│   └── strapi.ts       # Tipos TypeScript
├── public/
│   └── assets/         # Imágenes estáticas
└── ...
```

---

## 🔧 Configuración de Strapi

### Colecciones a crear:

#### 1. Hero Slides (hero-slides)
- `titulo` (Text)
- `subtitulo` (Text)
- `imagen` (Media - Single)
- `textoBoton` (Text)
- `orden` (Number)

#### 2. Iniciativas (iniciativas)
- `nombre` (Text)
- `slug` (UID from nombre)
- `descripcionCorta` (Text)
- `descripcionLarga` (Rich Text)
- `imagen` (Media - Single)
- `color` (Text) - Ej: #8B7355
- `stats` (Component - Repeatable) → shared.stat
- `comoAyudamos` (Component - Repeatable) → shared.ayuda-item
- `orden` (Number)

#### 3. Stats Generales (stats-generales)
- `numero` (Text) - Ej: "10,000+"
- `etiqueta` (Text)
- `orden` (Number)

#### 4. Testimonios (testimonios)
- `quote` (Text - Long)
- `autor` (Text)
- `año` (Text)
- `activo` (Boolean)

#### 5. Configuracion (Single Type)
- `logoBlanco` (Media)
- `logoColor` (Media)
- `telefono` (Text)
- `email` (Email)
- `direccion` (Text)
- `montosDonacion` (JSON) - [50, 100, 200, 500, 1000]
- `redesSociales` (Component - Repeatable) → shared.red-social

### Componentes:

#### shared.stat
- `numero` (Text)
- `etiqueta` (Text)

#### shared.ayuda-item
- `texto` (Text)

#### shared.red-social
- `nombre` (Text)
- `url` (Text)
- `icono` (Text)

---

## 🔐 API Token

1. En Strapi, ve a **Settings > API Tokens**
2. Crea un nuevo token con permisos de **Read** para:
   - hero-slides
   - iniciativas
   - stats-generales
   - testimonios
   - configuracion
3. Copia el token a tu `.env.local`

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm run build
vercel deploy
```

Configura las variables de entorno en Vercel Dashboard.

### Netlify

```bash
npm run build
```

Sube la carpeta `.next` o usa el CLI de Netlify.

---

## 📝 Notas

- El sitio funciona sin Strapi usando datos por defecto
- Las imágenes deben estar en `/public/assets/` como fallback
- Los estilos están en `globals.css` (CSS vanilla)
- Revalidación automática cada 60 segundos

---

## 🎨 Personalización

### Colores principales

```css
--color-primary: #8B7355;    /* Dorado/Café */
--color-secondary: #5BA88F;  /* Verde */
--color-accent: #E07B54;     /* Naranja */
```

### Tipografía

- **Montserrat** (Google Fonts)
- Pesos: 300, 400, 500, 600, 700, 800

---

## 📞 Soporte

¿Preguntas? Contacta al equipo de desarrollo.
