import { NextResponse } from 'next/server';
import { readHomeData } from '@/lib/dataService';
import { HomeDataSchema } from '@/lib/validators';

export async function GET() {
  try {
    // readHomeData() ya valida internamente con HomeDataSchema, 
    // pero aquí está explícito en la lógica o se atrapa cualquier error que emita.
    const data = readHomeData();
    
    // Podemos asegurar que está validado pasándolo por el schema nuevamente si queremos ser explícitos
    const validatedData = HomeDataSchema.parse(data);

    return NextResponse.json(validatedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al leer home.json:', error);
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
