import fs from 'fs';
import path from 'path';
import { HomeDataSchema, AppConfigSchema } from '@/lib/validators';
import type { HomeData, AppConfig } from '@/lib/types';

// ─── Función genérica base ────────────────────────────────────────────────────
// Lee cualquier archivo JSON desde /data y lo castea al tipo genérico T.
// ⚠️ Siempre validar con Zod después de leer — nunca usar el raw sin validar.
export function readJsonFile<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

// ─── Función tipada: leer home.json ──────────────────────────────────────────
// Retorna HomeData validado con Zod. Lanza error si el JSON no cumple el schema.
export function readHomeData(): HomeData {
  const raw = readJsonFile<HomeData>('home.json');
  return HomeDataSchema.parse(raw);
}

// ─── Función tipada: leer config.json ────────────────────────────────────────
// Retorna AppConfig validado con Zod. Lanza error si el JSON no cumple el schema.
export function readAppConfig(): AppConfig {
  const raw = readJsonFile<AppConfig>('config.json');
  return AppConfigSchema.parse(raw);
}
