import { EditProfileSection } from '@/components/sections/EditProfileSection'
import { ProfileSectionSkeleton } from '@/components/sections/ProfileSectionSkeleton'
import { Suspense } from 'react'

export const metadata = {
  title: 'Editar perfil | Profedex',
  description: 'Página para editar tu perfil en Profedex'
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSectionSkeleton />}>
      <EditProfileSection />
    </Suspense>
  )
}
