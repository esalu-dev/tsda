import { z } from 'zod'

export const AddTeacherSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío'),
  paterno: z.string().trim().min(1, 'El apellido paterno no puede estar vacío'),
  materno: z.string().trim().min(1, 'El apellido materno no puede estar vacío'),
  shortname: z
    .string()
    .trim()
    .min(1, 'El shortname no puede estar vacío')
    .regex(
      /^[a-z]+(-[a-z]+)*$/,
      "El shortname introducido no es válido. Debe ser una cadena de texto en minúsculas separada por guiones. Ejemplo: 'nombre-apellido'"
    ),
  isActive: z.boolean()
})
