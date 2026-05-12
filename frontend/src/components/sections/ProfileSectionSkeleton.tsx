import { Skeleton } from "@heroui/skeleton";
import { Chakra_Petch } from 'next/font/google'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})
export function ProfileSectionSkeleton() {
  return (
    <div className="h-full p-4 sm:p-12">
      <h1 className={`${chakra.className} text-3xl font-bold`}>Perfil</h1>
      <article>
        <h2 className={`my-2 text-xl ${chakra.className}`}>
          Información personal
        </h2>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Si deseas modificar tu información personal, por favor contacta a
            soporte.
          </p>
          <Skeleton className="h-12 max-w-xl rounded-xl">
            <div className="max-w-xl" />
          </Skeleton>

          <Skeleton className="h-12 max-w-xl rounded-xl">
            <div className="max-w-xl" />
          </Skeleton>
          <Skeleton className="h-12 max-w-xl rounded-xl">
            <div className="max-w-xl" />
          </Skeleton>
          <Skeleton className="h-12 max-w-xl rounded-xl">
            <div className="max-w-xl" />
          </Skeleton>
        </div>
      </article>
    </div>
  )
}
