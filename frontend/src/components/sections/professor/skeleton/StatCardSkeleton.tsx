import { Skeleton } from "@heroui/skeleton";

export function StatCardSkeleton({ type }: { type: string }) {
  return (
    <article
      className={`relative flex flex-1 items-center justify-between px-8 ${
        type === '¿Volvería a cursar?'
          ? 'bg-main-red font-bold text-white'
          : 'bg-white dark:bg-dark-black'
      } rounded-2xl shadow-sm`}
    >
      <h3 className="text-base">{type}</h3>
      <Skeleton className="rounded-lg">
        <p className="text-3xl font-bold">100%</p>
      </Skeleton>
    </article>
  )
}
