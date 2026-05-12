'use client'

import { loginAction } from '@/actions/login'
import { LoginSchema } from '@/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { FiAlertTriangle } from 'react-icons/fi'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { motion } from 'framer-motion'
import { Chakra_Petch } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ResetPasswordModal } from '../ResetPasswordModal'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

type LoginFormTypes = z.infer<typeof LoginSchema>

export function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    handleSubmit
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur'
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isResetPasswordOpen,
    onOpen: onResetPasswordOpen,
    onOpenChange: onResetPasswordOpenChange
  } = useDisclosure()
  const [response, setResponse] = useState({
    title: '',
    message: ''
  })
  const [banDetails, setBanDetails] = useState<{
    reason: string
    duration: Date | null
  } | null>(null)
  const [visible, setVisible] = useState(false)

  const processForm = async (data: LoginFormTypes) => {
    const result = await loginAction(data)

    if (result?.error === 'banned') {
      setBanDetails({
        reason: result.banReason || 'Violación de las normas de la comunidad.',
        duration: result.banDuration ? new Date(result.banDuration) : null
      })
      onOpen()
      return
    }

    if (result?.error === 'Invalid credentials') {
      setResponse({
        title: 'Credenciales inválidas',
        message:
          'Por favor, verifica que tu correo electrónico y contraseña sean correctos.'
      })
      onOpen()
    }
    if (result?.error === 'An unexpected error has occurred') {
      setResponse({
        title: 'Error',
        message: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.'
      })
      onOpen()
    }
    if (result?.success) {
      reset()
    }
  }

  const login = async () => {
    const result = await trigger(['email', 'password'], { shouldFocus: true })
    if (!result) return
    await handleSubmit(async (data) => {
      await processForm(data)
    })()
  }

  return (
    <form className="flex min-h-screen w-screen flex-col justify-between bg-white px-8 py-5 shadow-[-20px_0_15px_0_rgba(0,0,0,0.3)] dark:bg-dark-black lg:w-2/3 lg:rounded-s-[50px] lg:pl-24 lg:pt-16">
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onOpenChange={onResetPasswordOpenChange}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) =>
            banDetails ? (
              <>
                <ModalBody className="flex flex-col items-center p-8 text-center">
                  <div className="mx-auto mb-4 mt-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <FiAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
                  </div>

                  <h1
                    className={`${chakra.className} mb-2 text-2xl text-gray-900 dark:text-white`}
                  >
                    Cuenta Suspendida
                  </h1>

                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Tu cuenta ha sido restringida y no puedes acceder a la
                    plataforma.
                  </p>

                  <div className="mb-6 w-full rounded-lg border border-gray-100 bg-gray-50 p-4 text-left dark:border-default-100 dark:bg-dark-black/50">
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        Motivo:
                      </span>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {banDetails.reason}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        Duración:
                      </span>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {!banDetails.duration
                          ? 'Indefinida'
                          : banDetails.duration.toLocaleDateString('es-MX', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 flex w-full flex-col items-center justify-center space-y-2">
                    <p className="text-sm text-gray-500">
                      ¿Crees que esto es un error?
                    </p>
                    <Button
                      as={Link}
                      href="https://forms.gle/u4jJ9DePghveBM4Z6"
                      target="_blank"
                      variant="flat"
                      className="w-full font-medium"
                    >
                      Contactar a soporte
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter className="flex w-full justify-center pb-6">
                  <Button
                    variant="light"
                    onPress={() => {
                      onClose()
                      setBanDetails(null)
                    }}
                  >
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {response.title}
                </ModalHeader>
                <ModalBody>
                  <p>{response.message}</p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
      <div>
        <h1
          className={`text-3xl font-bold text-main-black dark:text-white ${chakra.className} mb-2 mt-5`}
        >
          Inicia sesión
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="mb-10 text-sm">Bienvenido de nuevo!</p>
          <div className="flex flex-col gap-6">
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="ashketchum@email.com"
              variant="bordered"
              color="primary"
              classNames={{
                label: 'dark:text-main-red-100'
              }}
              {...register('email')}
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
            <Input
              type={visible ? 'text' : 'password'}
              label="Contraseña"
              placeholder="••••••••••••••"
              variant="bordered"
              color="primary"
              endContent={
                <button
                  onClick={() => {
                    setVisible(!visible)
                  }}
                  type="button"
                >
                  {visible ? (
                    <IoMdEyeOff className="text-2xl" />
                  ) : (
                    <IoMdEye className="text-2xl" />
                  )}
                </button>
              }
              classNames={{
                label: 'dark:text-main-red-100'
              }}
              {...register('password')}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          </div>
          <p className="my-2 text-right text-xs text-main-red-200">
            <u>
              <button type="button" onClick={onResetPasswordOpen}>
                ¿Olvidaste tu contraseña?
              </button>
            </u>
          </p>
        </motion.div>
      </div>
      <div className="my-10 flex flex-col gap-2">
        <Button
          className="bg-main-red-500 text-white"
          variant="solid"
          onPress={login}
          isLoading={isSubmitting}
        >
          Iniciar sesión
        </Button>
        <p className="text-xs">
          ¿No tienes una cuenta?{' '}
          <Link href="/auth/register" className="font-bold underline">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  )
}
