import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
    .max(30, 'El nombre de usuario no puede tener más de 30 caracteres')
    .refine(
      (value) => /^[a-zA-Z0-9_ñÑ]+$/.test(value),
      'El nombre de usuario solo puede contener letras, números y guiones bajos'
    ),
  email: z
    .string()
    .trim()
    .min(1, 'El correo electrónico no puede estar vacío')
    .email('El correo electrónico no es válido'),
  password: z
    .string()
    .trim()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().trim().min(6, 'Las contraseñas deben coincidir'),
  numControl: z
    .string()
    .min(8, 'Número de control inválido')
    .max(9, 'Número de control inválido'),
  carrera: z.string().min(1, 'Carrera inválida')
})

export const RegisterFormSchema = RegisterSchema.pick({
  username: true,
  email: true,
  password: true,
  confirmPassword: true
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})
