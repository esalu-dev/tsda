import { Skeleton } from "@heroui/skeleton";

export function StatCardHomeSkeleton() {
  return (
    <div className="flex flex-col rounded-xl bg-white p-4 shadow-sm dark:bg-dark-black">
      <header className="mb-3 flex items-center gap-3">
        <Skeleton className="size-8 rounded-full">
          <div className="inline-block rounded-full p-2" />
        </Skeleton>
        <Skeleton className="size-4 w-28 rounded-md" />
      </header>
      <section className="flex flex-1 flex-col justify-center gap-2">
        <Skeleton className="h-12 w-16 rounded-md" />
        <Skeleton className="h-4 w-36 rounded-md" />
      </section>
    </div>
  )
}
