'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AddTeacherSchema } from '@/schemas/AddTeacherSchema'
import { z } from 'zod'

type EditTeacherFormTypes = z.infer<typeof AddTeacherSchema>

export async function updateTeacher(formData: EditTeacherFormTypes) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const teacher = await prisma.teacher.findUnique({
    where: {
      shortname: formData.shortname
    }
  })
  if (!teacher) {
    return { success: false, error: 'Teacher not found' }
  }
  const updatedTeacher = await prisma.teacher.update({
    where: {
      shortname: formData.shortname
    },
    data: {
      nombre: formData.name,
      apellidoPaterno: formData.paterno,
      apellidoMaterno: formData.materno,
      active: formData.isActive
    }
  })
  if (!updatedTeacher) {
    return { success: false, error: 'Error updating teacher' }
  }
  return { success: true }
}
