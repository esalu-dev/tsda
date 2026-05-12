import { prisma } from './prisma'

export async function validateResetPasswordToken(token: string) {
  const currentDate = new Date()
  const validateToken = await prisma.passwordResetToken.findUnique({
    where: {
      token
    }
  })
  if (!validateToken) return false

  return currentDate <= validateToken.expires
}
