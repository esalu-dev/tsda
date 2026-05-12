import { fetchTeacherCount } from '@/lib/fetchTeacherCount'
import { PaginationResults } from './PaginationResults'

export async function PaginationServer({ query }: { query: string }) {
  const count = await fetchTeacherCount({ query })
  return count > 0 && <PaginationResults count={count} />
}
