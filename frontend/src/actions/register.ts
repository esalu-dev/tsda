'use server'

import { RegisterSchema } from '@/schemas/RegisterSchema'
import { z } from 'zod'

type RegisterFormData = z.infer<typeof RegisterSchema>

export async function registerAction(formData: RegisterFormData): Promise<{
  success: boolean
  error?: string
}> {
  const result = RegisterSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error.message }
  }
  const dataRequest = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    numControl: formData.numControl,
    carrera: formData.carrera
  }
  // await new Promise(resolve => setTimeout(resolve, 3000))
  const res = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataRequest)
  })
  if (!res.ok) {
    const data = await res.json()
    return { success: false, error: data.message }
  }
  return { success: true }
}
