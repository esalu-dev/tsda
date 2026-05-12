import { auth } from '@/auth'
import { prisma } from './prisma'
import { getCareerValueFromFilter } from '@/lib/getCareerName'

export const fetchReviews = async (
  shortname: string,
  filter: string,
  page: number,
  career?: string
) => {
  const ITEMS_PER_PAGE = 6
  const session = await auth()

  const careerName = getCareerValueFromFilter(career)

  const userId = filter === 'mine' ? session?.user.id : undefined
  const offset = (page - 1) * ITEMS_PER_PAGE
  const query = {
    orderBy: {}
  }
  if (filter === 'recent') {
    query.orderBy = { createdAt: 'desc' }
  } else if (filter === 'old') {
    query.orderBy = { createdAt: 'asc' }
  } else {
    query.orderBy = {
      likes: {
        _count: 'desc'
      }
    }
  }

  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      user: {
        select: {
          username: true
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
      teacher: {
        shortname
      },
      userId,
      user: {
        carrera: careerName
      }
    },
    orderBy: query.orderBy,
    take: ITEMS_PER_PAGE,
    skip: offset
  })
  return reviews.map((review) => ({
    ...review,
    likedByUser: review.likes.some((like) => like.userId === session?.user.id),
    likesCount: review.likes.length
  }))
}
