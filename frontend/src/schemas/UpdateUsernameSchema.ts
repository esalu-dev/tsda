import { z } from 'zod'

export const UpdateUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
    .max(30, 'El nombre de usuario no puede tener más de 30 caracteres')
    .refine(
      (value) => /^[a-zA-Z0-9_ñÑ]+$/.test(value),
      'El nombre de usuario solo puede contener letras, números y guiones bajos'
    )
})
