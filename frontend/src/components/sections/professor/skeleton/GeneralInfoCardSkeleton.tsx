import { Skeleton } from "@heroui/skeleton";
import { Tooltip } from "@heroui/tooltip";
import { FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { MdInfo } from 'react-icons/md'

export function GeneralInfoCardSkeleton() {
  return (
    <section className="relative flex flex-1 basis-60 flex-col items-center justify-evenly rounded-2xl bg-white shadow-sm dark:bg-dark-black">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="rounded-lg">
          <div className="h-8 w-[250px] rounded-lg" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-24 rounded-lg" />
        </Skeleton>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">Calificación general:</p>
        <strong className="text-3xl">4.5</strong>
        <div className="mt-3 flex text-3xl text-yellow-500">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <Tooltip
          showArrow
          content={
            <div className="w-[300px]">
              <strong>Calificación general</strong>
              <p className="text-pretty">
                La calificación general es el promedio de todas las
                calificaciones que ha recibido el profesor.
              </p>
            </div>
          }
        >
          <MdInfo className="absolute left-3 top-3 text-gray-300 dark:text-gray-700" />
        </Tooltip>
      </div>
    </section>
  )
}
