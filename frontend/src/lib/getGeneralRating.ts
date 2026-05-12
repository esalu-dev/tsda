import { prisma } from './prisma'

export async function getGeneralRating(shortname: string) {
  const reviews = await prisma.review.findMany({
    select: {
      rating: true
    },
    where: {
      teacher: {
        shortname
      },
      published: true
    }
  })

  if (reviews.length === 0) {
    return -1
  }
  const rating =
    Math.round(
      (reviews.reduce((acc: number, review) => acc + Number(review.rating), 0) /
        reviews.length) *
        10
    ) / 10

  return rating
}
