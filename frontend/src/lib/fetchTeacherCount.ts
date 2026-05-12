import { prisma } from './prisma'

export const fetchTeacherCount = async ({ query }: { query: string }) => {
  const teacherCount = await prisma.teacher.count({
    where: {
      OR: [
        { shortname: { contains: query } },
        { nombre: { contains: query } },
        { apellidoPaterno: { contains: query } },
        { apellidoMaterno: { contains: query } }
      ]
    }
  })
  return teacherCount
}
