import { z } from 'zod';

export const colorConverterSchema = z.object({
  hex_code: z.string().regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex code. Please use format '#RRGGBB' or '#RGB'",
  }),
});
