'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const SaveSiitTeachersSchema = z.array(
  z.object({
    nombre: z.string().min(1),
    apellidoPaterno: z.string().min(1),
    apellidoMaterno: z.string().optional(),
    shortname: z.string().min(1)
  })
)

export async function saveSiitTeachers(
  teachersToSave: z.infer<typeof SaveSiitTeachersSchema>
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return { success: false, error: 'No autorizado' }
  }

  const result = SaveSiitTeachersSchema.safeParse(teachersToSave)
  if (!result.success) {
    return { success: false, error: 'Datos inválidos proporcionados' }
  }

  try {
    let added = 0
    let skipped = 0

    // Múltiples queries en secuencia para evitar que la duplicación de uno falle toda la inserción
    for (const teacher of result.data) {
      const exists = await prisma.teacher.findUnique({
        where: { shortname: teacher.shortname }
      })

      if (!exists) {
        await prisma.teacher.create({
          data: {
            nombre: teacher.nombre,
            apellidoPaterno: teacher.apellidoPaterno,
            apellidoMaterno: teacher.apellidoMaterno || '',
            shortname: teacher.shortname,
            active: true
          }
        })
        added++
      } else {
        skipped++
      }
    }

    return { success: true, added, skipped }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Error al guardar profesores'
      }
    }
    return { success: false, error: 'Error al guardar profesores' }
  }
}
