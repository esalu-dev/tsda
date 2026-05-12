import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'El correo electrónico no puede estar vacío')
    .email('El correo electrónico no es válido'),
  password: z
    .string()
    .trim()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})
