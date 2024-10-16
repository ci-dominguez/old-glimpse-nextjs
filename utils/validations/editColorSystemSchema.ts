import { z } from 'zod';

export const editColorSystemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
});

export type EditColorSystemSchema = z.infer<typeof editColorSystemSchema>;
