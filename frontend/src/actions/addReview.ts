'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ReviewSchema } from '@/schemas/ReviewSchema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

type ReviewTypes = z.infer<typeof ReviewSchema>

/**
 * Adds a review to the database.
 * @param formData - The review data to be added.
 * @param shortname - The shortname of the professor being reviewed.
 * @returns A promise that resolves to an object indicating the success status and any error message.
 */
export async function addReview(formData: ReviewTypes, shortname: string) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, error: 'No hay una sesión activa' }
  }
  const result = ReviewSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }

  const teacher = await prisma.teacher.findUnique({
    where: {
      shortname
    },
    select: {
      id: true
    }
  })
  if (!teacher) {
    return { success: false, error: 'No se encontró al profesor' }
  }
  try {
    await prisma.review.create({
      data: {
        rating: result.data.rating,
        wouldTakeAgain: result.data.wouldTakeAgain,
        difficulty: result.data.difficulty,
        learningLevel: result.data.learned,
        body: result.data.body,
        userId: session.user.id,
        teacherId: teacher.id,
        materiaId: result.data.materiaId
      }
    })
  } catch {
    return { success: false, error: 'Hubo un error al guardar el comentario' }
  }
  revalidatePath(`/profesor/${shortname}`)
  return { success: true }
}
