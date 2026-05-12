'use client'

import { Button } from "@heroui/button";
import { useTheme } from 'next-themes'
import { IoSunny, IoMoon } from 'react-icons/io5'

export function DarkModeLandingButton() {
  const { setTheme, resolvedTheme } = useTheme()
  if (!resolvedTheme) {
    return <Button isIconOnly aria-label="Dark mode" radius="full" isDisabled />
  }
  return (
    <Button
      isIconOnly
      aria-label="Dark mode"
      className="bg-white text-lg text-black dark:bg-dark-black dark:text-white"
      onPress={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      {resolvedTheme === 'dark' ? <IoSunny /> : <IoMoon />}
    </Button>
  )
}
