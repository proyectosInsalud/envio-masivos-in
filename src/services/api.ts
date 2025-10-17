import axios from 'axios';
import type {
  ManagersResponse,
  Manager,
  ExcelProcessingResult,
  FileValidation
} from '@/types';

// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado, redirigir a login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const managersApi = {
  // Obtener lista de gestores
  getManagers: async (): Promise<ManagersResponse> => {
    try {
      const response = await api.get<ManagersResponse>('/managers');
      return response.data;
    } catch (error) {
      console.error('Error fetching managers:', error);
      throw error;
    }
  },

  // Crear nuevo gestor
  createManager: async (managerData: Omit<Manager, 'id'>): Promise<Manager> => {
    try {
      const response = await api.post<Manager>('/managers', managerData);
      return response.data;
    } catch (error) {
      console.error('Error creating manager:', error);
      throw error;
    }
  },

  // Actualizar gestor
  updateManager: async (id: string, managerData: Partial<Manager>): Promise<Manager> => {
    try {
      const response = await api.put<Manager>(`/managers/${id}`, managerData);
      return response.data;
    } catch (error) {
      console.error('Error updating manager:', error);
      throw error;
    }
  },

  // Eliminar gestor
  deleteManager: async (id: string): Promise<void> => {
    try {
      await api.delete(`/managers/${id}`);
    } catch (error) {
      console.error('Error deleting manager:', error);
      throw error;
    }
  },
};

export const excelApi = {
  // Procesar archivo Excel
  processExcel: async (file: File): Promise<ExcelProcessingResult> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<ExcelProcessingResult>('/excel/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing Excel file:', error);
      throw error;
    }
  },

  // Validar archivo antes de procesar
  validateFile: async (file: File): Promise<FileValidation> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<FileValidation>('/excel/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error validating file:', error);
      throw error;
    }
  },
};

export const campaignsApi = {
  // Crear campaña de mensajes masivos
  createCampaign: async (campaignData: {
    managerId: string;
    excelData: string[][];
    image?: File;
    message?: string;
  }): Promise<{ success: boolean; campaignId: string }> => {
    try {
      const formData = new FormData();
      formData.append('managerId', campaignData.managerId);
      formData.append('excelData', JSON.stringify(campaignData.excelData));

      if (campaignData.image) {
        formData.append('image', campaignData.image);
      }

      if (campaignData.message) {
        formData.append('message', campaignData.message);
      }

      const response = await api.post<{ success: boolean; campaignId: string }>(
        '/campaigns',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },

  // Obtener estado de campaña
  getCampaignStatus: async (campaignId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    totalMessages: number;
    sentMessages: number;
    failedMessages: number;
  }> => {
    try {
      const response = await api.get(`/campaigns/${campaignId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching campaign status:', error);
      throw error;
    }
  },

  // Obtener lista de campañas
  getCampaigns: async (page = 1, limit = 10): Promise<{
    campaigns: Array<{
      id: string;
      name: string;
      status: string;
      createdAt: string;
      manager: Manager;
    }>;
    total: number;
    page: number;
    limit: number;
  }> => {
    try {
      const response = await api.get(`/campaigns?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
};

export const authApi = {
  // Login
  login: async (credentials: { email: string; password: string }): Promise<{
    token: string;
    user: { id: string; name: string; email: string; role: string };
  }> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Obtener perfil de usuario
  getProfile: async (): Promise<{ id: string; name: string; email: string; role: string }> => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Exportar instancia de axios para uso directo si es necesario
export { api };
export default api;