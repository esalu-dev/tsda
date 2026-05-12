import { auth } from '@/auth'
import { SidebarDropdown } from '@/components/SidebarDropdown'
import { SidebarItem } from '@/components/SidebarItem'
import { Chakra_Petch } from 'next/font/google'
import styles from './grid.module.css'
import { FiHome, FiSearch, FiSettings, FiUser } from 'react-icons/fi'
import { Logo } from '@/components/Logo'
import { ReactNode } from 'react'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})
export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <div
      className={`${styles.main} relative h-screen bg-main-white dark:bg-light-black`}
    >
      <aside className="flex min-h-20 items-center justify-center gap-4 rounded-t-2xl bg-white px-12 py-2 shadow-sm [grid-area:aside] dark:bg-dark-black sm:flex-col sm:items-start sm:justify-between sm:rounded-e-3xl">
        <div className="flex w-full justify-between gap-4 sm:flex-col">
          <h3
            className={`${chakra.className} relative -left-3 my-10 hidden gap-2 text-3xl text-main-red sm:flex`}
          >
            <Logo />
            Profedex
          </h3>
          <SidebarItem href="/app">
            <FiHome className="text-2xl sm:text-lg" />
            <p className="hidden sm:inline">Inicio</p>
          </SidebarItem>
          <SidebarItem href="/app/search">
            <FiSearch className="text-2xl sm:text-lg" />
            <p className="hidden sm:inline">Búsqueda</p>
          </SidebarItem>
          <SidebarItem href="/app/settings">
            <FiSettings className="text-2xl sm:text-lg" />
            <p className="hidden sm:inline">Ajustes</p>
          </SidebarItem>
          <span className="sm:hidden">
            <SidebarItem href={`/app/profile/${session?.user.name ?? ''}`}>
              <FiUser className="text-2xl sm:text-lg" />
              <p className="hidden sm:inline">Perfil</p>
            </SidebarItem>
          </span>
        </div>
        <span className="hidden sm:inline-block">
          <SidebarDropdown
            username={session?.user.username ?? ''}
            role={session?.user.role ?? ''}
          />
        </span>
      </aside>
      <section className="max-h-screen overflow-y-auto [grid-area:main]">
        {children}
      </section>
    </div>
  )
}
