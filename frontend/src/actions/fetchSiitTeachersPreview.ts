'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { scrapeSiitTeachers, removeAccents } from '@/lib/siitScraper'

export interface TeacherPreview {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  shortname: string
  rawName: string
  status: 'NEW' | 'EXISTS'
  existingId?: number
  warnings: string[]
}

export async function fetchSiitTeachersPreview(): Promise<{
  success: boolean
  data?: TeacherPreview[]
  error?: string
}> {
  const session = await auth()
  if (!session) return { success: false, error: 'No autorizado' }
  if (session.user.role !== 'ADMIN')
    return { success: false, error: 'No autorizado' }

  // Get admin config
  const admin = await prisma.administrator.findUnique({
    where: { userId: session.user.id }
  })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user?.numControl) {
    return { success: false, error: 'No se encontró tu número de control.' }
  }

  if (!admin?.pinSiit) {
    return {
      success: false,
      error:
        'No has configurado tu PIN del SIIT. Ve a la configuración de tu perfil para agregarlo.'
    }
  }

  const result = await scrapeSiitTeachers(user.numControl, admin.pinSiit)

  if (!result.success) {
    return { success: false, error: result.error }
  }

  // Get all existing teachers to check duplicates properly (case/accent insensitive)
  const existingTeachers = await prisma.teacher.findMany({
    select: {
      id: true,
      nombre: true,
      apellidoPaterno: true,
      apellidoMaterno: true,
      shortname: true
    }
  })

  const existingMap = new Map<string, number>()
  existingTeachers.forEach((t) => {
    existingMap.set(t.shortname, t.id)

    // Alternate matching by full name without accents
    const full = `${t.nombre} ${t.apellidoPaterno} ${t.apellidoMaterno}`
    const normalizedName = removeAccents(full).toLowerCase().replace(/\s+/g, '')
    existingMap.set(normalizedName, t.id)
  })

  const preview: TeacherPreview[] = result.teachers.map((t) => {
    // Check by new shortname or by concatenated string
    const full = `${t.nombre} ${t.apellidoPaterno} ${t.apellidoMaterno}`
    const normalizedName = removeAccents(full).toLowerCase().replace(/\s+/g, '')

    const existingId =
      existingMap.get(t.shortname) || existingMap.get(normalizedName)

    const warnings: string[] = []

    // 1. Check if the raw name has more or less than 3 words
    const wordCount = t.rawName.trim().split(/\s+/).length
    if (wordCount !== 3) {
      warnings.push(
        `El nombre extraído tiene ${wordCount} palabras. Verifica que el orden y nombre del maestro se hayan asignado bien.`
      )
    }

    // 2. Fuzzy duplicate check (if not an exact match already)
    if (!existingId) {
      const nameParts = t.shortname.split('-').filter((p) => p.length > 2)
      for (const et of existingTeachers) {
        let matchCount = 0
        const existingParts = et.shortname.split('-')
        for (const p of nameParts) {
          if (existingParts.includes(p)) matchCount++
        }
        // If 2 or more names/surnames match (e.g. inverted order)
        if (matchCount >= 2) {
          warnings.push(
            `Posible duplicado: coincide parcialmente con "${et.nombre} ${et.apellidoPaterno} ${et.apellidoMaterno}"`
          )
          break
        }
      }
    }

    return {
      ...t,
      status: existingId ? 'EXISTS' : 'NEW',
      existingId,
      warnings
    }
  })

  return {
    success: true,
    data: preview
  }
}
