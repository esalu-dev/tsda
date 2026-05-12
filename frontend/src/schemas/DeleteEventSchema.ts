import { z } from 'zod'

export const DeleteEventSchema = z.object({
  id: z.number()
})
