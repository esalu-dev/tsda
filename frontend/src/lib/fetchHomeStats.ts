import { auth } from '@/auth'
import { prisma } from './prisma'

export async function fetchHomeStats() {
  const session = await auth()

  if (!session) return { success: false, error: 'Not authenticated' }

  try {
    const reviewCount = prisma.review.count({
      where: {
        published: true
      }
    })
    const userReviewCount = prisma.review.count({
      where: {
        userId: session.user.id
      }
    })
    const teacherCount = prisma.teacher.count()
    const likeCount = prisma.like.count({
      where: {
        userId: session.user.id
      }
    })
    const data = await Promise.all([
      reviewCount,
      userReviewCount,
      teacherCount,
      likeCount
    ])
    return {
      success: true,
      data: {
        reviewCount: data[0],
        userReviewCount: data[1],
        teacherCount: data[2],
        likeCount: data[3]
      }
    }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
