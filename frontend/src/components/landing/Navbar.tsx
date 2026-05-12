/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chakra_Petch } from 'next/font/google'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const links = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Por qué', href: '#power' },
    { name: 'Cómo funciona', href: '#register' },
    { name: 'Privacidad', href: '#privacy' },
    { name: 'FAQ', href: '#faq' }
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <img src="./logo.svg" alt="Profedex Logo" className="h-8 w-auto" />
            <Link
              href="/"
              className={`text-2xl text-main-red ${chakra.className} font-bold tracking-tight transition-opacity hover:opacity-80`}
            >
              Profedex
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-main-red dark:text-gray-300 dark:hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-4 md:flex">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onPress={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="text-gray-700 dark:text-white"
            >
              {theme === 'dark' ? (
                <IoSunny className="text-xl" />
              ) : (
                <IoMoon className="text-xl" />
              )}
            </Button>
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-gray-700 hover:text-main-red dark:text-gray-200"
            >
              Entrar
            </Link>
            <Button
              as={Link}
              href="/auth/register"
              className="bg-main-red font-bold text-white shadow-lg shadow-red-500/20"
              variant="shadow"
              radius="full"
            >
              Crear cuenta
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onPress={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="text-gray-700 dark:text-white"
            >
              {theme === 'dark' ? (
                <IoSunny className="text-xl" />
              ) : (
                <IoMoon className="text-xl" />
              )}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-white focus:outline-none dark:text-gray-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-b border-gray-100 bg-white backdrop-blur-xl dark:border-white/10 dark:bg-black/95 md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:text-main-red dark:text-gray-300"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 px-3 pt-4">
              <Button
                as={Link}
                href="/auth/login"
                variant="light"
                className="w-full justify-start pl-0 text-gray-600 dark:text-gray-300"
              >
                Entrar
              </Button>
              <Button
                as={Link}
                href="/auth/register"
                className="w-full bg-main-red text-white shadow-lg"
              >
                Crear cuenta
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
