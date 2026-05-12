'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function likeReview(reviewId: number) {
  const session = await auth()
  if (!session?.user.id) return { error: 'Unauthorized', success: false }
  const existingLike = await prisma.like.findFirst({
    where: {
      reviewId,
      userId: session.user.id
    }
  })
  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id
      }
    })
    return { success: true }
  }
  const like = await prisma.like.create({
    data: {
      user: {
        connect: {
          id: session.user.id
        }
      },
      review: {
        connect: {
          id: reviewId
        }
      }
    }
  })
  if (!like) return { error: 'Server error', success: false }

  return { success: true }
}
