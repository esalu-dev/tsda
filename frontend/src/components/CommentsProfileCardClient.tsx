'use client'

import { Session } from 'next-auth'
import { InfiniteScrollProfileReviews } from '@/components/InfiniteScrollProfileReviews'
import { ProfileReviewType } from '@/schemas/ProfileReviewType'

export function CommentsProfileCardClient({
  reviews,
  session
}: {
  reviews: ProfileReviewType[]
  session: Session
}) {
  return (
    <div className="flex flex-grow basis-[500px] flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 shadow-sm dark:bg-dark-black">
      {reviews.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center">
          <h3 className="text-lg font-bold">No hay comentarios</h3>
          <p className="text-sm text-gray-500">
            Sé el primero en dejar un comentario
          </p>
        </div>
      ) : (
        <InfiniteScrollProfileReviews session={session} reviews={reviews} />
      )}
    </div>
  )
}
