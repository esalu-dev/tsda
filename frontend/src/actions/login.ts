'use server'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas/LoginSchema'
import { AuthError } from 'next-auth'
import { z } from 'zod'

const redirectTo = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.profedex.top/app'
  } else return 'http://localhost:3000/app'
}

type LoginFormTypes = z.infer<typeof LoginSchema>

export async function loginAction(formData: LoginFormTypes) {
  const result = LoginSchema.safeParse(formData)

  if (!result.success) {
    return { success: false, error: result.error }
  }

  try {
    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirectTo: redirectTo()
    })
  } catch (error) {
    if (error instanceof AuthError) {
      // El mensaje de ban viene como JSON dentro de error.cause.err.message
      const message = error.cause?.err?.message || ''

      if (message.includes('banned')) {
        try {
          const banData = JSON.parse(message)
          return {
            error: 'banned',
            banReason: banData.banReason,
            banDuration: banData.banDuration
          }
        } catch {
          return { error: 'banned' }
        }
      }

      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials' }
        }
        default: {
          return { error: 'An unexpected error has occurred' }
        }
      }
    }
    throw error
  }
}
