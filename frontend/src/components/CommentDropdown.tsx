import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Session } from 'next-auth'
import { FiSend, FiTrash2 } from 'react-icons/fi'
import { SlOptionsVertical } from 'react-icons/sl'

export function CommentDropwdown({
  username,
  session,
  onOpen,
  published,
  setModal
}: {
  username: string
  session: Session
  onOpen: () => void
  published: boolean
  setModal: (modal: { body: string; buttonContent: string }) => void
}) {
  const canDelete =
    session.user?.name === username || session.user?.role === 'ADMIN'
  const disabledKeys = canDelete ? [] : ['delete']
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" radius="full" variant="light">
          <SlOptionsVertical className="text-gray-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={disabledKeys}>
        {published ? (
          <DropdownItem
            startContent={<FiTrash2 />}
            key="delete"
            className="text-main-red"
            onPress={() => {
              setModal({
                body: '¿Estás seguro que deseas eliminar este comentario?',
                buttonContent: 'Eliminar'
              })
              onOpen()
            }}
          >
            Eliminar
          </DropdownItem>
        ) : (
          <DropdownItem
            startContent={<FiSend />}
            key="delete"
            className="text-green-600"
            onPress={() => {
              setModal({
                body: '¿Estás seguro que deseas republicar este comentario?',
                buttonContent: 'Republicar'
              })
              onOpen()
            }}
          >
            Republicar
          </DropdownItem>
        )}

        {/* <DropdownItem startContent={<FiAlertTriangle />}>Reportar</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  )
}
