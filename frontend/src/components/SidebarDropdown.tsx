'use client'
import { logoutAction } from '@/actions/logout'
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useState } from 'react'
import { FiUser, FiShield } from 'react-icons/fi'

import { MdArrowDropUp } from 'react-icons/md'

export function SidebarDropdown({
  username,
  role
}: {
  username: string
  role: string
}) {
  const [selected, setSelected] = useState(false)
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="shadow"
          color="primary"
          className="mb-10 justify-between px-2"
          size="lg"
          radius="lg"
          onClick={() => setSelected(!selected)}
        >
          <div className="flex items-center gap-2 px-2">
            {role === 'ADMIN' ? (
              <FiShield className="text-xl" />
            ) : (
              <FiUser className="text-xl" />
            )}
            <p className="w-16 overflow-clip text-ellipsis text-left text-sm font-bold">
              {username}
            </p>
          </div>
          <MdArrowDropUp
            className={`mr-2 transition duration-1000 ease-in-out ${
              selected ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile" href={`/app/profile/${username}`}>
          Perfil
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-main-red dark:text-main-red-200"
          color="primary"
          onPress={async () => {
            await logoutAction()
          }}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
