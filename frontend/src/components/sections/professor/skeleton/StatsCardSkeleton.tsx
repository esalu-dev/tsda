import { StatCardSkeleton } from './StatCardSkeleton'

export async function StatsCardSkeleton() {
  return (
    <div className="flex flex-1 basis-60 flex-col gap-4">
      <StatCardSkeleton type="¿Volvería a cursar?" />
      <StatCardSkeleton type="Dificultad" />
      <StatCardSkeleton type="Aprendizaje percibido" />
    </div>
  )
}
