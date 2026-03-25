# 🏗️ Plan de Infraestructura — Fullstack TypeScript + GitHub + Vercel

> **Versión:** 1.0  
> **Fecha:** Marzo 2026  
> **Arquitecto:** Plan generado como referencia técnica  
> **Stack:** Next.js · TypeScript · JSON Data Layer · GitHub · Vercel

---

## 📋 Tabla de Contenidos

1. [Visión General](#1-visión-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Repositorio](#3-estructura-del-repositorio)
4. [Capa de Datos (JSON como Base de Datos)](#4-capa-de-datos-json-como-base-de-datos)
5. [Configuración del Proyecto](#5-configuración-del-proyecto)
6. [Página Home — Hola Mundo con Efecto Elegante](#6-página-home--hola-mundo-con-efecto-elegante)
7. [Pipeline de CI/CD — GitHub + Vercel](#7-pipeline-de-cicd--github--vercel)
8. [Variables de Entorno](#8-variables-de-entorno)
9. [Checklist de Implementación](#9-checklist-de-implementación)
10. [Convenciones y Buenas Prácticas](#10-convenciones-y-buenas-prácticas)

---

## 1. Visión General

### Objetivo
Crear una aplicación web fullstack en TypeScript con las siguientes características:
- **Frontend:** Next.js con App Router y TypeScript estricto
- **Backend:** API Routes de Next.js (serverless, alojadas en Vercel)
- **Persistencia:** Archivos `.json` dentro de la carpeta `/data` como capa de datos
- **Despliegue:** Vercel conectado al repositorio GitHub (deploy automático)
- **Validación inicial:** Página Home con "Hola Mundo" centrado y efecto visual elegante

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENTE (Browser)                    │
│              Next.js App Router (TypeScript)             │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP / SSR / RSC
┌──────────────────────▼──────────────────────────────────┐
│                  VERCEL (Serverless)                     │
│         API Routes  /api/*  (TypeScript)                 │
│                                                         │
│    ┌────────────────────────────────────────────┐       │
│    │         DATA LAYER — /data/*.json          │       │
│    │   (read/write via fs en build time o ISR)  │       │
│    └────────────────────────────────────────────┘       │
└──────────────────────┬──────────────────────────────────┘
                       │ Git Push → Deploy automático
┌──────────────────────▼──────────────────────────────────┐
│                  GITHUB Repository                       │
│           main branch → producción                      │
│           develop branch → preview                      │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión recomendada |
|---|---|---|
| Framework | Next.js (App Router) | `^15.x` |
| Lenguaje | TypeScript | `^5.x` |
| Runtime | Node.js | `>=20.x` |
| Estilos | Tailwind CSS | `^3.x` |
| Animaciones | Framer Motion | `^11.x` |
| Linting | ESLint + typescript-eslint | latest |
| Formato | Prettier | `^3.x` |
| Gestor de paquetes | pnpm | `>=9.x` |
| Deploy | Vercel CLI / GitHub integration | latest |

---

## 3. Estructura del Repositorio

```
mi-proyecto/
│
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions (lint + typecheck)
│
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout global
│   ├── page.tsx                    # Home — Hola Mundo
│   ├── globals.css                 # Estilos globales + Tailwind
│   └── api/
│       └── data/
│           └── route.ts            # Ejemplo API Route que lee /data
│
├── components/
│   └── HolaMundo.tsx               # Componente con efecto elegante
│
├── data/                           # ⚡ Capa de datos JSON
│   ├── README.md                   # Documentación del esquema
│   └── config.json                 # Configuración general del sitio
│
├── lib/
│   └── dataLayer.ts                # Helper para leer/escribir archivos JSON
│
├── types/
│   └── index.ts                    # Tipos TypeScript globales
│
├── public/                         # Assets estáticos
│   └── favicon.ico
│
├── .env.local                      # Variables de entorno (no subir a Git)
├── .env.example                    # Plantilla de variables (sí subir)
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Capa de Datos (JSON como Base de Datos)

### Concepto
En lugar de una base de datos convencional, la carpeta `/data` actúa como almacén de información. Cada archivo `.json` representa una "colección" o "tabla".

### Archivo de ejemplo: `data/config.json`

```json
{
  "site": {
    "title": "Mi Proyecto",
    "description": "Aplicación fullstack TypeScript",
    "greeting": "Hola Mundo"
  },
  "meta": {
    "version": "1.0.0",
    "lastUpdated": "2026-03-25"
  }
}
```

### Helper de Data Layer: `lib/dataLayer.ts`

```typescript
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Lee un archivo JSON de la carpeta /data
 * @param filename - nombre del archivo sin extensión
 */
export function readData<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Escribe datos en un archivo JSON de la carpeta /data
 * @param filename - nombre del archivo sin extensión
 * @param data - datos a persistir
 */
export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
```

> ⚠️ **Nota importante sobre Vercel:** El sistema de archivos en Vercel es **de solo lectura** en producción (excepto `/tmp`). La carpeta `/data` se usa principalmente para **lectura estática** en build time o mediante ISR. Para escrituras en producción se recomienda usar `/tmp` o una solución externa. Para el alcance de este plan (datos estáticos de configuración), funciona perfectamente.

### Tipos: `types/index.ts`

```typescript
export interface SiteConfig {
  site: {
    title: string;
    description: string;
    greeting: string;
  };
  meta: {
    version: string;
    lastUpdated: string;
  };
}
```

---

## 5. Configuración del Proyecto

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModules": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Permite importar JSON directamente
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
```

### `package.json` (scripts clave)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

---

## 6. Página Home — Hola Mundo con Efecto Elegante

### `app/page.tsx`

```tsx
import { readData } from "@/lib/dataLayer";
import type { SiteConfig } from "@/types";
import HolaMundo from "@/components/HolaMundo";

export default function HomePage() {
  // Lectura de datos en Server Component (build time)
  const config = readData<SiteConfig>("config");

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <HolaMundo greeting={config.site.greeting} />
    </main>
  );
}
```

### `components/HolaMundo.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

interface HolaMundoProps {
  greeting: string;
}

export default function HolaMundo({ greeting }: HolaMundoProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Efecto de entrada: cada letra aparece con delay escalonado
    const letters = el.querySelectorAll("span");
    letters.forEach((letter, i) => {
      (letter as HTMLElement).style.animationDelay = `${i * 80}ms`;
      (letter as HTMLElement).classList.add("animate-letter");
    });
  }, []);

  const letters = greeting.split("").map((char, i) => (
    <span key={i} className="letter opacity-0 inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div className="text-center select-none">
      {/* Efecto de resplandor de fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-32 bg-white opacity-5 blur-3xl rounded-full" />
      </div>

      {/* Texto principal */}
      <h1
        ref={textRef}
        className="relative text-6xl md:text-8xl font-thin tracking-widest text-white uppercase"
        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.3em" }}
      >
        {letters}
      </h1>

      {/* Línea decorativa animada */}
      <div className="mt-8 flex justify-center">
        <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-0 animate-line" />
      </div>

      {/* Subtítulo */}
      <p
        className="mt-6 text-white/30 text-sm tracking-[0.5em] uppercase opacity-0 animate-subtitle"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        TypeScript · Next.js · Vercel
      </p>
    </div>
  );
}
```

### `app/globals.css` (animaciones elegantes)

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Animación letra a letra */
@keyframes letterFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) rotateX(-40deg);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
    filter: blur(0px);
  }
}

/* Animación línea decorativa */
@keyframes lineExpand {
  from { width: 0; }
  to   { width: 16rem; }
}

/* Animación subtítulo */
@keyframes subtitleFade {
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-letter {
  animation: letterFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-line {
  animation: lineExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
}

.animate-subtitle {
  animation: subtitleFade 0.8s ease 2s forwards;
}

* {
  box-sizing: border-box;
}
```

---

## 7. Pipeline de CI/CD — GitHub + Vercel

### Flujo de trabajo

```
Developer
   │
   ├── git push origin develop
   │        │
   │        └── Vercel Preview Deploy
   │              URL: https://mi-proyecto-git-develop-xxx.vercel.app
   │
   └── git push origin main  (o Pull Request merged)
            │
            └── Vercel Production Deploy
                  URL: https://mi-proyecto.vercel.app
```

### GitHub Actions: `.github/workflows/ci.yml`

```yaml
name: CI — TypeScript Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  typecheck-and-lint:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Instalar dependencias
        run: pnpm install --frozen-lockfile

      - name: TypeScript Check
        run: pnpm typecheck

      - name: ESLint
        run: pnpm lint
```

### Vinculación Vercel + GitHub

1. Ir a [vercel.com](https://vercel.com) → **Add New Project**
2. Seleccionar el repositorio de GitHub
3. Framework Preset: **Next.js** (auto-detectado)
4. Root Directory: `/` (raíz del proyecto)
5. Build Command: `pnpm build`
6. Output Directory: `.next` (por defecto)
7. Configurar variables de entorno (ver sección 8)
8. Click **Deploy** → ¡listo!

---

## 8. Variables de Entorno

### `.env.example` (versionar este archivo)

```bash
# ================================
# CONFIGURACIÓN GENERAL
# ================================
NEXT_PUBLIC_SITE_URL=https://mi-proyecto.vercel.app
NEXT_PUBLIC_SITE_NAME=Mi Proyecto

# ================================
# NODE
# ================================
NODE_ENV=production
```

### `.env.local` (NO versionar — agregar a .gitignore)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mi Proyecto (Dev)
NODE_ENV=development
```

### `.gitignore` (entradas clave)

```
.env.local
.env*.local
.next/
node_modules/
```

---

## 9. Checklist de Implementación

### Fase 1 — Inicialización del proyecto

- [ ] `pnpm create next-app@latest mi-proyecto --typescript --tailwind --app --no-src-dir`
- [ ] Crear estructura de carpetas (`/data`, `/lib`, `/types`, `/components`)
- [ ] Configurar `tsconfig.json` con `strict: true`
- [ ] Instalar dependencias adicionales: `framer-motion`, `prettier`
- [ ] Crear `data/config.json` con datos iniciales
- [ ] Implementar `lib/dataLayer.ts`
- [ ] Definir tipos en `types/index.ts`

### Fase 2 — Desarrollo del Home

- [ ] Implementar `components/HolaMundo.tsx` con animaciones
- [ ] Actualizar `app/globals.css` con keyframes
- [ ] Conectar `app/page.tsx` con `readData` y `SiteConfig`
- [ ] Validar que TypeScript compila sin errores (`pnpm typecheck`)
- [ ] Probar efecto visual en `localhost:3000`

### Fase 3 — Repositorio GitHub

- [ ] `git init` + primer commit
- [ ] Crear repositorio en GitHub (público o privado)
- [ ] `git remote add origin https://github.com/usuario/mi-proyecto.git`
- [ ] Crear rama `develop`
- [ ] Subir ramas: `git push -u origin main` y `git push -u origin develop`
- [ ] Agregar `.github/workflows/ci.yml`

### Fase 4 — Despliegue Vercel

- [ ] Conectar repo de GitHub en Vercel
- [ ] Configurar variables de entorno en el dashboard de Vercel
- [ ] Ejecutar primer deploy de producción
- [ ] Verificar URL de producción funciona correctamente
- [ ] Verificar que un push a `develop` genera Preview URL
- [ ] Confirmar que TypeScript está validado end-to-end en Vercel

### Fase 5 — Validación final

- [ ] El sitio muestra "Hola Mundo" centrado verticalmente y horizontalmente
- [ ] El efecto de animación por letras funciona correctamente
- [ ] La línea decorativa se expande con elegancia
- [ ] No hay errores de TypeScript en build (`pnpm build` exitoso)
- [ ] GitHub Actions pasa en verde
- [ ] El deploy en Vercel es exitoso sin warnings críticos

---

## 10. Convenciones y Buenas Prácticas

### TypeScript
- Usar `strict: true` en `tsconfig.json` siempre
- Evitar `any`; preferir `unknown` y hacer type guards
- Tipar todos los componentes con `interface` o `type` explícitos
- Los Server Components no necesitan `"use client"` — solo agregarlo cuando se usen hooks o eventos del browser

### Estructura de archivos
- Componentes en `PascalCase.tsx`
- Utilidades y helpers en `camelCase.ts`
- Archivos JSON en `kebab-case.json`

### Git
- Commits en español o inglés, formato convencional: `feat:`, `fix:`, `docs:`, `chore:`
- Ejemplo: `feat: agregar componente HolaMundo con animación elegante`
- Nunca hacer push directo a `main`; usar Pull Requests

### Data Layer
- Cada "colección" = un archivo `.json` separado en `/data`
- Siempre tipar la respuesta de `readData<T>()` con un type/interface
- Documentar el esquema de cada archivo en `data/README.md`

---

## 📌 Resumen Ejecutivo

| Aspecto | Decisión |
|---|---|
| Framework | Next.js 15 con App Router |
| Lenguaje | TypeScript 5 estricto |
| Estilos | Tailwind CSS + CSS Keyframes custom |
| Datos | Archivos JSON en `/data` + helper `dataLayer.ts` |
| Deploy | Vercel (producción: `main`, preview: `develop`) |
| CI | GitHub Actions — typecheck + lint en cada push |
| Home | "Hola Mundo" centrado, animación letra a letra + glow |

---

*Documento generado como plan de infraestructura técnica — Versión 1.0*
