'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AddTeacherSchema } from '@/schemas/AddTeacherSchema'
import { z } from 'zod'

type AddTeacherFormTypes = z.infer<typeof AddTeacherSchema>

export async function addTeacher(formData: AddTeacherFormTypes) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const result = AddTeacherSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const shortnameFound = await prisma.teacher.findUnique({
    select: {
      shortname: true
    },
    where: {
      shortname: formData.shortname
    }
  })
  if (shortnameFound) {
    return { success: false, error: 'Shortname already exists' }
  }
  const newTeacher = await prisma.teacher.create({
    data: {
      nombre: formData.name,
      apellidoPaterno: formData.paterno,
      apellidoMaterno: formData.materno,
      shortname: formData.shortname,
      active: formData.isActive
    }
  })
  if (!newTeacher) {
    return { success: false, error: 'Error creating teacher' }
  }
  return { success: true }
}
