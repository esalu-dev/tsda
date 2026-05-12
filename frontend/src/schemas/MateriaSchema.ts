import { z } from 'zod'

export const MateriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre de la materia no puede estar vacío'),
  carrera: z.enum([
    'INGENIERIA EN SISTEMAS COMPUTACIONALES',
    'INGENIERIA INFORMATICA',
    'INGENIERIA EN TECNOLOGIAS DE LA INFORMACION Y COMUNICACIONES',
    'INGENIERIA MECANICA',
    'INGENIERIA BIOQUIMICA',
    'INGENIERIA EN GESTION EMPRESARIAL',
    'INGENIERIA ELECTRICA'
  ])
})
