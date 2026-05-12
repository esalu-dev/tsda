'use client'
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { Chakra_Petch } from 'next/font/google'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { RegisterFormSchema as RegisterSchema } from '@/schemas/RegisterSchema'
import Link from 'next/link'
import { ModalForm } from '@/components/ModalForm'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { ModalSIIT } from '../ModalSIIT'
import { validateAccount } from '@/actions/validateAccount'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

type RegisterFormTypes = z.infer<typeof RegisterSchema>

export function RegisterForm() {
  const [response, setResponse] = useState({
    success: true,
    title: 'Usuario registrado con éxito!',
    message: 'Por favor, iniciar sesión para continuar'
  })
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2
  } = useDisclosure()

  const {
    register,
    trigger,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setError,
    getValues
  } = useForm<RegisterFormTypes>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur'
  })

  const processForm = async (data: RegisterFormTypes) => {
    const result = await validateAccount(data)
    if (!result.success) {
      setError(result.field as keyof RegisterFormTypes, {
        type: 'manual',
        message: result.error as string
      })
      return
    }
    onOpen2()
  }

  const next = async () => {
    const output = await trigger()
    if (!output) return

    await handleSubmit(async (data) => {
      await processForm(data)
    })()
    // reset()
  }

  return (
    <form className="flex min-h-dvh w-screen flex-col justify-between bg-white px-8 py-5 shadow-[-20px_0_15px_0_rgba(0,0,0,0.3)] dark:bg-dark-black lg:w-2/3 lg:rounded-s-[50px] lg:pl-24 lg:pt-16">
      <div>
        <ModalSIIT
          isOpen2={isOpen2}
          onOpenChange2={onOpenChange2}
          data={getValues()}
          onOpen={onOpen}
          setResponse={setResponse}
          reset={reset}
        />
        <ModalForm
          isOpen={isOpen}
          response={response}
          onOpenChange={onOpenChange}
          url="/auth/login"
        />
        <h1
          className={`text-3xl font-bold text-main-black dark:text-white ${chakra.className} my-5`}
        >
          Crea tu cuenta
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="mb-4 text-sm">Datos de la cuenta</p>
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              label="Nombre de usuario"
              placeholder="ash_ketchum"
              variant="bordered"
              color="primary"
              classNames={{
                label: 'text-main-red-100'
              }}
              {...register('username')}
              isInvalid={errors.username !== undefined}
              errorMessage={errors.username?.message}
            />
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="ashketchum@email.com"
              variant="bordered"
              color="primary"
              classNames={{
                label: 'text-main-red-100',
                inputWrapper: 'active:outline-main-red-500'
              }}
              {...register('email')}
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
            <Input
              type={visible.password ? 'text' : 'password'}
              label="Contraseña"
              placeholder="••••••••••••••"
              variant="bordered"
              color="primary"
              classNames={{
                label: 'text-main-red-100'
              }}
              {...register('password')}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  onClick={() => {
                    setVisible({ ...visible, password: !visible.password })
                  }}
                  type="button"
                >
                  {visible.password ? (
                    <IoMdEyeOff className="text-2xl" />
                  ) : (
                    <IoMdEye className="text-2xl" />
                  )}
                </button>
              }
            />
            <Input
              type={visible.confirmPassword ? 'text' : 'password'}
              label="Confirmar contraseña"
              placeholder="••••••••••••••"
              variant="bordered"
              color="primary"
              classNames={{
                label: 'text-main-red-100'
              }}
              isInvalid={errors.confirmPassword !== undefined}
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              endContent={
                <button
                  onClick={() => {
                    setVisible({
                      ...visible,
                      confirmPassword: !visible.confirmPassword
                    })
                  }}
                  type="button"
                >
                  {visible.confirmPassword ? (
                    <IoMdEyeOff className="text-2xl" />
                  ) : (
                    <IoMdEye className="text-2xl" />
                  )}
                </button>
              }
            />
          </div>
        </motion.div>
      </div>
      <div className="my-10 flex flex-col gap-2">
        <Button
          className="bg-main-red-500 text-white"
          variant="solid"
          onPress={next}
          isLoading={isSubmitting}
        >
          Registrarme
        </Button>
        <p className="text-xs">
          o, si ya tienes una cuenta,{' '}
          <Link href="/auth/login" className="font-bold underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  )
}
