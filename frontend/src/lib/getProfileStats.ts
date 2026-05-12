import { prisma } from '@/lib/prisma'

export const getProfileStats = async (username: string) => {
  const reviewCount = await prisma.review.count({
    where: {
      user: {
        username
      },
      published: true
    }
  })

  const likeCount = await prisma.like.count({
    where: {
      review: {
        user: {
          username
        },
        published: true
      }
    }
  })

  return {
    reviewCount,
    likeCount
  }
}
