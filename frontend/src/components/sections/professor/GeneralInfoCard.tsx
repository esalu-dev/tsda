import { fetchProfessor } from '@/lib/fetchProfessor'
import { getGeneralRating } from '@/lib/getGeneralRating'
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { notFound } from 'next/navigation'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { MdInfo } from 'react-icons/md'

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div className="mt-2 flex items-center text-3xl text-yellow-500">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <FaStar key={i} />
        ))}
      {halfStar && <FaRegStarHalfStroke />}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <FaRegStar key={i} />
        ))}
    </div>
  )
}

export async function GeneralInfoCard({ shortname }: { shortname: string }) {
  const professor = await fetchProfessor(shortname)
  if (professor === null) return notFound()
  const rating = await getGeneralRating(shortname)
  return (
    <section className="relative flex flex-1 basis-60 flex-col items-center justify-evenly rounded-2xl bg-white shadow-sm dark:bg-dark-black">
      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-ellipsis text-center text-xl">
          {`${professor.nombre} ${professor.apellidoPaterno} ${professor.apellidoMaterno}`}
        </h1>
        {professor?.active ? (
          <Chip size="sm" variant="dot" color="success">
            Activo
          </Chip>
        ) : (
          <Chip size="sm" variant="dot" color="primary">
            Inactivo
          </Chip>
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">Calificación general:</p>
        <strong className="mt-1 text-3xl">
          {rating === -1 ? '-' : rating}
        </strong>
        {rating === -1 ? (
          <p className="text-sm text-gray-500">No hay calificaciones</p>
        ) : (
          <StarRating rating={rating} />
        )}
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
          <MdInfo className="absolute left-3 top-3 hidden text-gray-300 dark:text-gray-700 sm:inline-block" />
        </Tooltip>
      </div>
    </section>
  )
}
