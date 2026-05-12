'use server'

import { fetchProfileReviews } from '@/lib/fetchProfileReviews'

export async function fetchProfileReviewsAction({
  username,
  page = 1
}: {
  username: string
  page?: number
}) {
  return await fetchProfileReviews(username, page)
}
