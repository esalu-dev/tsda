import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { Chakra_Petch } from 'next/font/google'
import { ColabModal } from '../ColabModal'
import { CreditsCard } from '../CreditsCard'
import { DarkModeSwitch } from '../DarkModeSwitch'
import { ModifyMateriasButton } from '../ModifyMateriasButton'
import { ModifyTeacherButton } from '../ModifyTeacherButton'
import { SiitSyncButton } from '../SiitSyncButton'
import { ModifyEventButton } from '../AddEventButton'
import { BanUserButton } from '../admin/BanUserButton'
import { fetchEvents } from '@/lib/fetchEvents'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})
const CREDITS = [
  {
    name: 'Emilio Salas Luján',
    occupation: 'Estudiante de ingeniería en sistemas computacionales',
    description: 'Creador y desarrollador de la plataforma',
    img: '/66653779.webp',
    githubLink: 'https://github.com/esalu-dev',
    instagramLink: 'https://www.instagram.com/esalu._/',
    websiteLink: 'https://esalu.site'
  },
  {
    name: 'Victoria Bueno Mijares',
    occupation: 'Estudiante de ingeniería en sistemas computacionales',
    description: 'Creadora y desarrolladora de la landing page',
    img: '/817424.webp',
    instagramLink: 'https://www.instagram.com/victoria_buenx/'
  },
  {
    name: 'Marco Antonio Mauricio Martínez',
    occupation: 'Estudiante de ingeniería en sistemas computacionales',
    description: 'Colaborador y tester de la plataforma',
    img: '/76983239.webp',
    githubLink: 'https://github.com/Natural-H'
  },
  {
    name: 'Héctor Hugo González Hernández',
    occupation: 'Estudiante de ingeniería en sistemas computacionales',
    description: 'Colaborador de la plataforma',
    img: '/96206882.webp',
    githubLink: 'https://github.com/HugoGH1',
    instagramLink: 'https://www.instagram.com/hugoglez.10/'
  }
]

export async function SettingsSection() {
  const session = await auth()
  const events = await fetchEvents()

  let adminProfile = null
  if (session?.user?.id) {
    adminProfile = await prisma.administrator.findUnique({
      where: { userId: session.user.id }
    })
  }
  return (
    <div className="h-full p-4 sm:p-12">
      <h1 className={`${chakra.className} text-3xl font-bold`}>
        Configuración
      </h1>
      <article className="my-4">
        <h2 className={`my-1 text-xl ${chakra.className}`}>Tema</h2>
        <DarkModeSwitch />
      </article>
      <article className="my-4">
        <h2 className={`my-1 text-xl ${chakra.className}`}>
          Reportar un problema
        </h2>
        <Button
          as={Link}
          href="https://forms.gle/u4jJ9DePghveBM4Z6"
          target="_BLANK"
          rel="noopener noreferrer"
          className="bg-white dark:bg-dark-black"
        >
          Reportar
        </Button>
      </article>
      <article className="my-4">
        <h2 className={`my-1 text-xl ${chakra.className}`}>
          Representantes Profedex
        </h2>
        <ColabModal />
      </article>
      {session?.user.role === 'ADMIN' && (
        <article>
          <h2 className={`my-1 text-xl ${chakra.className}`}>Administrador</h2>
          <p className="mt-2 text-sm text-gray-500">Usuarios</p>
          <BanUserButton />
          {adminProfile?.nivelAdmin === 2 && <></>}
          <p className="mt-2 text-sm text-gray-500">Profesores</p>
          <ModifyTeacherButton />
          <SiitSyncButton />
          <p className="text-xm mt-2 text-gray-500">Materias</p>
          <ModifyMateriasButton />
          <p className="text-xm text-gray-500">Eventos</p>
          <ModifyEventButton
            events={
              events.data as Array<{
                id: number
                title: string
                body: string
                startDate: Date
                endDate: Date
              }>
            }
          />
        </article>
      )}
      <footer className="my-4">
        <h2 className={`my-1 text-xl ${chakra.className}`}>Créditos</h2>
        <p className="text-sm text-gray-500">Hecho con ❤️ por:</p>
        <div className="flex max-w-4xl flex-wrap gap-4">
          {CREDITS.map((credit, index) => (
            <CreditsCard key={index} {...credit} />
          ))}
        </div>
        <span className="text-sm text-gray-500">Versión: 2.0.0</span>
      </footer>
    </div>
  )
}
