import { z } from 'zod';

// Schema for Excel row
export const ExcelRowSchema = z.record(z.string(), z.string());

// Schema for Excel reader state
export const ExcelReaderStateSchema = z.object({
  data: z.array(z.array(z.string())),
  headers: z.array(z.string()),
  loading: z.boolean(),
  error: z.string().nullable(),
  image: z.string().nullable(),
});

// Schema for file validation
export const FileValidationSchema = z.object({
  isValid: z.boolean(),
  error: z.string().optional(),
});

// Schema for Excel processing result
export const ExcelProcessingResultSchema = z.object({
  success: z.boolean(),
  data: z.array(z.array(z.string())).optional(),
  headers: z.array(z.string()).optional(),
  error: z.string().optional(),
});