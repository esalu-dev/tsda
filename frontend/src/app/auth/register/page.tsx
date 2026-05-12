import { RegisterForm } from '@/components/sections/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crea tu cuenta | Profedex'
}

export default function RegisterPage() {
  return <RegisterForm />
}
