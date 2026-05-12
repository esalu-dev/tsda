import { deleteEvent } from '@/actions/deleteEvent'
import { DeleteEventSchema } from '@/schemas/DeleteEventSchema'
import { format } from '@formkit/tempo'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import type { Selection } from '@heroui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type DeleteEventFormTypes = z.infer<typeof DeleteEventSchema>

export function DeleteEventModal({
  isOpen,
  onOpenChange,
  events
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  events: Array<{
    id: number
    title: string
    body: string
    startDate: Date
    endDate: Date
  }>
}) {
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue
  } = useForm<DeleteEventFormTypes>({
    resolver: zodResolver(DeleteEventSchema),
    mode: 'onBlur'
  })
  const [selectedEvent, setSelectedEvent] = useState<Selection>(new Set([]))

  const onSubmit = async () => {
    setValue('id', Number(Array.from(selectedEvent)[0]))
    await handleSubmit(async (data) => {
      const event = await deleteEvent(data.id)
      if (!event.success) {
        setMessage({
          show: true,
          message: event.error as string
        })
        return
      }
      setMessage({
        show: true,
        message: 'Evento eliminado correctamente'
      })
      reset()
    })()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Eiminar evento</ModalHeader>
            <ModalBody>
              {message.show && (
                <div className="flex items-center justify-between rounded bg-main-red p-2 text-white">
                  <p>{message.message}</p>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      setMessage({ show: false, message: '' })
                    }}
                  >
                    <FiX />
                  </Button>
                </div>
              )}
              <Select
                items={events}
                label="Seleccione el evento a eliminar"
                selectedKeys={selectedEvent}
                onSelectionChange={setSelectedEvent}
                errorMessage={errors.id?.message}
                isInvalid={errors.id !== undefined}
              >
                {(event) => (
                  <SelectItem key={event.id} textValue={event.title}>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-small">
                          {event.title}
                        </span>
                        <span className="text-tiny">{event.body}</span>
                        {event.endDate !== null ? (
                          <span className="text-gray-500 text-tiny">
                            {format(event.startDate, 'medium', 'es')} -{' '}
                            {format(event.endDate, 'medium', 'es')}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-tiny">
                            {format(event.startDate, 'medium', 'es')}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={onSubmit}
                isLoading={isSubmitting}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
