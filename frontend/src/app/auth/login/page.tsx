import { LoginForm } from '@/components/sections/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicia sesión | Profedex'
}
export default function LoginPage() {
  return <LoginForm />
}
