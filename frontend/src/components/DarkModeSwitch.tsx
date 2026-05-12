'use client'
import { Switch } from '@heroui/switch'
import { cn } from '@heroui/theme'
import { useTheme } from 'next-themes'

export function DarkModeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <Switch
      isSelected={resolvedTheme === 'dark'}
      onValueChange={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
      classNames={{
        base: cn(
          'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
          'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        )
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-medium">Tema oscuro</p>
        <p className="text-default-400 text-tiny">
          Activa el tema oscuro para reducir la fatiga visual
        </p>
      </div>
    </Switch>
  )
}
