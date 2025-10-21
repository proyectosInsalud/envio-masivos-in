import { z } from 'zod';

// Schema for manager
export const ManagerSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastName: z.string(),
  username: z.string(),
  phoneId: z.number(),
  phoneNumber: z.string(),
});

// Schema for managers response
export const ManagersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ManagerSchema),
  error: z.string().optional(),
});