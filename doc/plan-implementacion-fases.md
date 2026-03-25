# Plan de Implementación por Fases
## Fullstack TypeScript · Next.js + Vercel + GitHub + JSON Data Layer

> **Stack:** Next.js 14+ · TypeScript strict · Tailwind CSS · Framer Motion · Zod · Vercel · GitHub  
> **Duración total estimada:** ~9 horas  
> **Objetivo final:** Home "Hola Mundo" animado desplegado en producción con pipeline CI/CD funcional

---

## Tabla de Fases

| Fase | Nombre | Duración | Objetivo |
|------|--------|----------|----------|
| **0** | Configuración del entorno local | ~1h | Node, Git, VS Code, cuentas en la nube |
| **1** | Inicialización del proyecto | ~2h | create-next-app, TypeScript, linting, primer commit |
| **2** | JSON Data Layer + Tipos | ~1.5h | `/data`, schemas Zod, helper `readJsonData<T>` |
| **3** | UI + API Route | ~3h | Componente animado, `page.tsx`, `GET /api/home` |
| **4** | Deploy CI/CD con Vercel | ~1.5h | Pipeline automático en producción |

---

## Fase 0 — Configuración del Entorno Local

> **Duración:** ~1h  
> Antes de escribir código, asegúrate de tener el entorno correcto. Esta fase evita el 80% de los problemas de configuración.

### Paso 0.1 — Instalar Node.js 20 LTS

Descargar desde [nodejs.org](https://nodejs.org) o instalar via `nvm`:

```bash
nvm install 20
nvm use 20
node -v   # debe mostrar v20.x.x
npm -v    # debe mostrar 10.x
```

### Paso 0.2 — Configurar Git

```bash
git --version   # debe mostrar 2.40+
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 0.3 — VS Code + Extensiones recomendadas

Instalar las siguientes extensiones desde el Marketplace:

- `bradlc.vscode-tailwindcss` — Tailwind IntelliSense
- `esbenp.prettier-vscode` — Prettier formatter
- `dbaeumer.vscode-eslint` — ESLint
- `ms-vscode.vscode-typescript-next` — TypeScript actualizado
- `christian-kohler.path-intellisense` — Path IntelliSense
- `formulahendry.auto-rename-tag` — Auto Rename Tag

### Paso 0.4 — Crear cuentas en GitHub y Vercel

1. Crear cuenta en [github.com](https://github.com) si no existe.
2. Crear cuenta en [vercel.com](https://vercel.com) usando **Continue with GitHub** para vincular ambas plataformas automáticamente.

### ✅ Checklist Fase 0

- [ ] `node -v` muestra v20.x.x o superior
- [ ] `npm -v` muestra 10.x o superior
- [ ] `git -v` muestra 2.40 o superior
- [ ] VS Code reconoce TypeScript en archivos `.ts` (hover muestra tipos)
- [ ] Sesión activa en GitHub y Vercel vinculados con la misma cuenta

---

## Fase 1 — Inicialización del Proyecto

> **Duración:** ~2h  
> Al finalizar esta fase tendrás un proyecto Next.js 14 con TypeScript estricto, Tailwind, Husky y ESLint corriendo en `localhost:3000`.

### Paso 1.1 — Crear el proyecto con create-next-app

```bash
npx create-next-app@latest mi-proyecto
```

Seleccionar las siguientes opciones en el asistente:

| Pregunta | Respuesta |
|----------|-----------|
| TypeScript | ✅ Yes |
| ESLint | ✅ Yes |
| Tailwind CSS | ✅ Yes |
| `src/` directory | ❌ No |
| App Router | ✅ Yes |
| Import alias (`@/*`) | ✅ Yes |

```bash
cd mi-proyecto
```

### Paso 1.2 — Instalar dependencias adicionales

```bash
# Dependencias de producción
npm install zod framer-motion

# DevDependencies
npm install -D prettier husky lint-staged
```

### Paso 1.3 — Verificar y ajustar tsconfig.json

Confirmar que los siguientes valores estén presentes:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "strict": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

> ⚠️ `"strict": true` es obligatorio — nunca desactivarlo.

### Paso 1.4 — Crear .prettierrc

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Paso 1.5 — Inicializar Husky + lint-staged

```bash
npx husky init
```

Editar `.husky/pre-commit` para que ejecute `lint-staged`:

```bash
npx lint-staged
```

Agregar configuración de `lint-staged` en `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### Paso 1.6 — Agregar scripts al package.json

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "validate": "npm run type-check && npm run lint"
  }
}
```

### Paso 1.7 — Crear repositorio GitHub y primer commit

```bash
git init   # (si create-next-app no lo inicializó)
git add .
git commit -m "chore: initial project setup"

# Crear repo en GitHub y vincularlo
git remote add origin https://github.com/tu-usuario/mi-proyecto.git
git branch -M main
git push -u origin main
```

### Paso 1.8 — Crear .env.example

```env
# === CONFIGURACIÓN DEL SITIO ===
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_SITE_NAME=Mi Proyecto

# === ENTORNO ===
NODE_ENV=development
```

> ⚠️ Asegúrate de que `.env.local` esté en `.gitignore` y **nunca** se suba al repositorio.

### ✅ Checklist Fase 1

- [ ] `npm run dev` arranca sin errores en `localhost:3000`
- [ ] `npm run type-check` pasa sin errores
- [ ] `npm run lint` pasa sin errores
- [ ] Al hacer un commit, Husky ejecuta `lint-staged` automáticamente
- [ ] El repositorio tiene al menos 1 commit visible en GitHub
- [ ] `.env.local` NO está en el repositorio

---

## Fase 2 — JSON Data Layer + Tipos

> **Duración:** ~1.5h  
> El JSON Data Layer es el núcleo de la arquitectura. Toda la aplicación lee datos desde archivos JSON validados con Zod, garantizando type-safety de extremo a extremo.

### Estructura de carpetas a crear

```
mi-proyecto/
├── data/                     ← crear carpeta nueva
│   ├── config.json           # configuración global del sitio
│   ├── home.json             # contenido de la página principal
│   └── README.md             # documentación del schema
└── lib/                      ← crear carpeta nueva
    ├── schemas.ts            # schemas Zod + tipos inferidos
    ├── data.ts               # helper readJsonData<T>
    └── types.ts              # interfaces globales adicionales
```

### Paso 2.1 — Crear /data/config.json

```json
{
  "site": {
    "name": "Mi Proyecto",
    "version": "1.0.0",
    "description": "Sistema Fullstack TypeScript",
    "locale": "es-CO",
    "theme": "dark"
  },
  "features": {
    "animations": true,
    "darkMode": true
  }
}
```

### Paso 2.2 — Crear /data/home.json

```json
{
  "hero": {
    "greeting": "Hola Mundo",
    "subtitle": "Sistema Fullstack TypeScript funcionando correctamente",
    "version": "v1.0.0",
    "animationStyle": "fadeInUp",
    "showVersion": true
  },
  "meta": {
    "title": "Home | Mi Proyecto",
    "description": "Página principal del sistema"
  }
}
```

### Paso 2.3 — Crear /lib/schemas.ts

```typescript
import { z } from 'zod';

export const HomeSchema = z.object({
  hero: z.object({
    greeting: z.string(),
    subtitle: z.string(),
    version: z.string(),
    animationStyle: z.enum(['fadeInUp', 'fadeIn', 'slideIn']),
    showVersion: z.boolean(),
  }),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const ConfigSchema = z.object({
  site: z.object({
    name: z.string(),
    version: z.string(),
    description: z.string(),
    locale: z.string(),
    theme: z.enum(['dark', 'light', 'system']),
  }),
  features: z.object({
    animations: z.boolean(),
    darkMode: z.boolean(),
  }),
});

// Tipos inferidos automáticamente desde los schemas
export type HomeData = z.infer<typeof HomeSchema>;
export type ConfigData = z.infer<typeof ConfigSchema>;
```

### Paso 2.4 — Crear /lib/data.ts

```typescript
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

/**
 * Lee un archivo JSON de la carpeta /data y lo valida con un schema Zod.
 * Garantiza tipado seguro en toda la aplicación.
 */
export function readJsonData<T>(
  filename: string,
  schema: z.ZodSchema<T>
): T {
  const filePath = path.join(process.cwd(), 'data', filename);

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return schema.parse(parsed);
  } catch (error) {
    throw new Error(`Error leyendo ${filename}: ${error}`);
  }
}
```

### Paso 2.5 — Crear /data/README.md

```markdown
# Data Layer — Documentación

## Reglas
1. Todo archivo JSON debe tener su schema Zod en `/lib/schemas.ts`
2. Nunca modificar JSON directamente en producción
3. Los cambios a datos se hacen vía PR en GitHub
4. Cada JSON debe ser válido y estar bien formateado

## Archivos
- `config.json` — Configuración global del sitio
- `home.json` — Contenido de la página principal
```

### ✅ Checklist Fase 2

- [ ] `/data/home.json` existe y es JSON válido (validar en jsonlint.com)
- [ ] `/data/config.json` existe y es JSON válido
- [ ] `npm run type-check` compila los schemas sin errores
- [ ] Los tipos `HomeData` y `ConfigData` se infieren correctamente (VS Code muestra tipos en hover)
- [ ] La función `readJsonData` no lanza errores al llamarse con datos válidos

---

## Fase 3 — UI + API Route

> **Duración:** ~3h  
> Al terminar esta fase, la aplicación estará completamente funcional en local: UI animada, datos servidos desde JSON y el endpoint `GET /api/home` respondiendo correctamente.

### Archivos a crear o modificar

```
mi-proyecto/
├── components/               ← crear carpeta nueva
│   └── HolaMundo.tsx         # componente animado con Framer Motion
└── app/
    ├── page.tsx              # reemplazar contenido existente
    ├── layout.tsx            # actualizar con font Inter y lang="es"
    └── api/
        └── home/             ← crear carpeta nueva
            └── route.ts      # GET /api/home → lee home.json
```

### Paso 3.1 — Crear /app/api/home/route.ts

```typescript
import { NextResponse } from 'next/server';
import { readJsonData } from '@/lib/data';
import { HomeSchema, type HomeData } from '@/lib/schemas';

export const dynamic = 'force-static';

export async function GET(): Promise<NextResponse<HomeData>> {
  const homeData = readJsonData('home.json', HomeSchema);
  return NextResponse.json(homeData);
}
```

### Paso 3.2 — Crear /components/HolaMundo.tsx

```typescript
'use client';

import { motion } from 'framer-motion';
import type { HomeData } from '@/lib/schemas';

interface HolaMundoProps {
  data: HomeData;
}

export default function HolaMundo({ data }: HolaMundoProps) {
  const { hero } = data;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

      {/* Efecto glow de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-6"
      >
        {/* Línea decorativa superior */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"
        />

        {/* Texto principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-7xl md:text-9xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {hero.greeting}
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 text-slate-400 text-lg md:text-xl font-light tracking-wide"
        >
          {hero.subtitle}
        </motion.p>

        {/* Badge de versión */}
        {hero.showVersion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-2 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-400 text-sm font-mono">
              TypeScript {hero.version} — Online
            </span>
          </motion.div>
        )}

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-8"
        />
      </motion.div>
    </main>
  );
}
```

### Paso 3.3 — Actualizar /app/page.tsx

```typescript
import { readJsonData } from '@/lib/data';
import { HomeSchema } from '@/lib/schemas';
import HolaMundo from '@/components/HolaMundo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = readJsonData('home.json', HomeSchema);
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

export default function HomePage() {
  const homeData = readJsonData('home.json', HomeSchema);
  return <HolaMundo data={homeData} />;
}
```

### Paso 3.4 — Actualizar /app/layout.tsx

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mi Proyecto',
  description: 'Sistema Fullstack TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### ✅ Checklist Fase 3 — Milestone 1 completo en local

- [ ] `localhost:3000` — "Hola Mundo" centrado vertical y horizontalmente con gradiente de fondo
- [ ] Animación fadeInUp funciona correctamente al cargar la página
- [ ] Badge de versión muestra "Online" con pulso verde animado
- [ ] `localhost:3000/api/home` retorna JSON con estructura de `HomeData`
- [ ] Metadata del `<head>` viene de `home.json` (verificar con DevTools → Elements)
- [ ] `npm run build` completa sin errores de tipos ni de ESLint
- [ ] Consola del navegador sin errores de hidratación

---

## Fase 4 — Deploy CI/CD con Vercel

> **Duración:** ~1.5h  
> ⚠️ En producción (Vercel serverless), el sistema de archivos es de **solo lectura**. La carpeta `/data` funciona perfectamente para lectura estática, que es todo lo que necesitamos en este milestone.

### Paso 4.1 — Crear vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run validate && npm run build",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate=300"
        }
      ]
    }
  ]
}
```

> `"regions": ["gru1"]` despliega en **São Paulo, Brasil** — el edge más cercano a Colombia.

Hacer commit de este archivo antes de conectar Vercel:

```bash
git add vercel.json
git commit -m "chore: add vercel configuration"
git push origin main
```

### Paso 4.2 — Conectar repositorio a Vercel

1. Ir a [vercel.com](https://vercel.com) → **Add New Project**
2. Importar el repositorio desde GitHub
3. Framework Preset: **Next.js** (detectado automáticamente)
4. Root Directory: `.` (raíz del repositorio)
5. Build Command: se toma de `vercel.json` automáticamente
6. Click **Deploy**

### Paso 4.3 — Configurar variables de entorno en Vercel

En **Settings → Environment Variables** del proyecto:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://tu-proyecto.vercel.app` | Production, Preview |
| `NEXT_PUBLIC_SITE_NAME` | `Mi Proyecto` | Production, Preview |

> Las variables `VERCEL_URL` y `VERCEL_ENV` las inyecta Vercel automáticamente.

### Paso 4.4 — Crear rama develop

```bash
git checkout -b develop
git push origin develop
```

Vercel detecta la nueva rama y crea un **preview deployment** automáticamente.

### Flujo de trabajo Git

```
feature/nueva-funcionalidad
        ↓  PR → revisión
develop (preview en Vercel)
        ↓  PR → aprobación
main    (producción en Vercel) ✅
```

| Rama | Comportamiento en Vercel |
|------|--------------------------|
| `main` | Deploy a **producción** (URL permanente) |
| `develop` | Deploy a **preview** (URL temporal) |
| `feature/*` | Deploy a **preview** por PR (URL temporal) |

### Paso 4.5 — Convención de commits (Conventional Commits)

```bash
# Ejemplos de mensajes válidos
feat: agregar componente de navegación
fix: corregir lectura de home.json en producción
docs: actualizar README con instrucciones de deploy
chore: actualizar dependencias de seguridad
style: formatear archivos con prettier
refactor: extraer lógica de lectura JSON a helper
```

### Paso 4.6 — Probar el pipeline completo

```bash
# Hacer un cambio mínimo para verificar el pipeline
# Editar home.json: cambiar subtitle a "Pipeline CI/CD funcionando"

git add data/home.json
git commit -m "test: verify CI/CD pipeline"
git push origin main
```

Verificar en el dashboard de Vercel que el deploy se dispara automáticamente en menos de 2 minutos.

### ✅ Checklist Fase 4 — Milestone completo en producción

- [ ] URL de Vercel accesible públicamente y muestra "Hola Mundo" con animación
- [ ] `https://tu-proyecto.vercel.app/api/home` retorna JSON correcto
- [ ] Push a `main` dispara deploy automático en Vercel (verificar en dashboard)
- [ ] Rama `develop` tiene su propio preview deployment activo
- [ ] Logs de build en Vercel sin errores ni warnings críticos
- [ ] `npm run validate` (type-check + lint) pasa como parte del buildCommand
- [ ] El sistema TypeScript end-to-end funciona: cambio en JSON → commit → deploy → visible en producción

---

## Comandos de Referencia Rápida

```bash
# Desarrollo local
npm run dev           # servidor de desarrollo con Turbopack
npm run build         # build de producción
npm run start         # iniciar servidor de producción local

# Calidad de código
npm run type-check    # verificar tipos TypeScript (sin emitir)
npm run lint          # linting con ESLint
npm run lint:fix      # linting con corrección automática
npm run format        # formatear código con Prettier
npm run validate      # type-check + lint (ejecutado en CI)
```

---

## Roadmap de Expansión (Post-Milestone 1)

Una vez validado el funcionamiento con el Home "Hola Mundo", el sistema está listo para escalar:

### Fase 5 — Contenido dinámico
- [ ] Página `/about` con datos desde `data/about.json`
- [ ] Componente de navegación con links desde `data/navigation.json`
- [ ] Sistema de temas (dark/light) persistido en cookies

### Fase 6 — Funcionalidades avanzadas
- [ ] Blog/artículos con `data/posts/*.json`
- [ ] Sistema de búsqueda sobre archivos JSON
- [ ] Middleware de autenticación básica
- [ ] Formulario de contacto con envío por email (Resend)

### Fase 7 — Escalabilidad de datos
- [ ] Migración de `/data` a **Vercel KV** (Redis) para escrituras en producción
- [ ] Integración con **PlanetScale / Neon** (Postgres serverless)
- [ ] Cache con `unstable_cache` de Next.js

---

*Plan generado para implementación Fullstack TypeScript · Next.js + Vercel + GitHub + JSON Data Layer*  
*Scope inicial: Home "Hola Mundo" con efecto de animación elegante · v1.0.0*
