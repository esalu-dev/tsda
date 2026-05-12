import { JSX } from 'react'

export function CardSection2({
  icon,
  title,
  description,
  color
}: {
  icon: JSX.Element
  title: string
  description: string
  color: string
}) {
  return (
    <div className="font-onest h-[280px] flex-1 rounded-xl border p-6 text-left shadow-md dark:border-0 dark:bg-light-black md:max-w-md">
      <div className={`mb-3 text-4xl ${color}`}>{icon}</div>
      <p className="pb-2 font-bold text-black dark:text-white lg:text-lg">
        {title}
      </p>
      <p className="text-[13px] text-gray-700 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
