'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ShortnameSearchSchema } from '@/schemas/ShortnameSearchSchema'
import { z } from 'zod'

type ShortnameSearchType = z.infer<typeof ShortnameSearchSchema>

export async function searchTeacher(formData: ShortnameSearchType) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const result = ShortnameSearchSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const teacherFound = await prisma.teacher.findUnique({
    select: {
      nombre: true,
      apellidoPaterno: true,
      apellidoMaterno: true,
      active: true
    },
    where: {
      shortname: formData.shortname
    }
  })
  if (!teacherFound) {
    return { success: false, error: 'Teacher not found' }
  }
  return { success: true, teacher: teacherFound }
}
