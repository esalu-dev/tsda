import { sendResetToken } from '@/actions/resetPassword'
import { ResetPasswordSchema } from '@/schemas/ResetPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type ResetPasswordTypes = z.infer<typeof ResetPasswordSchema>

export function ResetPasswordModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ResetPasswordTypes>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur'
  })
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const onSubmit = handleSubmit(async (data) => {
    const response = await sendResetToken(data)
    if (!response.success) {
      setMessage({
        show: true,
        message: response.error as string
      })
      return
    }
    setMessage({
      show: true,
      message: 'Correo electrónico enviado'
    })
  })
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>¿Olvidaste tu contraseña?</ModalHeader>
              <ModalBody>
                {message.show && (
                  <div className="flex items-center justify-between rounded-lg bg-main-red p-2 text-white">
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
                <p className="text-sm text-gray-500">
                  No te preocupes, te enviaremos un correo electrónico con
                  instrucciones para restablecer tu contraseña.
                </p>

                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  variant="bordered"
                  {...register('email')}
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cerrar</Button>
                <Button type="submit" color="primary">
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}
