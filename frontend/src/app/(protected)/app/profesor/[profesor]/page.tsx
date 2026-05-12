import styles from './grid.module.css'
import { Chakra_Petch } from 'next/font/google'
import { GeneralInfoCard } from '@/components/sections/professor/GeneralInfoCard'
import { Suspense } from 'react'
import { GeneralInfoCardSkeleton } from '@/components/sections/professor/skeleton/GeneralInfoCardSkeleton'
import { CommentsCard } from '@/components/sections/professor/CommentsCard'
import { CommentsCardSkeleton } from '@/components/sections/professor/skeleton/CommentsCardSkeleton'
import { StatsCard } from '@/components/sections/professor/StatsCard'
import { StatsCardSkeleton } from '@/components/sections/professor/skeleton/StatsCardSkeleton'

export const fetchCache = 'force-no-store'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export async function generateMetadata(
  props: {
    params: Promise<{ profesor: string }>
  }
) {
  const params = await props.params;
  const name = params.profesor
    .split('-')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ')
  return {
    title: `${name} | Profedex`,
    description: `Página de ${name} en Profedex`,
    openGraph: {
      title: `${name} | Profedex`,
      description: `Página de ${name} en Profedex`
    },
    twitter: {
      title: `${name} | Profedex`
    }
  }
}

export default async function ProfesorPage(
  props: {
    params: Promise<{ profesor: string }>
    searchParams?: Promise<{ filter: string; career: string }>
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <main className={styles.main}>
      <article className="flex flex-col [grid-area:info]">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Datos generales
        </h2>
        <Suspense fallback={<GeneralInfoCardSkeleton />}>
          <GeneralInfoCard shortname={params.profesor} />
        </Suspense>
      </article>
      <section className="flex flex-col [grid-area:comments]" id="comments">
        <Suspense
          fallback={<CommentsCardSkeleton />}
          key={
            (searchParams?.filter as string) + (searchParams?.career as string)
          }
        >
          <CommentsCard
            shortname={params.profesor}
            filter={searchParams?.filter}
            career={searchParams?.career}
          />
        </Suspense>
      </section>
      <section className="flex flex-col [grid-area:stats]">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Estadísticas
        </h2>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCard shortname={params.profesor} />
        </Suspense>
      </section>
    </main>
  )
}
