import axios from 'axios';

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

export async function sendMassives(
  data: MassivesRequest,
  file?: File
): Promise<MassivesResponse> {
  const formData = new FormData();

  // Add the JSON body as a string
  formData.append('body', JSON.stringify(data));

  // Add the file only if it exists
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await axios.post<MassivesResponse>(
      'https://callhub.insalud.pe/api/massives',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds timeout
      }
    );

    return response.data;
  } catch (error) {
    console.error('Massives API Error:', error);
    console.error('Request data:', { data, file: file ? { name: file.name, size: file.size, type: file.type } : null });
    console.error('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (axios.isAxiosError(error)) {
      // Network error
      if (!error.response) {
        throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      }

      // Server responded with error status
      const status = error.response.status;
      const errorMessage = error.response.data?.error || error.response.data?.message;
      const fullResponse = error.response.data;

      console.error('Server response status:', status);
      console.error('Server response data:', fullResponse);

      if (status === 400) {
        throw new Error(`Datos inválidos: ${errorMessage || 'Verifica la información enviada'}`);
      } else if (status === 401) {
        throw new Error('No autorizado para realizar esta acción');
      } else if (status === 403) {
        throw new Error('Acceso denegado');
      } else if (status === 404) {
        throw new Error('Servicio no encontrado');
      } else if (status >= 500) {
        throw new Error(`Error del servidor (${status}): ${errorMessage || 'Inténtalo más tarde'}`);
      } else {
        throw new Error(errorMessage || `Error ${status}: ${error.message}`);
      }
    }

    throw new Error('Error desconocido al enviar mensajes masivos');
  }
}