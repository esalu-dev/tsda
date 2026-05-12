import { addTeacher } from '@/actions/addTeacher'
import { AddTeacherSchema } from '@/schemas/AddTeacherSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type AddTeacherFormTypes = z.infer<typeof AddTeacherSchema>

export function AddTeacherModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [active, setActive] = useState(true)
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset
  } = useForm<AddTeacherFormTypes>({
    resolver: zodResolver(AddTeacherSchema),
    mode: 'onBlur'
  })
  const onSubmit = async () => {
    setValue('isActive', active)

    await handleSubmit(async (data) => {
      const newTeacher = await addTeacher(data)
      if (newTeacher.success) {
        setMessage({
          show: true,
          message: 'Profesor agregado correctamente'
        })
        reset()
        return
      }
      setMessage({
        show: true,
        message: newTeacher.error as string
      })
    })()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <form>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Agregar profesor</ModalHeader>
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
                  label="Nombre(s)"
                  {...register('name')}
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                />
                <Input
                  label="Apellido paterno"
                  {...register('paterno')}
                  isInvalid={errors.paterno !== undefined}
                  errorMessage={errors.paterno?.message}
                />
                <Input
                  label="Apellido materno"
                  {...register('materno')}
                  isInvalid={errors.materno !== undefined}
                  errorMessage={errors.materno?.message}
                />
                <Input
                  label="Shortname"
                  {...register('shortname')}
                  isInvalid={errors.shortname !== undefined}
                  errorMessage={errors.shortname?.message}
                />
                <Checkbox
                  isSelected={active}
                  onValueChange={(isSelected) => {
                    setActive(isSelected)
                  }}
                >
                  ¿Está activo?
                </Checkbox>
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
      </form>
    </Modal>
  )
}
