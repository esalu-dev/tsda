import { auth } from '@/auth'
import { Chakra_Petch } from 'next/font/google'
import styles from './grid.module.css'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { Divider } from '@heroui/divider'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { Metadata } from 'next'
import { StatsCardHome } from '@/components/StatsCardHome'
import { Suspense } from 'react'
import { StatsCardHomeSkeleton } from '@/components/StatsCardHomeSkeleton'
import { EventCard } from '@/components/EventCard'
import { NoEventsCard } from '@/components/NoEventsCard'
import { fetchEvents } from '@/lib/fetchEvents'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

function diasHastaFecha() {
  const objetivo = new Date('2024-12-13')

  const hoy = new Date()

  const diferencia = objetivo.getTime() - hoy.getTime()

  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}

export const metadata: Metadata = {
  title: 'Inicio | Profedex',
  description: 'Página de inicio de Profedex'
}

export default async function Page() {
  const session = await auth()
  const daysUntil = diasHastaFecha()
  const events = await fetchEvents()
  return (
    <div className="flex h-full flex-col p-4 sm:p-12">
      <h1 className={`${chakra.className} mb-2 text-3xl font-bold`}>
        Bienvenido, {session?.user.username}
      </h1>
      <div className={`${styles.inicio} flex-1`}>
        <article className="flex flex-col [grid-area:stats]">
          <p className="my-3 text-lg font-bold text-gray-500">Estadísticas:</p>
          <Suspense fallback={<StatsCardHomeSkeleton />}>
            <StatsCardHome />
          </Suspense>
        </article>
        <article className="flex flex-col [grid-area:days]">
          <p className="my-3 text-lg font-bold text-gray-500">
            Días restantes:
          </p>
          <Card className="w-full flex-1 bg-main-red" shadow="sm">
            <CardHeader>
              <p className="font-bold uppercase text-white text-tiny">
                {daysUntil > 60
                  ? '¡Mucha suerte en tu semestre!'
                  : daysUntil > 30
                    ? '¡Sigue adelante!'
                    : daysUntil > 0
                      ? '¡Ya casi!'
                      : '¡Ya terminó el semestre!'}
              </p>
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center gap-10">
              <p
                className={`text-8xl font-bold text-white ${chakra.className}`}
              >
                {daysUntil < 0 ? 0 : daysUntil}
              </p>
              <p className="text-center text-sm text-white">
                Días hasta que termine el semestre
              </p>
            </CardBody>
          </Card>
        </article>
        <article className="flex flex-col [grid-area:calendar]">
          <p className="my-3 text-lg font-bold text-gray-500">Eventos:</p>
          <section className="flex h-3 flex-1 flex-col rounded-xl bg-white p-4 text-white dark:bg-dark-black">
            {events.data && events.data.length > 0 ? (
              <ScrollShadow className="h-full snap-y snap-mandatory" size={10}>
                {events.data.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </ScrollShadow>
            ) : (
              <NoEventsCard />
            )}
          </section>
        </article>
        <article className="flex flex-col [grid-area:update]">
          <p className="my-3 text-lg font-bold text-gray-500">
            Notificaciones:
          </p>
          <section className="flex h-3 flex-1 flex-col rounded-xl bg-white p-4 dark:bg-dark-black">
            <ScrollShadow className="h-full">
              <Card className="w-full dark:bg-dark-black" shadow="none">
                <CardHeader className="flex justify-between">
                  <h4 className="font-bold uppercase">Versión 2.0.0:</h4>
                  <Chip color="primary">25 de noviembre de 2024</Chip>
                </CardHeader>
                <CardBody className="flex flex-col gap-3">
                  <span className="font-bold">Novedades:</span>
                  <ul>
                    <li>
                      🧑‍🎓 ¡Ingeniería Bioquímica e Ingeniería Mecánica se unen a
                      Profedex!
                    </li>
                    <li>
                      👓 Descubre y consulta los perfiles públicos de otros
                      usuarios, donde puedes ver su nombre de usuario, carrera,
                      y su historial de comentarios.
                    </li>
                    <li>
                      🎓 ¡Ahora puedes filtrar los comentarios por carrera!
                    </li>
                    <li>🐛 ¡Corrección de muchos errores!</li>
                  </ul>
                </CardBody>
              </Card>
              <Divider />
              <Card className="w-full dark:bg-dark-black" shadow="none">
                <CardHeader className="flex justify-between">
                  <h4 className="font-bold uppercase">Versión 1.1.1:</h4>
                  <Chip color="primary">3 de septiembre de 2024</Chip>
                </CardHeader>
                <CardBody className="flex flex-col gap-3">
                  <span className="font-bold">Novedades:</span>
                  <ul>
                    <li>
                      🐛 Se corrigió un error que impedía que ciertos alumnos se
                      registraran en la plataforma!
                    </li>
                  </ul>
                </CardBody>
              </Card>
              <Divider />
              <Card className="w-full dark:bg-dark-black" shadow="none">
                <CardHeader className="flex justify-between">
                  <h4 className="font-bold uppercase">Versión 1.1.0:</h4>
                  <Chip color="primary">30 de julio de 2024</Chip>
                </CardHeader>
                <CardBody className="flex flex-col gap-3">
                  <span className="font-bold">Novedades:</span>
                  <ul>
                    <li>🐛 Corrección de errores menores</li>
                    <li>⚡ Mejora en la velocidad de carga</li>
                    <li>🎨 Mejora en la interfaz de usuario</li>
                  </ul>
                </CardBody>
              </Card>
              <Divider />
              <Card className="w-full dark:bg-dark-black" shadow="none">
                <CardHeader className="flex justify-between">
                  <h4 className="font-bold uppercase">
                    ¡Profedex 1.0.0 está aquí!
                  </h4>
                  <Chip color="primary">20 de mayo de 2024</Chip>
                </CardHeader>
                <CardBody className="flex flex-col gap-3">
                  <p>
                    ¡Estamos emocionados de anunciar que la versión 1.0.0 de
                    Profedex ya está aquí! Únete a nosotros en este emocionante
                    viaje donde los estudiantes pueden evaluar a sus profesores
                    y compartir sus experiencias académicas. ¡Comienza a
                    calificar y aportar tu opinión para mejorar juntos la
                    educación!
                  </p>
                </CardBody>
              </Card>
            </ScrollShadow>
          </section>
        </article>
      </div>
    </div>
  )
}
