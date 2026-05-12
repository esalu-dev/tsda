import { addMateria } from '@/actions/addMateria'
import { MateriaSchema } from '@/schemas/MateriaSchema'
import { careers } from '@/schemas/careers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type AddMateriaFormTypes = z.infer<typeof MateriaSchema>

export function AddMateriaModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddMateriaFormTypes>({
    resolver: zodResolver(MateriaSchema),
    mode: 'onBlur'
  })
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })

  const onSubmit = handleSubmit(async (data) => {
    const response = await addMateria(data)
    if (!response.success) {
      setMessage({
        show: true,
        message: response.error as string
      })
      return
    }
    setMessage({
      show: true,
      message: 'Materia agregada correctamente'
    })
    reset()
  })
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <form onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Agregar materia</ModalHeader>
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
                  label="Nombre de la materia"
                  {...register('nombre')}
                  isInvalid={errors.nombre !== undefined}
                  errorMessage={errors.nombre?.message as string}
                />
                <Select
                  label="Selecciona la carrera a la cual pertenece"
                  {...register('carrera')}
                  isInvalid={errors.carrera !== undefined}
                  errorMessage={errors.carrera?.message}
                >
                  {careers.map((career) => (
                    <SelectItem key={career.value} textValue={career.name}>
                      {career.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="ghost">
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
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
