'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const SavePinSchema = z.object({
  pin: z.string().min(1)
})

export async function saveAdminPin(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return { success: false, error: 'No autorizado' }
  }

  const pin = formData.get('pin')
  const result = SavePinSchema.safeParse({ pin })
  if (!result.success) {
    return { success: false, error: 'PIN inválido' }
  }

  try {
    // Upsert Administrator record for this user
    await prisma.administrator.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        pinSiit: result.data.pin
      },
      create: {
        userId: session.user.id,
        pinSiit: result.data.pin
      }
    })

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Error al guardar el PIN'
      }
    }
    return { success: false, error: 'Error al guardar el PIN' }
  }
}
