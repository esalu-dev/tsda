'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { UpdateUsernameSchema } from '@/schemas/UpdateUsernameSchema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

type UpdateUsernameFormTypes = z.infer<typeof UpdateUsernameSchema>

export async function updateUsername(formData: UpdateUsernameFormTypes) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })
  if (!user) {
    return { success: false, error: 'User not found' }
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      username: formData.username
    }
  })
  if (existingUser) {
    return { success: false, error: 'Username already exists' }
  }
  try {
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        username: formData.username
      }
    })
    revalidatePath('/app/profile')
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
