import { StatCardHomeSkeleton } from './StatCardHomeSkeleton'

export function StatsCardHomeSkeleton() {
  return (
    <section className="grid flex-1 grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-4 sm:grid-rows-1">
      <StatCardHomeSkeleton />
      <StatCardHomeSkeleton />
      <StatCardHomeSkeleton />
      <StatCardHomeSkeleton />
    </section>
  )
}
