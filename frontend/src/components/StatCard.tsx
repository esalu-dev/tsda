import { Tooltip } from "@heroui/tooltip";
import { Chakra_Petch } from 'next/font/google'
import { JSX } from 'react'
import { LuMinus } from 'react-icons/lu'
import { MdInfo } from 'react-icons/md'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

type ValidOptions =
  | '¿Volvería a cursar?'
  | 'Dificultad'
  | 'Aprendizaje percibido'

export function StatCard({
  type,
  rating,
  content
}: {
  type: ValidOptions
  rating: number
  content: JSX.Element
}) {
  return (
    <article
      className={`relative flex flex-1 items-center justify-between px-8 ${
        type === '¿Volvería a cursar?'
          ? 'bg-main-red font-bold text-white'
          : 'bg-white dark:bg-dark-black'
      } rounded-2xl shadow-sm`}
    >
      <h3 className="text-base">{type}</h3>
      {type === '¿Volvería a cursar?' && (
        <p className={`${chakra.className} text-3xl font-bold`}>
          {rating || rating === 0 ? `${rating}%` : <LuMinus />}
        </p>
      )}
      {type === 'Dificultad' && (
        <p
          className={`${chakra.className} text-3xl font-bold ${
            rating < 4
              ? 'text-green-600'
              : rating > 7
                ? 'text-red-600'
                : 'text-yellow-500'
          } `}
        >
          {rating || rating === 0 ? (
            `${rating}/10`
          ) : (
            <LuMinus className="text-gray-400 dark:text-white" />
          )}
        </p>
      )}
      {type === 'Aprendizaje percibido' && (
        <p
          className={`${chakra.className} text-3xl font-bold ${
            rating < 4
              ? 'text-red-600'
              : rating > 7
                ? 'text-green-600'
                : 'text-yellow-500'
          } `}
        >
          {rating || rating === 0 ? (
            `${rating}/10`
          ) : (
            <LuMinus className="text-gray-400 dark:text-white" />
          )}
        </p>
      )}
      {type === '¿Volvería a cursar?' ? (
        <Tooltip showArrow content={content}>
          <MdInfo className="absolute left-2 top-2 hidden text-white sm:inline" />
        </Tooltip>
      ) : (
        <Tooltip showArrow content={content}>
          <MdInfo className="absolute left-2 top-2 hidden text-gray-300 dark:text-gray-700 sm:inline" />
        </Tooltip>
      )}
    </article>
  )
}
