import { z } from 'zod';
import { ImageFormDataSchema } from '../schemas/image';

// Inferred types from schemas
export type ImageFormData = z.infer<typeof ImageFormDataSchema>;