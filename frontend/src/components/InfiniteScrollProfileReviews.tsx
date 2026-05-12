import { ScrollShadow } from "@heroui/scroll-shadow";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Session } from 'next-auth'
import { Comment } from '@/components/Comment'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { fetchProfileReviewsAction } from '@/actions/fetchProfileReviewsAction'
import Link from 'next/link'
import { ProfileReviewType } from '@/schemas/ProfileReviewType'

export function InfiniteScrollProfileReviews({
  session,
  reviews
}: {
  session: Session
  reviews: ProfileReviewType[]
}) {
  const [loadedReviews, setLoadedReviews] = useState(reviews)
  const [page, setPage] = useState(1)
  const [reviewsLeft, setReviewsLeft] = useState(reviews.length === 6)
  const [prevReviews, setPrevReviews] = useState(reviews)
  const params = useParams()
  const [ref, inView] = useInView()

  if (reviews !== prevReviews) {
    setPrevReviews(reviews)
    setLoadedReviews(reviews)
    setPage(1)
    setReviewsLeft(reviews.length === 6)
  }

  useEffect(() => {
    async function loadMoreReviews() {
      const next = page + 1
      const reviews = await fetchProfileReviewsAction({
        username: params.profile as string,
        page: next
      })
      if ((reviews as ProfileReviewType[]).length === 0) {
        setReviewsLeft(false)
        return
      }
      setPage(next)
      setLoadedReviews([...loadedReviews, ...(reviews as ProfileReviewType[])])
    }

    if (inView) {
      void loadMoreReviews()
    }
  }, [inView, loadedReviews, page, params.profile])

  return (
    <section className="flex-1 overflow-y-auto">
      <ScrollShadow className="h-full">
        {session.user?.role === 'ADMIN' ? (
          <>
            {loadedReviews.map((review) => {
              return (
                <div key={review.id} className="flex flex-col gap-3 p-2">
                  <Breadcrumbs size="lg">
                    <BreadcrumbItem isDisabled>Profesor</BreadcrumbItem>
                    <BreadcrumbItem>
                      <Link
                        href={`/app/profesor/${review.teacher.shortname}`}
                        className="transition-all hover:text-main-red"
                      >
                        {`${review.teacher.nombre} ${review.teacher.apellidoPaterno} ${review.teacher.apellidoMaterno}`}
                      </Link>
                    </BreadcrumbItem>
                  </Breadcrumbs>
                  <Comment
                    review={review}
                    session={session}
                    published={review.published}
                    seenFromProfile
                  />
                  <Divider />
                </div>
              )
            })}
            {reviewsLeft && (
              <span className="flex justify-center py-4">
                <Spinner ref={ref} />
              </span>
            )}
          </>
        ) : (
          <>
            {loadedReviews
              .filter((review) => review.published)
              .map((review) => {
                return (
                  <div key={review.id} className="flex flex-col gap-3 p-2">
                    <Breadcrumbs size="lg">
                      <BreadcrumbItem isDisabled>Profesor</BreadcrumbItem>
                      <BreadcrumbItem>
                        <Link
                          href={`/app/profesor/${review.teacher.shortname}`}
                          className="transition-all hover:text-main-red"
                        >
                          {`${review.teacher.nombre} ${review.teacher.apellidoPaterno} ${review.teacher.apellidoMaterno}`}
                        </Link>
                      </BreadcrumbItem>
                    </Breadcrumbs>
                    <Comment
                      review={review}
                      session={session}
                      seenFromProfile
                    />
                    <Divider />
                  </div>
                )
              })}
            {reviewsLeft && (
              <span className="flex justify-center py-4">
                <Spinner ref={ref} />
              </span>
            )}
          </>
        )}
      </ScrollShadow>
    </section>
  )
}
