'use client'
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { AddTeacherModal } from './AddTeacherModal'
import { EditTeacherModal } from './EditTeacherModal'

export function ModifyTeacherButton() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    isOpen: isOpen2,
    onOpenChange: onOpenChange2,
    onOpen: onOpen2
  } = useDisclosure()
  return (
    <>
      <AddTeacherModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <EditTeacherModal isOpen={isOpen2} onOpenChange={onOpenChange2} />
      <div className="flex gap-2">
        <Button className="bg-white dark:bg-black" onPress={onOpen}>
          Agregar profesor
        </Button>
        <Button className="bg-white dark:bg-black" onPress={onOpen2}>
          Modificar profesor
        </Button>
      </div>
    </>
  )
}
