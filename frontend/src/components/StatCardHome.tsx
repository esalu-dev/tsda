import { Chakra_Petch } from 'next/font/google'
import { ReactNode } from 'react'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export function StatCardHome({
  icon,
  color,
  title,
  body,
  subtitle
}: {
  icon: ReactNode
  color: string
  title: string
  body: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-4 shadow-sm dark:bg-dark-black">
      <header className="mb-3 flex items-center gap-1 md:gap-3">
        <span className={`${color} inline-block rounded-full p-2`}>{icon}</span>
        <h3 className="font-bold text-gray-500">{title}</h3>
      </header>
      <section className="flex flex-1 flex-col justify-center gap-2">
        <p className={`text-5xl font-bold ${chakra.className}`}>{body}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </section>
    </div>
  )
}
