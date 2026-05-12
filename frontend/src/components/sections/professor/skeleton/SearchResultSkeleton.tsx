import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";

export function SearchResultSkeleton() {
  return (
    <div className="flex h-16 w-full items-center justify-between rounded-xl bg-white p-3 dark:bg-dark-black">
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full">
          <Avatar
            showFallback
            classNames={{
              name: 'text-lg'
            }}
          />
        </Skeleton>

        <Skeleton className="rounded-lg">
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </Skeleton>
      </div>
    </div>
  )
}
