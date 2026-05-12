'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function toggleReviewVisibility(reviewId: number) {
  const session = await auth()
  if (!session) return { success: false, error: 'Unauthorized' }
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  })
  if (!review) return { success: false, error: 'Review not found' }

  const canDelete =
    review.userId === session.user.id || session.user.role === 'ADMIN'

  if (!canDelete) return { success: false, error: 'Unauthorized' }

  const updatedReview = await prisma.review.update({
    data: {
      published: !review.published
    },
    where: {
      id: review.id
    }
  })
  if (!updatedReview) {
    return { success: false, error: 'Server error. Could not update review' }
  }
  return { success: true }
}
