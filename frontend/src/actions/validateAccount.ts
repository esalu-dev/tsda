'use server'

import { RegisterFormSchema } from '@/schemas/RegisterSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export async function validateAccount(data: RegisterFormData) {
  const result = RegisterFormSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const requestData = {
    email: data.email,
    username: data.username
  }
  const res = await fetch(
    'http://localhost:3001/api/auth/check-existing-user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }
  )
  if (!res.ok) {
    const data = await res.json()
    if (data.message === 'Email en uso') {
      return {
        success: false,
        error: 'El email ya está registrado',
        field: 'email'
      }
    }
    if (data.message === 'Username en uso') {
      return {
        success: false,
        error: 'El nombre de usuario ya está registrado',
        field: 'username'
      }
    }
  }
  return { success: true }
}
