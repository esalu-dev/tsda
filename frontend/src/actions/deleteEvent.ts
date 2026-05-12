'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteEvent(id: number) {
  const session = await auth()
  if (!session) return { success: false, error: 'Not authenticated' }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  try {
    await prisma.events.delete({
      where: {
        id
      }
    })
  } catch {
    return { success: false, error: 'Error deleting event' }
  }
  revalidatePath('/app')
  revalidatePath('/app/settings')
  return { success: true }
}
