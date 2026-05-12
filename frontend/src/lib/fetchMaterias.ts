import { auth } from '@/auth'
import { prisma } from './prisma'

export const fetchMaterias = async () => {
  const session = await auth()
  const materias = await prisma.materias.findMany({
    where: {
      carrera: session?.user?.carrera
    }
  })
  return materias
}
