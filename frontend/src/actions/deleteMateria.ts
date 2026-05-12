'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { MateriaSchema } from '@/schemas/MateriaSchema'
import { z } from 'zod'

type DeleteMateriaFormTypes = z.infer<typeof MateriaSchema>

export async function deleteMateria(formData: DeleteMateriaFormTypes) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Not authenticated' }
  }
  if (session.user.role !== 'ADMIN') {
    return { success: false, error: 'Not authorized' }
  }
  const comments = await prisma.materias.findMany({
    select: {
      reviews: {
        select: {
          id: true
        }
      }
    },
    where: {
      AND: [{ nombre: formData.nombre }, { carrera: formData.carrera }]
    }
  })
  if (!comments[0]) return { success: false, error: 'Materia not found' }
  if (comments[0].reviews.length > 0) {
    return {
      success: false,
      error: 'There are already reviews with this materia'
    }
  }
  await prisma.materias
    .delete({
      where: {
        nombre_carrera: {
          nombre: formData.nombre,
          carrera: formData.carrera
        }
      }
    })
    .catch((e: unknown) => {
      const message = e instanceof Error ? e.message : 'Unknown error'
      return { success: false, error: message }
    })
  return { success: true }
}
