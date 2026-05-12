import { ReviewType } from '@/schemas/ReviewType'
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import { Session } from 'next-auth'
import { Comment } from '@/components/Comment'
import { useEffect, useState } from 'react'
import { fetchReviewsAction } from '@/actions/fetchReviewsAction'
import { useParams, useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'

export function InfiniteScrollReviews({
  session,
  reviews
}: {
  session: Session
  reviews: ReviewType[]
}) {
  const [loadedReviews, setLoadedReviews] = useState(reviews)
  const [page, setPage] = useState(1)
  const [reviewsLeft, setReviewsLeft] = useState(reviews.length === 6)
  const [prevReviews, setPrevReviews] = useState(reviews)
  const params = useParams()
  const searchParams = useSearchParams()
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
      const filter = searchParams.get('filter') ?? ''
      const reviews = await fetchReviewsAction({
        shortname: params.profesor as string,
        filter,
        page: next
      })
      if (reviews.length === 0) {
        setReviewsLeft(false)
        return
      }
      setPage(next)
      setLoadedReviews([...loadedReviews, ...reviews])
    }

    if (inView) {
      void loadMoreReviews()
    }
  }, [inView, loadedReviews, page, params.profesor, searchParams])

  return (
    <section className="flex-1 overflow-y-auto">
      <ScrollShadow className="h-full">
        {session.user?.role === 'ADMIN' ? (
          <>
            {loadedReviews.map((review) => {
              return (
                <div key={review.id} className="flex flex-col gap-3 p-2">
                  <Comment
                    review={review}
                    session={session}
                    published={review.published}
                    seenFromProfile={false}
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
                    <Comment
                      review={review}
                      session={session}
                      seenFromProfile={false}
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
