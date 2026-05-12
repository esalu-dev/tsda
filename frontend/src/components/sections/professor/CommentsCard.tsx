import { CommentsCardClient } from './CommentsCardClient'
import { fetchMaterias } from '@/lib/fetchMaterias'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { fetchReviewsAction } from '@/actions/fetchReviewsAction'

export async function CommentsCard({
  shortname,
  filter,
  career
}: {
  shortname: string
  filter?: string
  career?: string
}) {
  const filterString = filter ?? ''
  const reviews = await fetchReviewsAction({
    shortname,
    filter: filterString,
    career
  })
  const materias = await fetchMaterias()
  const session = await auth()
  return (
    <CommentsCardClient
      reviews={reviews}
      shortname={shortname}
      materias={materias}
      session={session as Session}
    />
  )
}
