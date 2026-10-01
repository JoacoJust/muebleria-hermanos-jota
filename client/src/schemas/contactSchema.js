import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().trim().email("Ingresá un email válido"),
  telefono: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => {
      if (!value) {
        return true;
      }
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10;
    }, "El teléfono debe tener al menos 10 dígitos"),
  asunto: z.string().trim().min(5, "El asunto debe tener al menos 5 caracteres"),
  mensaje: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres"),
});
