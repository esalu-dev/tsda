'use client'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { FiMenu } from 'react-icons/fi'
import { DarkModeLandingButton } from './DarkModeLandingButton'

export function LandingDropdown() {
  return (
    <span className="mx-2 flex items-center justify-end rounded-lg text-lg lg:hidden">
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="light"
            className="text-xl text-gray-500"
            aria-label="
            Open menu button
          "
          >
            <FiMenu />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="inicio">
            <a href="#inicio">Inicio</a>
          </DropdownItem>
          <DropdownItem key="why">
            <a href="#power">¿Por qué Profedex?</a>
          </DropdownItem>
          <DropdownItem key="register" href="#register">
            ¿Cómo me registro?
          </DropdownItem>
          <DropdownItem key="privacy" href="#privacy">
            Privacidad
          </DropdownItem>
          <DropdownItem
            key="enter"
            href="/app"
            className="text-main-red"
            startContent
          >
            Entrar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DarkModeLandingButton />
    </span>
  )
}
