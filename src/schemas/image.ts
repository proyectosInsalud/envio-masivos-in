import { z } from 'zod';

// Schema for image form data
export const ImageFormDataSchema = z.object({
  image: z.instanceof(File),
});