import { fetchProfileReviewsAction } from '@/actions/fetchProfileReviewsAction'
import { CommentsProfileCardClient } from '@/components/CommentsProfileCardClient'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { ProfileReviewType } from '@/schemas/ProfileReviewType'

export async function CommentsProfileCard({ username }: { username: string }) {
  const session = await auth()
  const reviews = await fetchProfileReviewsAction({ username })
  return (
    <CommentsProfileCardClient
      reviews={reviews as ProfileReviewType[]}
      session={session as Session}
    />
  )
}
