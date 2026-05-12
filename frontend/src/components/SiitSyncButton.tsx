'use client'

import { Button } from '@heroui/button'
import { useDisclosure } from '@heroui/modal'
import { SiitSyncModal } from './SiitSyncModal'

export function SiitSyncButton() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  return (
    <>
      <SiitSyncModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Button className="mt-2" onPress={onOpen} color="primary">
        Sincronizar profesores con SIIT
      </Button>
    </>
  )
}
