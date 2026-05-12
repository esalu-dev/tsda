import { FiCalendar } from 'react-icons/fi'

export function NoEventsCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-black dark:text-white">
      <span className="text-2xl">
        <FiCalendar />
      </span>
      <h2 className="text-center text-xl font-bold">
        No hay eventos próximamente
      </h2>
      <p className="mt-2 text-center text-gray-500">
        ¡Vuelve pronto para enterarte de las últimas novedades!
      </p>
    </div>
  )
}
