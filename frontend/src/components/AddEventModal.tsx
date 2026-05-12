import { addEvent } from '@/actions/addEvent'
import { convertDateFormat } from '@/lib/convertDateFormat'
import { AddEventSchema } from '@/schemas/AddEventSchema'
import { parse } from '@formkit/tempo'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/button'
import { DatePicker } from '@heroui/date-picker'
import { Input } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@heroui/modal'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type AddEventFormTypes = z.infer<typeof AddEventSchema>

export function AddEventModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<AddEventFormTypes>({
    resolver: zodResolver(AddEventSchema),
    mode: 'onBlur'
  })

  const startDateRef = useRef<HTMLParagraphElement | null>(null)
  const endDateRef = useRef<HTMLParagraphElement | null>(null)
  const onSubmit = async () => {
    setValue(
      'startDate',
      parse(convertDateFormat(startDateRef.current?.textContent as string))
    )
    if (endDateRef.current?.textContent !== 'mm/dd/yyyy') {
      setValue(
        'endDate',
        parse(convertDateFormat(endDateRef.current?.textContent as string))
      )
    }

    await handleSubmit(async (data) => {
      const newEvent = await addEvent(data)
      if (!newEvent.success) {
        setMessage({
          show: true,
          message: newEvent.error as string
        })
        return
      }
      setMessage({
        show: true,
        message: 'Evento agregado correctamente'
      })
      reset()
    })()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Agregar evento</ModalHeader>
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
              <Input
                label="Título del evento"
                {...register('title')}
                isInvalid={errors.title !== undefined}
                errorMessage={errors.title?.message}
                isRequired
              />
              <Input
                label="Descripción del evento"
                {...register('body')}
                isInvalid={errors.body !== undefined}
                errorMessage={errors.body?.message}
                isRequired
              />
              <DatePicker
                label="Fecha de inicio"
                isRequired
                isInvalid={errors.startDate !== undefined}
                errorMessage={errors.startDate?.message}
                ref={startDateRef}
              />
              <DatePicker
                label="Fecha de finalización"
                description="No es necesario agregar una fecha de finalización si el evento dura solo un día!"
                isInvalid={errors.endDate !== undefined}
                errorMessage={errors.endDate?.message}
                ref={endDateRef}
              />
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
                Agregar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
