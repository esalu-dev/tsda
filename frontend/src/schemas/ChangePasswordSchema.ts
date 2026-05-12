import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z
      .string()
      .trim()
      .min(6, 'Las contraseñas deben coincidir'),
    token: z.string().min(1, 'El token no puede estar vacío')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })
