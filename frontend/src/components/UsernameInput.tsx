'use client'
import { updateUsername } from '@/actions/updateUsername'
import { UpdateUsernameSchema } from '@/schemas/UpdateUsernameSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'
import { logoutAction } from '@/actions/logout'

type UpdateUsernameFormTypes = z.infer<typeof UpdateUsernameSchema>

export function UsernameInput({ username }: { username: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UpdateUsernameFormTypes>({
    resolver: zodResolver(UpdateUsernameSchema),
    mode: 'onBlur'
  })

  const onSubmit = handleSubmit(async (data) => {
    const response = await updateUsername(data)
    if (!response.success) {
      setMessage({
        show: true,
        message: response.error as string
      })
      return
    }
    setMessage({
      show: true,
      message:
        'Nombre de usuario actualizado correctamente. Vuelve a iniciar sesión para ver los cambios.'
    })
    reset()
    await logoutAction()
  })
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cambiar nombre de usuario
              </ModalHeader>
              <ModalBody>
                {message.show && (
                  <div className="flex items-center justify-between rounded bg-main-red p-2 text-white">
                    <p>{message.message}</p>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {
                        setMessage({
                          show: false,
                          message: ''
                        })
                      }}
                    >
                      <FiX />
                    </Button>
                  </div>
                )}
                <p className="text-gray-500">
                  Introduce tu nuevo nombre de usuario. Los nombres de usuario
                  que sean ofensivos serán sancionados. Al actualizar tu nombre
                  de usuario, deberás iniciar sesión nuevamente.
                </p>
                <Input
                  label="Nombre de usuario"
                  {...register('username')}
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => {
                    reset()
                    onClose()
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await onSubmit()
                  }}
                  isLoading={isSubmitting}
                >
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Input
        label="Username"
        className="max-w-xl"
        value={username}
        isDisabled
        classNames={{
          inputWrapper: 'dark:bg-dark-black bg-white'
        }}
      />
      <Button className="max-w-xl" variant="bordered" onPress={onOpen}>
        Cambiar nombre de usuario
      </Button>
    </>
  )
}
