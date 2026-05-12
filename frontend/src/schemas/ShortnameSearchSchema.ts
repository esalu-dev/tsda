import { z } from 'zod'

export const ShortnameSearchSchema = z.object({
  shortname: z
    .string()
    .trim()
    .min(1, 'El shortname no puede estar vacío')
    .regex(
      /^[a-z]+(-[a-z]+)*$/,
      "El shortname introducido no es válido. Debe ser una cadena de texto en minúsculas separada por guiones. Ejemplo: 'nombre-apellido'"
    )
})
