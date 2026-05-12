import { Tooltip } from "@heroui/tooltip";
import { Chakra_Petch } from 'next/font/google'
import { JSX } from 'react'
import { LuMinus } from 'react-icons/lu'
import { MdInfo } from 'react-icons/md'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export function StatCardProfile({
  type,
  rating,
  content
}: {
  type: string
  rating: number
  content: JSX.Element
}) {
  return (
    <article
      className={`relative flex flex-1 items-center justify-between px-8 ${
        type === 'Total de comentarios'
          ? 'bg-main-red font-bold text-white'
          : 'bg-white dark:bg-dark-black'
      } rounded-2xl shadow-sm`}
    >
      {' '}
      <h3 className="text-base">{type}</h3>
      <p className={`${chakra.className} text-3xl font-bold`}>
        {rating || rating === 0 ? rating : <LuMinus />}
      </p>
      {type === 'Total de comentarios' ? (
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
