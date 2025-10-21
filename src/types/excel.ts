import { z } from 'zod';
import {
  ExcelRowSchema,
  ExcelReaderStateSchema,
  FileValidationSchema,
  ExcelProcessingResultSchema,
} from '../schemas/excel';

// Inferred types from schemas
export type ExcelRow = z.infer<typeof ExcelRowSchema>;
export type ExcelReaderState = z.infer<typeof ExcelReaderStateSchema>;
export type FileValidation = z.infer<typeof FileValidationSchema>;
export type ExcelProcessingResult = z.infer<typeof ExcelProcessingResultSchema>;