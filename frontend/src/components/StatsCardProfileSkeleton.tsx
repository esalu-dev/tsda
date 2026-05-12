import { StatCardProfileSkeleton } from '@/components/StatCardProfileSkeleton'

export function StatsCardProfileSkeleton() {
  return (
    <div className="flex flex-1 basis-40 flex-col gap-4">
      <StatCardProfileSkeleton type="Total de comentarios" />
      <StatCardProfileSkeleton type="Likes recibidos" />
    </div>
  )
}
