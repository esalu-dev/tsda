import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'El correo electrónico no puede estar vacío')
    .email('El correo electrónico no es válido')
})
