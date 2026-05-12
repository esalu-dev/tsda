import { registerAction } from '@/actions/register'
import { validateWithSiit } from '@/actions/validateWithSiit'
import { RegisterFormSchema, RegisterSchema } from '@/schemas/RegisterSchema'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useRef, useState } from 'react'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormSchema>
type RegisterData = z.infer<typeof RegisterSchema>

export function ModalSIIT({
  isOpen2,
  onOpenChange2,
  data,
  setResponse,
  onOpen,
  reset
}: {
  isOpen2: boolean
  onOpenChange2: () => void
  data: RegisterFormData
  setResponse: (response: {
    success: boolean
    title: string
    message: string
  }) => void
  onOpen: () => void
  reset: () => void
}) {
  const [error, setError] = useState({
    show: false,
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const numControlInput = useRef<HTMLInputElement>(null)
  const pinInput = useRef<HTMLInputElement>(null)

  const validateSIIT = async () => {
    const numControl = numControlInput.current?.value
    const pin = pinInput.current?.value
    if (!numControl || !pin) return
    setLoading(true)
    const res = await validateWithSiit(numControl, pin)
    if (!res.success) {
      setError({
        show: true,
        message: res.error as string
      })
      setLoading(false)
      return
    }
    const user: RegisterData = {
      ...data,
      carrera: res.career as string,
      numControl
    }
    const response = await registerAction(user)
    if (!response.success) {
      setResponse({
        success: false,
        title: 'Error',
        message: response.error as string
      })
      onOpenChange2()
      onOpen()
      setLoading(false)
      return
    }
    setResponse({
      success: true,
      title: 'Usuario registrado con éxito!',
      message: 'Por favor, iniciar sesión para continuar'
    })
    onOpenChange2()
    onOpen()
    setLoading(false)
    reset()
  }
  return (
    <Modal isOpen={isOpen2} onOpenChange={onOpenChange2} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Valida tu cuenta con SIIT
            </ModalHeader>
            <ModalBody>
              <div
                className={`rounded-lg bg-main-red p-2 ${
                  error.show ? '' : 'hidden'
                }`}
              >
                <p className="text-sm font-bold">Error</p>
                <p className="text-sm">{error.message}</p>
              </div>
              <Input label="Núm. de control" ref={numControlInput} />
              <Input label="PIN" type="password" ref={pinInput} />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={validateSIIT}
                isLoading={loading}
              >
                Validar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
