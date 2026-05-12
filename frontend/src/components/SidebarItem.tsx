'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export function SidebarItem({
  href,
  children
}: {
  href: string
  children: ReactNode
}) {
  const [selected, setSelected] = useState(false)
  const router = usePathname()

  useEffect(() => {
    setSelected(router === href)
  }, [router, href])
  return (
    <Link href={href}>
      <ul
        className={`flex items-center rounded-xl px-2 py-2 text-sm outline-1 transition-all sm:gap-3 ${
          selected
            ? 'font-bold text-main-red dark:text-main-red-300'
            : 'text-gray-500 hover:text-black dark:text-white sm:hover:translate-x-1'
        } flex-col justify-center gap-2 sm:flex-row sm:justify-start`}
      >
        {children}
      </ul>
    </Link>
  )
}
