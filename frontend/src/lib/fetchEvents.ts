import { auth } from '@/auth'
import { prisma } from './prisma'

export const fetchEvents = async () => {
  const session = await auth()
  if (!session) {
    return {
      success: false,
      message: 'Not authenticated'
    }
  }
  const events = await prisma.events.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      startDate: true,
      endDate: true
    }
  })
  return {
    success: true,
    data: events
  }
}
