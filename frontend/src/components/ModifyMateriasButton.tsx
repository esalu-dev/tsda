'use client'
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { AddMateriaModal } from './AddMateriaModal'
import { DeleteMateriaModal } from './DeleteMateriaModal'

export function ModifyMateriasButton() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    isOpen: isOpen2,
    onOpenChange: onOpenChange2,
    onOpen: onOpen2
  } = useDisclosure()
  return (
    <>
      <AddMateriaModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <DeleteMateriaModal isOpen={isOpen2} onOpenChange={onOpenChange2} />
      <div className="flex gap-2">
        <Button className="bg-white dark:bg-black" onPress={onOpen}>
          Agregar materia
        </Button>
        <Button className="bg-white dark:bg-black" onPress={onOpen2}>
          Eliminar materia
        </Button>
      </div>
    </>
  )
}
