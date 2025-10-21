import { z } from 'zod';
import { ManagerSchema, ManagersResponseSchema } from '../schemas/manager';

// Inferred types from schemas
export type Manager = z.infer<typeof ManagerSchema>;
export type ManagersResponse = z.infer<typeof ManagersResponseSchema>;