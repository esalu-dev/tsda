import styles from './grid.module.css'
import { Chakra_Petch } from 'next/font/google'
import { GeneralProfileCard } from '@/components/GeneralProfileCard'
import { StatsCardProfile } from '@/components/StatsCardProfile'
import { Suspense } from 'react'
import { GeneralProfileCardSkeleton } from '@/components/GeneralProfileCardSkeleton'
import { StatsCardProfileSkeleton } from '@/components/StatsCardProfileSkeleton'
import { CommentsCardProfileSkeleton } from '@/components/CommentsCardProfileSkeleton'
import { CommentsProfileCard } from '@/components/CommentsProfileCard'

export const fetchCache = 'force-no-store'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export async function generateMetadata(
  props: {
    params: Promise<{ profile: string }>
  }
) {
  const params = await props.params;
  const name = await params.profile
    .split('-')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ')
  return {
    title: `Perfil de ${name} | Profedex`,
    description: `Página de perfil de ${name} en Profedex`,
    openGraph: {
      title: `Perfil de ${name} | Profedex`,
      description: `Página de perfil de ${name} en Profedex`
    },
    twitter: {
      title: `Perfil de ${name} | Profedex`
    }
  }
}

export default async function ProfilePage(
  props: {
    params: Promise<{ profile: string }>
  }
) {
  const params = await props.params;
  return (
    <main className={styles.main}>
      <article className="flex flex-col [grid-area:info]">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Perfil
        </h2>
        <Suspense fallback={<GeneralProfileCardSkeleton />}>
          <GeneralProfileCard username={await params.profile} />
        </Suspense>
      </article>
      <section className="flex flex-col [grid-area:comments]" id="comments">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Comentarios
        </h2>
        <Suspense fallback={<CommentsCardProfileSkeleton />}>
          {/* <CommentsCardProfileSkeleton /> */}
          <CommentsProfileCard username={await params.profile} />
        </Suspense>
      </section>
      <section className="flex flex-col [grid-area:stats]">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Estadísticas
        </h2>
        <Suspense fallback={<StatsCardProfileSkeleton />}>
          <StatsCardProfile username={await params.profile} />
        </Suspense>
      </section>
    </main>
  )
}
