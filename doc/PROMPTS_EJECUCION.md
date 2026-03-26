# 🤖 Prompts de Ejecución — Plan Fullstack TypeScript
> **Proyecto:** Next.js + Vercel + GitHub + JSON Data Layer  
> **Uso:** Copiar y pegar cada prompt completo en el chat de IA al iniciar cada fase.  
> **Orden de ejecución:** Fase 0 → 1 → 2 → 3 → 4 (no saltarse fases)

---

## ⚠️ Instrucciones de uso

1. Antes de ejecutar cualquier prompt, tener los tres documentos accesibles:
   - `plan-implementacion-fases.md`
   - `PLAN_INFRAESTRUCTURA.md`
   - `ESTADO_EJECUCION.md`
2. Copiar el prompt completo de la fase correspondiente.
3. Adjuntar o pegar el contenido de los tres documentos al enviarlo.
4. Al finalizar la fase, actualizar `ESTADO_EJECUCION.md` con el resultado.
5. El agente generará automáticamente el archivo `RESUMEN_FASE_X.md` al cerrar cada fase.

---

---

## 📦 PROMPT — FASE 0: Configuración del Entorno Local

```
ROL Y SKILL:
Actúa como un Ingeniero DevOps Senior con experiencia en configuración de entornos de desarrollo para proyectos TypeScript modernos. Eres meticuloso, verificas cada paso antes de avanzar y anticipas problemas de compatibilidad entre herramientas.

DOCUMENTOS DE REFERENCIA — LEER ANTES DE ACTUAR:
Tienes acceso a tres documentos que DEBES leer completamente antes de ejecutar cualquier acción:
1. plan-implementacion-fases.md — contiene los pasos detallados de la Fase 0
2. PLAN_INFRAESTRUCTURA.md — contiene el stack tecnológico y las versiones recomendadas
3. ESTADO_EJECUCION.md — contiene el historial de ejecución y el estado actual del proyecto

REGISTRO DE INICIO — ACCIÓN OBLIGATORIA:
Antes de cualquier otra cosa, actualiza el archivo ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 0 de "⬜ Pendiente" a "🟡 En progreso"
- Registra la fecha y hora actual en "Fecha/Hora de inicio" de la Fase 0
- Actualiza el "Estado general" del proyecto a "🟡 En progreso"
Confirma en tu respuesta que este registro fue realizado antes de continuar.

OBJETIVO DE ESTA FASE:
Configurar el entorno local completo para el desarrollo del proyecto. Esta fase no produce código de aplicación, produce un entorno funcional y verificado.

TAREAS A EJECUTAR:
Sigue estrictamente los pasos 0.1 a 0.4 del plan-implementacion-fases.md:
- Paso 0.1: Guiar la instalación de Node.js 20 LTS (via nvm preferentemente)
- Paso 0.2: Configurar Git con usuario y email globales
- Paso 0.3: Instalar VS Code y las 6 extensiones recomendadas en el plan
- Paso 0.4: Verificar creación de cuentas GitHub y Vercel vinculadas

Para cada paso:
- Proporciona el comando exacto a ejecutar
- Indica cómo verificar que el paso fue exitoso
- Documenta si el paso ya estaba hecho (no volver a hacerlo)

CHECKLIST DE VALIDACIÓN:
Al terminar todos los pasos, ejecuta y documenta el resultado de cada ítem del checklist de la Fase 0:
- node -v → debe mostrar v20.x.x o superior
- npm -v → debe mostrar 10.x o superior
- git -v → debe mostrar 2.40 o superior
- VS Code reconoce TypeScript en archivos .ts
- Sesión activa en GitHub y Vercel vinculados

REGISTRO DE CIERRE — ACCIÓN OBLIGATORIA:
Al completar todos los pasos y validar el checklist, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 0 a "✅ Completada" (o "❌ Bloqueada" si hubo problema sin resolver)
- Registra la fecha y hora en "Fecha/Hora de fin"
- Registra el resultado (Exitoso / Parcial / Bloqueado)
- Documenta en "Problemas encontrados" cualquier inconveniente y su solución
- Marca los ítems completados del checklist
- Escribe las notas finales

GENERACIÓN DEL RESUMEN DE FASE — ACCIÓN OBLIGATORIA AL CERRAR:
Crea el archivo RESUMEN_FASE_0.md con la siguiente estructura:
---
# Resumen de Ejecución — Fase 0: Configuración del Entorno Local
**Fecha de ejecución:** (fecha)
**Resultado:** (Exitoso / Parcial / Bloqueado)
## Lo que se hizo
(descripción clara de cada paso ejecutado)
## Versiones instaladas y verificadas
(tabla con herramienta y versión confirmada)
## Problemas encontrados y soluciones
(si los hubo)
## Estado del entorno al finalizar
(descripción del entorno listo para la Fase 1)
## Checklist final
(ítems marcados con resultado real)
---

RESTRICCIONES:
- No avances a la Fase 1 bajo ninguna circunstancia en este prompt
- Si encuentras un bloqueo que impide completar un paso, documéntalo y detente
- Verifica siempre con comandos reales, no asumas que algo ya está instalado
```

---

---

## 🏗️ PROMPT — FASE 1: Inicialización del Proyecto

```
ROL Y SKILL:
Actúa como un Ingeniero Fullstack Senior especializado en Next.js, TypeScript estricto y configuración de proyectos de producción. Conoces a fondo las mejores prácticas de tooling moderno: Husky, lint-staged, Prettier, ESLint y estructuras de monorepo. Tu código siempre pasa type-check desde el primer commit.

DOCUMENTOS DE REFERENCIA — LEER ANTES DE ACTUAR:
Tienes acceso a tres documentos que DEBES leer completamente antes de ejecutar cualquier acción:
1. plan-implementacion-fases.md — contiene los pasos 1.1 a 1.8 de la Fase 1
2. PLAN_INFRAESTRUCTURA.md — contiene la estructura del repositorio y configuraciones base
3. ESTADO_EJECUCION.md — contiene el estado actual y el historial de todas las fases anteriores

Verifica en ESTADO_EJECUCION.md que la Fase 0 está en estado ✅ Completada antes de continuar. Si no lo está, detente e informa.

REGISTRO DE INICIO — ACCIÓN OBLIGATORIA:
Antes de cualquier otra cosa, actualiza el archivo ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 1 de "⬜ Pendiente" a "🟡 En progreso"
- Registra la fecha y hora actual en "Fecha/Hora de inicio" de la Fase 1
Confirma en tu respuesta que este registro fue realizado antes de continuar.

OBJETIVO DE ESTA FASE:
Crear el proyecto Next.js 14+ con TypeScript estricto, configurar todas las herramientas de calidad de código y realizar el primer commit al repositorio de GitHub.

TAREAS A EJECUTAR:
Sigue estrictamente los pasos 1.1 a 1.8 del plan-implementacion-fases.md:
- Paso 1.1: create-next-app con las opciones exactas definidas en el plan
- Paso 1.2: Instalar zod, framer-motion, prettier, husky, lint-staged
- Paso 1.3: Verificar y ajustar tsconfig.json (strict: true es obligatorio)
- Paso 1.4: Crear .prettierrc con la configuración del plan
- Paso 1.5: Inicializar Husky + lint-staged con pre-commit hook
- Paso 1.6: Agregar todos los scripts al package.json
- Paso 1.7: Crear repositorio en GitHub y realizar primer commit
- Paso 1.8: Crear .env.example

Para cada archivo creado o modificado, documenta en ESTADO_EJECUCION.md la tabla "Archivos creados / modificados" con el nombre, la acción y las notas relevantes.

CHECKLIST DE VALIDACIÓN:
Al terminar, ejecuta y documenta el resultado de cada ítem:
- npm run dev arranca sin errores en localhost:3000
- npm run type-check pasa sin errores
- npm run lint pasa sin errores
- Al hacer un commit, Husky ejecuta lint-staged automáticamente
- El repositorio tiene al menos 1 commit visible en GitHub
- .env.local NO está en el repositorio

REGISTRO DE CIERRE — ACCIÓN OBLIGATORIA:
Al completar todos los pasos y validar el checklist, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 1 a "✅ Completada" (o "❌ Bloqueada" si hubo problema)
- Registra la fecha y hora en "Fecha/Hora de fin"
- Registra el resultado y cualquier problema encontrado
- Marca los ítems del checklist con su resultado real
- Escribe las notas finales de la fase

GENERACIÓN DEL RESUMEN DE FASE — ACCIÓN OBLIGATORIA AL CERRAR:
Crea el archivo RESUMEN_FASE_1.md con la siguiente estructura:
---
# Resumen de Ejecución — Fase 1: Inicialización del Proyecto
**Fecha de ejecución:** (fecha)
**Resultado:** (Exitoso / Parcial / Bloqueado)
## Lo que se hizo
(descripción de cada paso ejecutado con detalles relevantes)
## Estructura del proyecto creada
(árbol de directorios y archivos generados)
## Dependencias instaladas
(tabla con paquete, versión y propósito)
## Configuraciones aplicadas
(resumen de tsconfig, prettierrc, husky, lint-staged)
## Repositorio GitHub
(URL del repositorio, rama main, primer commit)
## Problemas encontrados y soluciones
(si los hubo)
## Checklist final
(ítems marcados con resultado real)
## Estado para la Fase 2
(descripción de lo que está listo para continuar)
---

RESTRICCIONES:
- No toques archivos de UI ni de datos en este prompt (eso es Fase 2 y 3)
- Si npm run type-check falla al final, no cierres la fase hasta resolverlo
- El .env.local nunca debe aparecer en el repositorio
```

---

---

## 🗄️ PROMPT — FASE 2: JSON Data Layer + Tipos

```
ROL Y SKILL:
Actúa como un Ingeniero Backend Senior con especialización en TypeScript estricto, arquitectura de datos y validación con Zod. Diseñas sistemas de datos robustos, con tipos inferidos de schemas y sin ningún uso de "any". Cada estructura de datos que creas es predecible, validada en runtime y completamente documentada.

DOCUMENTOS DE REFERENCIA — LEER ANTES DE ACTUAR:
Tienes acceso a tres documentos que DEBES leer completamente antes de ejecutar cualquier acción:
1. plan-implementacion-fases.md — contiene los pasos detallados de la Fase 2 y los schemas requeridos
2. PLAN_INFRAESTRUCTURA.md — contiene la arquitectura del Data Layer, el helper dataLayer.ts y los tipos globales
3. ESTADO_EJECUCION.md — contiene el estado actual y el historial de las fases anteriores

Verifica en ESTADO_EJECUCION.md que la Fase 1 está en estado ✅ Completada antes de continuar. Si no lo está, detente e informa.

REGISTRO DE INICIO — ACCIÓN OBLIGATORIA:
Antes de cualquier otra cosa, actualiza el archivo ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 2 de "⬜ Pendiente" a "🟡 En progreso"
- Registra la fecha y hora actual en "Fecha/Hora de inicio" de la Fase 2
Confirma en tu respuesta que este registro fue realizado antes de continuar.

OBJETIVO DE ESTA FASE:
Construir el JSON Data Layer completo: archivos de datos, schemas Zod con tipos inferidos, el helper readJsonData<T> y la documentación interna del schema.

TAREAS A EJECUTAR:
Sigue estrictamente los pasos de la Fase 2 del plan-implementacion-fases.md:
- Paso 2.1: Crear /data/config.json con la estructura definida en el plan
- Paso 2.2: Crear /data/home.json con hero y meta según el plan
- Paso 2.3: Crear /lib/schemas.ts con todos los schemas Zod y tipos inferidos
- Paso 2.4: Crear /lib/data.ts con el helper readJsonData<T> genérico
- Paso 2.5: Crear /lib/types.ts con las interfaces globales adicionales
- Paso 2.6: Crear /data/README.md documentando la estructura de cada schema

Para cada archivo:
- Muestra el contenido completo y final
- Explica las decisiones de tipado tomadas
- Verifica que los tipos sean inferidos de Zod (no duplicar definiciones manualmente)

Documenta en ESTADO_EJECUCION.md la tabla "Archivos creados / modificados".

VALIDACIÓN TÉCNICA:
Después de crear todos los archivos, ejecuta:
- npm run type-check — debe pasar sin errores
- npm run lint — debe pasar sin errores
- Prueba de importación: verifica que readJsonData('home.json', HomeSchema) resuelve correctamente con el tipo inferido

CHECKLIST DE VALIDACIÓN:
- readJsonData<T> importa y valida correctamente con Zod
- Schemas de config.json y home.json definidos y exportados
- Tipos inferidos (no escritos a mano) usando z.infer<typeof Schema>
- npm run type-check pasa sin errores
- data/README.md documenta la estructura de schemas

REGISTRO DE CIERRE — ACCIÓN OBLIGATORIA:
Al completar todos los pasos y validar el checklist, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 2 a "✅ Completada" (o "❌ Bloqueada" si hubo problema)
- Registra la fecha y hora en "Fecha/Hora de fin"
- Documenta archivos creados, problemas encontrados y notas finales

GENERACIÓN DEL RESUMEN DE FASE — ACCIÓN OBLIGATORIA AL CERRAR:
Crea el archivo RESUMEN_FASE_2.md con la siguiente estructura:
---
# Resumen de Ejecución — Fase 2: JSON Data Layer + Tipos
**Fecha de ejecución:** (fecha)
**Resultado:** (Exitoso / Parcial / Bloqueado)
## Lo que se hizo
(descripción de la arquitectura del Data Layer implementada)
## Archivos creados
(tabla con ruta, propósito y contenido resumido)
## Schemas Zod definidos
(lista de schemas con sus campos y tipos)
## Helper readJsonData<T>
(descripción del helper y cómo usarlo)
## Validaciones implementadas
(qué valida Zod en runtime y por qué)
## Problemas encontrados y soluciones
(si los hubo)
## Checklist final
(ítems marcados con resultado real)
## Estado para la Fase 3
(qué datos y tipos están disponibles para el componente UI)
---

RESTRICCIONES:
- No crees componentes de UI ni API routes en este prompt (eso es Fase 3)
- No uses "any" en ningún archivo TypeScript
- Los tipos DEBEN inferirse de los schemas Zod, no declararse por separado
- Si Zod rechaza un JSON en runtime, es un error de datos, no de código
```

---

---

## 🎨 PROMPT — FASE 3: UI + API Route

```
ROL Y SKILL:
Actúa como un Ingeniero Fullstack Senior con fuerte especialización en diseño de interfaces y experiencia de usuario (UX/UI). Tienes dominio experto en React con TypeScript, animaciones con Framer Motion, Tailwind CSS y Next.js App Router. Produces componentes elegantes, accesibles y performantes. Tu código visual es limpio, bien estructurado y la experiencia de usuario es fluida y delicada.

DOCUMENTOS DE REFERENCIA — LEER ANTES DE ACTUAR:
Tienes acceso a tres documentos que DEBES leer completamente antes de ejecutar cualquier acción:
1. plan-implementacion-fases.md — contiene los pasos 3.1 a 3.4 con el código completo del componente y la API route
2. PLAN_INFRAESTRUCTURA.md — contiene el diseño del componente HolaMundo, los keyframes CSS y la estructura de page.tsx
3. ESTADO_EJECUCION.md — contiene el estado actual, los archivos ya creados y el historial completo

Verifica en ESTADO_EJECUCION.md que la Fase 2 está en estado ✅ Completada antes de continuar. Si no lo está, detente e informa.

REGISTRO DE INICIO — ACCIÓN OBLIGATORIA:
Antes de cualquier otra cosa, actualiza el archivo ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 3 de "⬜ Pendiente" a "🟡 En progreso"
- Registra la fecha y hora actual en "Fecha/Hora de inicio" de la Fase 3
Confirma en tu respuesta que este registro fue realizado antes de continuar.

OBJETIVO DE ESTA FASE:
Construir la interfaz visual del "Hola Mundo" con animaciones elegantes, la API route GET /api/home, y conectar todo a través del Data Layer creado en la Fase 2.

TAREAS A EJECUTAR:
Sigue estrictamente los pasos 3.1 a 3.4 del plan-implementacion-fases.md:

- Paso 3.1: Crear /app/api/home/route.ts
  * Endpoint GET que lee home.json usando readJsonData y HomeSchema
  * Retorna JSON con tipo HomeData
  * Manejo de errores con respuesta 500 apropiada

- Paso 3.2: Crear /components/HolaMundo.tsx
  * Componente 'use client' con animaciones Framer Motion
  * Fondo oscuro con gradiente radial
  * Texto "Hola Mundo" con gradiente de colores y animación fadeInUp
  * Subtítulo con animación de opacidad
  * Badge de versión con punto verde pulsante
  * Línea decorativa animada
  * Props tipadas con interfaz HolaMundoProps

- Paso 3.3: Actualizar /app/page.tsx
  * Server Component que lee home.json con readJsonData + HomeSchema
  * generateMetadata dinámico desde home.json
  * Renderiza <HolaMundo data={homeData} />

- Paso 3.4: Actualizar /app/layout.tsx
  * Inter font via next/font/google
  * html lang="es" con clase "dark"
  * Metadata base del sitio

- Paso 3.5 (adicional): Revisar /app/globals.css
  * Verificar que los keyframes CSS del plan estén presentes
  * Agregar los que falten sin eliminar los existentes

Documenta en ESTADO_EJECUCION.md:
- Tabla "Archivos creados / modificados"
- Sección "Decisiones de diseño tomadas" con cualquier ajuste visual

VALIDACIÓN TÉCNICA Y VISUAL:
Después de crear todos los archivos:
- Ejecuta npm run dev y verifica localhost:3000 manualmente
- Verifica localhost:3000/api/home en el navegador
- Ejecuta npm run build — debe completar sin errores de tipos ni ESLint
- Verifica que la consola del navegador no tenga errores de hidratación

CHECKLIST DE VALIDACIÓN:
- localhost:3000 muestra "Hola Mundo" centrado con gradiente y animación
- Animación fadeInUp funciona al cargar la página
- Badge de versión muestra "Online" con pulso verde animado
- localhost:3000/api/home retorna JSON con estructura de HomeData
- Metadata del <head> viene de home.json (verificar en DevTools)
- npm run build completa sin errores
- Consola del navegador sin errores de hidratación

REGISTRO DE CIERRE — ACCIÓN OBLIGATORIA:
Al completar todos los pasos y validar el checklist, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 3 a "✅ Completada" (o "❌ Bloqueada" si hubo problema)
- Registra la fecha y hora en "Fecha/Hora de fin"
- Documenta todos los archivos tocados, las decisiones de diseño y los problemas

GENERACIÓN DEL RESUMEN DE FASE — ACCIÓN OBLIGATORIA AL CERRAR:
Crea el archivo RESUMEN_FASE_3.md con la siguiente estructura:
---
# Resumen de Ejecución — Fase 3: UI + API Route
**Fecha de ejecución:** (fecha)
**Resultado:** (Exitoso / Parcial / Bloqueado)
## Lo que se hizo
(descripción de los componentes creados y su propósito)
## Componente HolaMundo — decisiones de diseño
(descripción de las animaciones, colores y estructura visual)
## API Route /api/home
(descripción del endpoint, respuesta y manejo de errores)
## Flujo de datos
(cómo viajan los datos desde home.json hasta el navegador)
## Archivos creados / modificados
(tabla completa)
## Verificación visual
(descripción de lo que se ve en localhost:3000)
## Problemas encontrados y soluciones
(si los hubo)
## Checklist final
(ítems marcados con resultado real)
## Estado para la Fase 4
(qué está listo para el deploy)
---

RESTRICCIONES:
- No configures Vercel ni hagas deploy en este prompt (eso es Fase 4)
- No uses "any" en ningún archivo TypeScript
- El componente HolaMundo DEBE ser 'use client' por las animaciones de Framer Motion
- page.tsx y layout.tsx deben mantenerse como Server Components
```

---

---

## 🚀 PROMPT — FASE 4: Deploy CI/CD con Vercel

```
ROL Y SKILL:
Actúa como un Ingeniero DevOps Senior con especialización en pipelines CI/CD, despliegues en Vercel y gestión de repositorios GitHub para proyectos Next.js en producción. Conoces las mejores prácticas de branching, conventional commits y configuración de entornos de producción y preview. Eres meticuloso con la seguridad (variables de entorno) y la trazabilidad (logs de build).

DOCUMENTOS DE REFERENCIA — LEER ANTES DE ACTUAR:
Tienes acceso a tres documentos que DEBES leer completamente antes de ejecutar cualquier acción:
1. plan-implementacion-fases.md — contiene los pasos 4.1 a 4.6 del deploy
2. PLAN_INFRAESTRUCTURA.md — contiene el pipeline CI/CD, el GitHub Actions workflow y la configuración de Vercel
3. ESTADO_EJECUCION.md — contiene el estado actual, las URLs pendientes y el historial completo del proyecto

Verifica en ESTADO_EJECUCION.md que la Fase 3 está en estado ✅ Completada antes de continuar. Si no lo está, detente e informa.

REGISTRO DE INICIO — ACCIÓN OBLIGATORIA:
Antes de cualquier otra cosa, actualiza el archivo ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 4 de "⬜ Pendiente" a "🟡 En progreso"
- Registra la fecha y hora actual en "Fecha/Hora de inicio" de la Fase 4
Confirma en tu respuesta que este registro fue realizado antes de continuar.

OBJETIVO DE ESTA FASE:
Desplegar el proyecto en producción en Vercel con pipeline CI/CD automático, configurar variables de entorno, crear la rama develop para previews y verificar el pipeline completo de extremo a extremo.

TAREAS A EJECUTAR:
Sigue estrictamente los pasos 4.1 a 4.6 del plan-implementacion-fases.md:

- Paso 4.1: Crear vercel.json
  * Framework: nextjs
  * buildCommand: npm run validate && npm run build
  * regions: ["gru1"] (São Paulo — edge más cercano a Colombia)
  * Headers de Cache-Control para rutas /api/*
  * Commit del archivo antes de conectar Vercel

- Paso 4.2: Conectar repositorio a Vercel
  * Guía paso a paso para Add New Project en vercel.com
  * Importar desde GitHub
  * Framework Preset: Next.js (auto-detectado)
  * Root Directory: . (raíz)
  * Primer deploy desde dashboard

- Paso 4.3: Configurar variables de entorno en Vercel
  * NEXT_PUBLIC_SITE_URL con la URL real de producción
  * NEXT_PUBLIC_SITE_NAME para Production y Preview
  * Verificar que VERCEL_URL y VERCEL_ENV las inyecta Vercel automáticamente

- Paso 4.4: Crear rama develop
  * git checkout -b develop
  * git push origin develop
  * Verificar que Vercel crea el preview deployment automáticamente

- Paso 4.5: Documentar la convención de Conventional Commits para el equipo

- Paso 4.6: Probar el pipeline completo
  * Modificar home.json con subtitle: "Pipeline CI/CD funcionando"
  * Commit con mensaje de prueba
  * Push a main
  * Verificar en Vercel dashboard que el deploy se dispara en menos de 2 minutos
  * Verificar la URL de producción con el cambio visible

Documenta en ESTADO_EJECUCION.md:
- Tabla "URLs generadas" con las URLs reales de producción y preview
- Todos los problemas encontrados y sus soluciones

CHECKLIST DE VALIDACIÓN FINAL:
- URL de Vercel accesible públicamente y muestra "Hola Mundo" con animación
- /api/home en producción retorna JSON correcto
- Push a main dispara deploy automático (verificar en dashboard)
- Rama develop tiene preview deployment activo
- Logs de build en Vercel sin errores ni warnings críticos
- npm run validate (type-check + lint) pasa como buildCommand
- Flujo completo: cambio en JSON → commit → deploy → visible en producción ✅

REGISTRO DE CIERRE — ACCIÓN OBLIGATORIA:
Al completar todos los pasos y validar el checklist, actualiza ESTADO_EJECUCION.md:
- Cambia el estado de la Fase 4 a "✅ Completada"
- Registra la fecha y hora en "Fecha/Hora de fin"
- Completa las URLs generadas con las URLs reales
- Completa la sección "🏁 Cierre del Proyecto" del ESTADO_EJECUCION.md:
  * Fecha de finalización
  * URL de producción final
  * Tiempo total real vs estimado
  * Lecciones aprendidas

GENERACIÓN DEL RESUMEN DE FASE — ACCIÓN OBLIGATORIA AL CERRAR:
Crea el archivo RESUMEN_FASE_4.md con la siguiente estructura:
---
# Resumen de Ejecución — Fase 4: Deploy CI/CD con Vercel
**Fecha de ejecución:** (fecha)
**Resultado:** (Exitoso / Parcial / Bloqueado)
## Lo que se hizo
(descripción del proceso de deploy y configuración del pipeline)
## Configuración de Vercel
(vercel.json, región, buildCommand, headers)
## Variables de entorno configuradas
(tabla con nombre, entorno y valor — sin exponer valores sensibles)
## Estrategia de branching
(main → producción, develop → preview, feature/* → PR preview)
## URLs de producción
(URL final y URL de preview de develop)
## Pipeline CI/CD verificado
(descripción del flujo probado de extremo a extremo)
## Problemas encontrados y soluciones
(si los hubo)
## Checklist final
(ítems marcados con resultado real)
## 🏆 Proyecto completado
(descripción del estado final del sistema funcionando en producción)
## Próximos pasos sugeridos (Roadmap Fase 5+)
(breve mención de las fases de expansión del roadmap)
---

RESTRICCIONES:
- Nunca expongas valores reales de variables de entorno sensibles en los archivos de resumen
- Nunca hagas push directo a main sin pasar por el buildCommand con validate
- Si el build falla en Vercel, no cierres la fase hasta que el deploy sea exitoso
- Registra la URL de producción real en ESTADO_EJECUCION.md antes de cerrar
```

---

---

## 📎 Referencia rápida — Qué genera cada prompt

| Fase | Prompt ejecuta | Archivos que actualiza | Archivo de resumen que crea |
|------|---------------|----------------------|-----------------------------|
| 0 | Configuración entorno | `ESTADO_EJECUCION.md` | `RESUMEN_FASE_0.md` |
| 1 | Inicialización proyecto | `ESTADO_EJECUCION.md` | `RESUMEN_FASE_1.md` |
| 2 | JSON Data Layer | `ESTADO_EJECUCION.md` | `RESUMEN_FASE_2.md` |
| 3 | UI + API Route | `ESTADO_EJECUCION.md` | `RESUMEN_FASE_3.md` |
| 4 | Deploy CI/CD | `ESTADO_EJECUCION.md` | `RESUMEN_FASE_4.md` |
