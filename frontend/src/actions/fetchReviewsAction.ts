'use server'

import { fetchReviews } from '@/lib/fetchReviews'

export async function fetchReviewsAction({
  shortname,
  filter,
  page = 1,
  career
}: {
  shortname: string
  filter: string
  page?: number
  career?: string
}) {
  return await fetchReviews(shortname, filter, page, career)
}
