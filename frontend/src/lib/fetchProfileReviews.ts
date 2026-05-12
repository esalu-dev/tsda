import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const fetchProfileReviews = async (username: string, page: number) => {
  const ITEMS_PER_PAGE = 6
  const session = await auth()

  if (!session) {
    return {
      success: false,
      error: 'Not authenticated'
    }
  }

  const offset = (page - 1) * ITEMS_PER_PAGE

  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      user: {
        select: {
          username: true
        }
      },
      teacher: {
        select: {
          shortname: true,
          nombre: true,
          apellidoPaterno: true,
          apellidoMaterno: true
        }
      },
      rating: true,
      body: true,
      difficulty: true,
      wouldTakeAgain: true,
      learningLevel: true,
      published: true,
      createdAt: true,
      materia: {
        select: {
          nombre: true
        }
      },
      likes: {
        select: {
          id: true,
          userId: true
        }
      }
    },
    where: {
      user: {
        username
      }
    },
    take: ITEMS_PER_PAGE,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    }
  })
  return reviews.map((review) => ({
    ...review,
    likedByUser: review.likes.some((like) => like.userId === session?.user.id),
    likesCount: review.likes.length
  }))
}
