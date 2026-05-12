import { prisma } from './prisma'

export const getStats = async (shortname: string) => {
  const reviews = await prisma.review.findMany({
    select: {
      difficulty: true,
      wouldTakeAgain: true,
      learningLevel: true
    },
    where: {
      teacher: {
        shortname
      },
      published: true
    }
  })

  const wouldTakeAgain = Math.round(
    ((reviews.reduce(
      (acc: number, review) => acc + Number(review.wouldTakeAgain),
      0
    ) /
      reviews.length) *
      100 *
      10) /
      10
  )
  const difficulty =
    Math.round(
      (reviews.reduce(
        (acc: number, review) => acc + Number(review.difficulty),
        0
      ) /
        reviews.length) *
        10
    ) / 10
  const learningLevel =
    Math.round(
      (reviews.reduce(
        (acc: number, review) => acc + Number(review.learningLevel),
        0
      ) /
        reviews.length) *
        10
    ) / 10
  return {
    wouldTakeAgain,
    difficulty,
    learningLevel
  }
}
