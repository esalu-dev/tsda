import { ResetPasswordEmail } from '@/components/emails/ResetPasswordEmail'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  username: string
) => {
  const resetLink = `https://www.profedex.top/auth/reset-password?token=${token}`

  await resend.emails.send({
    from: 'no-reply@profedex.top',
    to: email,
    subject: 'Restablece tu contraseña',
    react: await ResetPasswordEmail({ username, href: resetLink }),
    text: `Click ${resetLink} to reset your password.`
  })
}
