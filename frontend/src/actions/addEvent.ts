'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AddEventSchema } from '@/schemas/AddEventSchema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

type AddEventFormTypes = z.infer<typeof AddEventSchema>

export async function addEvent(formData: AddEventFormTypes) {
  const session = await auth()
  if (!session) return { success: false, error: 'Not authenticated' }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const result = AddEventSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const event = await prisma.events.create({
    data: {
      title: formData.title,
      body: formData.body,
      startDate: formData.startDate,
      endDate: formData.endDate
    }
  })

  if (!event) {
    return { success: false, error: 'Error creating event' }
  }

  revalidatePath('/app')
  return { success: true }
}
