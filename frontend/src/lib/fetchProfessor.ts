import { Teacher } from '@prisma/client'
import { prisma } from './prisma'

export const fetchProfessor = async (
  profesor: string
): Promise<Teacher | null> => {
  const professor = await prisma.teacher.findUnique({
    where: {
      shortname: profesor
    }
  })
  return professor
}
