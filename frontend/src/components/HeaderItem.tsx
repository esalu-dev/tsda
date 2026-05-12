import { ReactNode } from 'react'

export function HeaderItem({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  return (
    <li>
      <a
        href={`#${href}`}
        className="font-onest text-gray-600 duration-500 hover:text-main-red dark:text-gray-200 dark:hover:text-main-red-200"
      >
        {children}
      </a>
    </li>
  )
}
