# 📁 Capa de Datos — JSON como Base de Datos

> ⚠️ **Regla de Oro**: Los archivos JSON en `/data` **jamás son accedidos directamente desde el cliente**. Toda lectura ocurre en Server Components o Route Handlers de Next.js.

---

## Filosofía

En lugar de un motor de base de datos, este proyecto utiliza una **carpeta `/data`** con archivos JSON estructurados. Estos archivos son leídos en el servidor (nunca expuestos directamente al cliente) a través del módulo `fs` de Node.js y el servicio `lib/dataService.ts`.

---

## Archivos actuales

| Archivo | Propósito | Schema de validación |
|---------|-----------|----------------------|
| `config.json` | Configuración global de la aplicación (nombre, versión, locale, tema) | `AppConfigSchema` en `lib/validators.ts` |
| `home.json` | Contenido de la página principal (hero, meta) | `HomeDataSchema` en `lib/validators.ts` |

---

## Reglas de acceso

1. **Solo lectura en servidor**: los JSONs nunca se pasan directamente al cliente como `import`.
2. **Validación obligatoria**: todo JSON leído **debe** pasar por su schema Zod antes de usarse.
3. **Un archivo por dominio**: cada entidad conceptual tiene su propio archivo JSON.
4. **Sin lógica en JSON**: los archivos solo contienen datos, nunca funciones o código ejecutable.
5. **Lectura a través del servicio**: siempre usar `readJsonFile<T>()` de `lib/dataService.ts`.

---

## Cómo agregar un nuevo archivo JSON

1. Crear el archivo JSON en esta carpeta: `/data/nuevo-dominio.json`
2. Definir la interfaz TypeScript en `lib/types.ts`: `export interface NuevoDominioData { ... }`
3. Definir el schema Zod en `lib/validators.ts`: `export const NuevoDominioSchema = z.object({ ... })`
4. Leer el archivo desde un Server Component o Route Handler:
   ```typescript
   import { readJsonFile } from '@/lib/dataService';
   import { NuevoDominioSchema } from '@/lib/validators';
   import type { NuevoDominioData } from '@/lib/types';

   const raw = readJsonFile<NuevoDominioData>('nuevo-dominio.json');
   const data = NuevoDominioSchema.parse(raw);
   ```

---

*Documentación de la capa de datos v1.0 — Solo lectura desde servidor*
