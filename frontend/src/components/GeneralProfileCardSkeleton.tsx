import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";

export async function GeneralProfileCardSkeleton() {
  return (
    <section className="relative flex flex-1 basis-60 flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-sm dark:bg-dark-black">
      <Skeleton className="rounded-full">
        <Avatar
          showFallback
          fallback="E"
          color="primary"
          size="lg"
          classNames={{
            fallback: 'text-xl font-bold'
          }}
        />
      </Skeleton>
      <Skeleton className="rounded-lg text-xl font-bold">
        Username of the user
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="text-center">
          <p className="text-gray-500">Ingeniería en algo mágico</p>
          <p>
            Miembro desde <strong className="text-primary">2024</strong>
          </p>
        </div>
      </Skeleton>
    </section>
  )
}
