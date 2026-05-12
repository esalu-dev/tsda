'use client'
import { Chakra_Petch } from 'next/font/google'
import { motion } from 'framer-motion'
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { z } from 'zod'
import { ChangePasswordSchema } from '@/schemas/ChangePasswordSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from '@/actions/resetPassword'
import { ModalForm } from './ModalForm'
import { useState } from 'react'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

type ChangePasswordFormTypes = z.infer<typeof ChangePasswordSchema>

export function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setValue
  } = useForm<ChangePasswordFormTypes>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onBlur'
  })
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const [response, setResponse] = useState({
    title: '',
    message: '',
    success: false
  })

  const onSubmit = async () => {
    setValue('token', token)
    await handleSubmit(async (data) => {
      const response = await resetPassword(data)
      if (!response.success) {
        setResponse({
          success: false,
          message: response.error as string,
          title: 'Error en el cambio de contraseña'
        })
        onOpen()
        return
      }
      setResponse({
        success: true,
        message:
          'Contraseña actualizada exitosamente. Inicia sesión nuevamente',
        title: 'Éxito'
      })
      onOpen()
      reset()
    })()
  }

  return (
    <form className="flex min-h-screen w-screen flex-col justify-between bg-white px-8 py-5 shadow-[-20px_0_15px_0_rgba(0,0,0,0.3)] dark:bg-main-black lg:w-2/3 lg:rounded-s-[50px] lg:pl-24 lg:pt-16">
      <ModalForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        response={response}
        url="/auth/login"
      />
      <div>
        <h1
          className={`text-3xl font-bold text-main-black dark:text-white ${chakra.className} mb-2 mt-5`}
        >
          Restablece tu contraseña
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="mb-10 text-sm">Ingresa tu nueva contraseña</p>
          <div className="flex flex-col gap-6">
            <Input
              type="password"
              label="Nueva contraseña"
              placeholder="••••••••••••••"
              classNames={{
                label: 'dark:text-main-red-100'
              }}
              variant="bordered"
              color="primary"
              {...register('password')}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
            <Input
              type="password"
              label="Repetir contraseña"
              placeholder="••••••••••••••"
              classNames={{
                label: 'dark:text-main-red-100'
              }}
              variant="bordered"
              color="primary"
              {...register('confirmPassword')}
              isInvalid={errors.confirmPassword !== undefined}
              errorMessage={errors.confirmPassword?.message}
            />
          </div>
          <div className="my-10 flex flex-col gap-2">
            <Button
              className="bg-main-red-500 text-white"
              variant="solid"
              onPress={onSubmit}
              type="button"
            >
              Actualizar contraseña
            </Button>
          </div>
        </motion.div>
      </div>
    </form>
  )
}
