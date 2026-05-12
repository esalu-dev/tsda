import { z } from 'zod'

export const ReviewSchema = z.object({
  rating: z.number().int().min(0).max(5),
  wouldTakeAgain: z.boolean(),
  difficulty: z.number().int().min(0).max(10),
  learned: z.number().int().min(0).max(10),
  materiaId: z.number().int().min(1),
  body: z
    .string()
    .min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
    .max(1300, {
      message: 'El comentario no puede tener más de 1300 caracteres'
    })
})
