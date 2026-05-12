import { SettingsSection } from '@/components/sections/SettingsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración | Profedex',
  description: 'Página de configuración de la aplicación'
}

export default function SettingsPage() {
  return <SettingsSection />
}
