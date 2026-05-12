import { ResetPasswordForm } from '@/components/ResetPasswordForm'
import { validateResetPasswordToken } from '@/lib/validateResetPasswordToken'
import { notFound } from 'next/navigation'

export default async function ResetPasswordPage(
  props: {
    searchParams: Promise<{ token: string }>
  }
) {
  const searchParams = await props.searchParams;
  const validateToken = await validateResetPasswordToken(searchParams.token)
  if (!validateToken) return notFound()
  return <ResetPasswordForm token={searchParams.token} />
}
