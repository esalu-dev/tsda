import { Skeleton } from "@heroui/skeleton";

export function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full">
            <div className="size-10" />
          </Skeleton>
          <div className="flex flex-col justify-center">
            <Skeleton className="rounded-lg">
              <div className="text-md h-4 w-28" />
            </Skeleton>
            <div className="h-4" />
          </div>
        </div>
        <div>
          <Skeleton className="rounded-lg">
            <div className="h-4 w-28 text-sm text-gray-400" />
          </Skeleton>
        </div>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-10 w-28 text-sm text-gray-400" />
      </Skeleton>
      <p className="text-sm" />
      <div className="flex justify-between gap-3">
        <div className="flex gap-2">
          <Skeleton className="rounded-full">
            <div className="h-8 w-12" />
          </Skeleton>
          <Skeleton className="rounded-full">
            <div className="h-8 w-16" />
          </Skeleton>
          <Skeleton className="rounded-full">
            <div className="h-8 w-16" />
          </Skeleton>
        </div>
        <div className="flex gap-2">
          <Skeleton className="rounded-md">
            <div className="h-8 w-16" />
          </Skeleton>
        </div>
      </div>
    </div>
  )
}
