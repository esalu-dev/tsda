import { z } from 'zod'

export const AddEventSchema = z.object({
  title: z.string().min(1, 'El título no puede estar vacío'),
  body: z.string().min(1, 'La descripción no puede estar vacía'),
  startDate: z.date(),
  endDate: z.date().optional()
})
