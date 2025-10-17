// Tipos para el procesamiento de Excel
export type ExcelRow = {
  [key: string]: string;
};

// Tipos para formularios de imagen
export type ImageFormData = {
  image: File;
};

// Tipos para el estado del componente ExcelReader
export type ExcelReaderState = {
  data: string[][];
  headers: string[];
  loading: boolean;
  error: string | null;
  image: string | null;
};

// Tipos para validaciones de archivos
export type FileValidation = {
  isValid: boolean;
  error?: string;
};

// Tipos para respuestas de procesamiento de Excel
export type ExcelProcessingResult = {
  success: boolean;
  data?: string[][];
  headers?: string[];
  error?: string;
};

// Tipos para gestores
export type ProductType = 'VPH' | 'Prostatitis';

export type Manager = {
  id: string;
  name: string;
  phone: string;
  product: ProductType;
  sede: string;
};

export type ManagersResponse = {
  success: boolean;
  data: Manager[];
  error?: string;
};