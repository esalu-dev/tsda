'use client'

import { Button } from "@heroui/button";
import { useTheme } from 'next-themes'
import { IoSunny, IoMoon } from 'react-icons/io5'

export function DarkModeButton() {
  const { setTheme, resolvedTheme } = useTheme()

  if (!resolvedTheme) {
    return <Button isIconOnly aria-label="Dark mode" radius="full" isDisabled />
  }
  return (
    <Button
      isIconOnly
      aria-label="Dark mode"
      className="absolute text-lg text-black dark:bg-dark-black dark:text-white max-lg:right-10 max-lg:top-10 lg:bottom-4 lg:left-4"
      onPress={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      radius="full"
    >
      {resolvedTheme === 'dark' ? <IoSunny /> : <IoMoon />}
    </Button>
  )
}
