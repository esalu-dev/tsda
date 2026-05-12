'use client'

import { logoutAction } from '@/actions/logout'
import { Button } from "@heroui/button";

export function LogoutButton() {
  return (
    <Button
      className="block max-w-xl sm:hidden"
      color="primary"
      onClick={async () => {
        await logoutAction()
      }}
    >
      Cerrar sesión
    </Button>
  )
}
