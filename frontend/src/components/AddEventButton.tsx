'use client'

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { AddEventModal } from './AddEventModal'
import { DeleteEventModal } from './DeleteEventModal'

export function ModifyEventButton({
  events
}: {
  events: Array<{
    id: number
    title: string
    body: string
    startDate: Date
    endDate: Date
  }>
}) {
  const {
    isOpen: isAddEventOpen,
    onOpenChange: onAddEventOpenChange,
    onOpen: onAddEventOpen
  } = useDisclosure()

  const {
    isOpen: isDeleteEventOpen,
    onOpenChange: onDeleteEventOpenChange,
    onOpen: onDeleteEventOpen
  } = useDisclosure()

  return (
    <>
      <AddEventModal
        isOpen={isAddEventOpen}
        onOpenChange={onAddEventOpenChange}
      />
      <DeleteEventModal
        isOpen={isDeleteEventOpen}
        onOpenChange={onDeleteEventOpenChange}
        events={events}
      />
      <div className="flex gap-2">
        <Button className="bg-white dark:bg-black" onPress={onAddEventOpen}>
          Agregar evento
        </Button>
        <Button className="bg-white dark:bg-black" onPress={onDeleteEventOpen}>
          Eliminar evento
        </Button>
      </div>
    </>
  )
}
