import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { Chakra_Petch } from 'next/font/google'
import { FiAlertTriangle } from 'react-icons/fi'
import { LogoutButton } from '@/components/LogoutButton'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

export default async function BannedPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/login')
  }

  // If they somehow get here but are not banned, redirect to app
  if (!session.user.isBanned) {
    redirect('/app')
  }

  const banningRecord = await prisma.bannings.findUnique({
    where: { userId: session.user.id }
  })

  const isIndefinite = !banningRecord?.duration

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-dark-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-light-black">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <FiAlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
        </div>

        <h1
          className={`${chakra.className} mb-2 text-2xl text-gray-900 dark:text-white`}
        >
          Cuenta Suspendida
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Tu cuenta ha sido restringida y no puedes acceder a la plataforma.
        </p>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left dark:bg-dark-black">
          <div className="mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Motivo:
            </span>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {banningRecord?.reason ||
                'Violación de las normas de la comunidad.'}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Duración:
            </span>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {isIndefinite
                ? 'Indefinida'
                : new Date(banningRecord.duration!).toLocaleDateString(
                    'es-MX',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-500">¿Crees que esto es un error?</p>
          <Button
            as={Link}
            href="https://forms.gle/u4jJ9DePghveBM4Z6"
            target="_blank"
            variant="flat"
            className="w-full font-medium"
          >
            Contactar a soporte
          </Button>
        </div>

        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
