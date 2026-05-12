import { JSX } from 'react'

export function CardSection4({
  title,
  description,
  icon
}: {
  title: string
  description: string
  icon: JSX.Element
}) {
  return (
    <div className="font-onest h-[170px] max-w-xl rounded-xl bg-white p-4 shadow-lg dark:border-black dark:bg-dark-black md:p-8">
      <p className="flex items-center gap-2 font-bold text-black dark:text-white md:pb-2 lg:text-lg lg:leading-tight">
        {icon}
        {title}
      </p>
      <p className="pt-2 text-[13px] text-gray-700 dark:text-gray-400 lg:max-w-2xl">
        {description}
      </p>
    </div>
  )
}
