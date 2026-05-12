import { SearchResultSkeleton } from './SearchResultSkeleton'

export function SearchResultsSkeleton() {
  return (
    <section className="flex flex-1 flex-col gap-3">
      <SearchResultSkeleton />
      <SearchResultSkeleton />
      <SearchResultSkeleton />
      <SearchResultSkeleton />
      <SearchResultSkeleton />
    </section>
  )
}
