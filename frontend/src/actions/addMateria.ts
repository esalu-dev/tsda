'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { MateriaSchema } from '@/schemas/MateriaSchema'
import { z } from 'zod'

type AddMateriaFormTypes = z.infer<typeof MateriaSchema>

export async function addMateria(formData: AddMateriaFormTypes) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const result = MateriaSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const materia = await prisma.materias.findFirst({
    where: {
      AND: [{ nombre: formData.nombre }, { carrera: formData.carrera }]
    }
  })
  if (materia) {
    return { success: false, error: 'Materia already exists' }
  }

  const newMateria = await prisma.materias.create({
    data: {
      nombre: formData.nombre,
      carrera: formData.carrera
    }
  })

  if (!newMateria) {
    return { success: false, error: 'Error creating materia' }
  }

  return { success: true }
}
