import { NextResponse } from 'next/server';
import { readAppConfig } from '@/lib/dataService';
import { AppConfigSchema } from '@/lib/validators';

export async function GET() {
  try {
    const config = readAppConfig();
    
    // Validación explícita (aunque readAppConfig ya lo hace internamente)
    const validatedConfig = AppConfigSchema.parse(config);

    return NextResponse.json(validatedConfig, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al leer config.json:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
