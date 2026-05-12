'use server'

import { generatePasswordResetToken } from '@/lib/generatePasswordResetToken'
import { sendPasswordResetEmail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { ChangePasswordSchema } from '@/schemas/ChangePasswordSchema'
import { ResetPasswordSchema } from '@/schemas/ResetPasswordSchema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

type ResetPasswordFormTypes = z.infer<typeof ResetPasswordSchema>
type ChangePasswordFormTypes = z.infer<typeof ChangePasswordSchema>

export async function sendResetToken(formData: ResetPasswordFormTypes) {
  const result = ResetPasswordSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const existingEmail = await prisma.user.findFirst({
    where: {
      email: formData.email
    }
  })
  if (!existingEmail) {
    return { success: false, error: 'Email not found' }
  }

  const passwordResetToken = await generatePasswordResetToken(formData.email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
    existingEmail.username
  )

  return { success: true }
}

export async function resetPassword(formData: ChangePasswordFormTypes) {
  const result = ChangePasswordSchema.safeParse(formData)
  if (!result.success) {
    return { success: false, error: result.error }
  }
  const existingToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: formData.token
    }
  })
  if (!existingToken) {
    return { success: false, error: 'Token expired or not found' }
  }
  if (existingToken.expires < new Date()) {
    return { success: false, error: 'Token expired or not found' }
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: existingToken.email
    }
  })
  if (!userExists) {
    return { success: false, error: 'User not found' }
  }
  const hashedPassword = await bcrypt.hash(formData.password, 10)

  try {
    await prisma.user.update({
      where: {
        email: existingToken.email
      },
      data: {
        password: hashedPassword
      }
    })
    await prisma.passwordResetToken.delete({
      where: {
        token: formData.token
      }
    })
    return { success: true }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}
