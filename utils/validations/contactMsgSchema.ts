import { z } from 'zod';

export const contactMsgSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be 100 characters or less'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be 100 characters or less'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be 255 characters or less'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(65535, 'Message must be 65535 characters or less'),
});

export type ContactFormData = z.infer<typeof contactMsgSchema>;
