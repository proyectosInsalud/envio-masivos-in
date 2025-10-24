import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export interface Contact {
  destinationNumber: string;
  message: string;
}

export interface Manager {
  phoneSender: string;
}

export interface MassivesRequest {
  contacts: Contact[];
  managers: Manager[];
}

export interface MassivesResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Get the JSON body from the form data
    const body = formData.get('body') as string;
    const file = formData.get('file') as File | null;

    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const data: MassivesRequest = JSON.parse(body);

    // Create new FormData for the external API
    const externalFormData = new FormData();
    externalFormData.append('body', JSON.stringify(data));

    if (file) {
      externalFormData.append('file', file);
    }

    const response = await axios.post<MassivesResponse>(
      'https://callhub.insalud.pe/api/massives',
      externalFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Massives API Error:', error);

    if (axios.isAxiosError(error)) {
      // Network error
      if (!error.response) {
        // Handle network timeouts specifically
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          console.warn('Request timed out, but server may continue processing messages');
          return NextResponse.json({
            success: true,
            message: 'Mensajes enviados. El procesamiento continúa en segundo plano.'
          });
        }
        return NextResponse.json(
          { success: false, error: 'No se pudo conectar al servidor. Verifica tu conexión a internet.' },
          { status: 500 }
        );
      }

      // Server responded with error status
      const status = error.response.status;
      const errorMessage = error.response.data?.error || error.response.data?.message;

      console.error('Server response status:', status);
      console.error('Server response data:', error.response.data);

      // Handle 504 Gateway Timeout as potential success
      if (status === 504) {
        console.warn('504 Gateway Timeout received, but server continues processing');
        return NextResponse.json({
          success: true,
          message: 'Mensajes enviados. El procesamiento continúa en segundo plano.'
        });
      }

      let clientError: string;
      if (status === 400) {
        clientError = `Datos inválidos: ${errorMessage || 'Verifica la información enviada'}`;
      } else if (status === 401) {
        clientError = 'No autorizado para realizar esta acción';
      } else if (status === 403) {
        clientError = 'Acceso denegado';
      } else if (status === 404) {
        clientError = 'Servicio no encontrado';
      } else if (status >= 500) {
        clientError = `Error del servidor (${status}): ${errorMessage || 'Inténtalo más tarde'}`;
      } else {
        clientError = errorMessage || `Error ${status}: ${error.message}`;
      }

      return NextResponse.json(
        { success: false, error: clientError },
        { status: status }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error desconocido al enviar mensajes masivos' },
      { status: 500 }
    );
  }
}