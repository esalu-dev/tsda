import { auth } from '@/auth'
import { prisma } from './prisma'

export async function fetchUserInfo() {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'No session' }
  }

  const user = await prisma.user.findUnique({
    select: {
      username: true,
      carrera: true,
      email: true,
      numControl: true
    },
    where: {
      id: session.user.id
    }
  })
  if (!user) {
    return { success: false, error: 'No user' }
  }
  return { success: true, user }
}
