import { DarkModeButton } from '@/components/DarkModeButton'
import { Logo } from '@/components/Logo'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: 'url(/bg2.webp)',
        backgroundSize: 'cover'
      }}
      className="flex flex-row-reverse"
    >
      <span className="absolute left-6 top-6 hidden size-10 lg:dark:inline">
        <Link href="/">
          <Logo dark />
        </Link>
      </span>
      <span className="absolute left-6 top-6 hidden size-10 dark:hidden lg:inline">
        <Link href="/">
          <Logo light />
        </Link>
      </span>
      {children}
      <DarkModeButton />
    </div>
  )
}
