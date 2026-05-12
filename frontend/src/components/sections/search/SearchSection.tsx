import { PaginationServer } from '@/components/PaginationServer'
import { SearchBar } from '@/components/SearchBar'
import { SearchResults } from '@/components/SearchResults'
import { Chakra_Petch } from 'next/font/google'
import { Suspense } from 'react'
import { SearchResultsSkeleton } from '../professor/skeleton/SearchResultsSkeleton'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export function SearchSection({
  search,
  page
}: {
  search?: string
  page?: string
}) {
  const query = search ?? ''
  const pageInt = Number(page) || 1

  return (
    <div className="flex flex-1 flex-col justify-between p-4 sm:p-12">
      <div className="flex flex-grow flex-col gap-3">
        <h1 className={`${chakra.className} text-3xl font-bold`}>
          Buscar profesores
        </h1>
        <SearchBar />
        <Suspense
          key={query + String(pageInt)}
          fallback={<SearchResultsSkeleton />}
        >
          <SearchResults page={pageInt} query={query} />
        </Suspense>
      </div>
      <Suspense fallback={<span>loading...</span>}>
        <div className="mt-2">
          <PaginationServer query={query} />
        </div>
      </Suspense>
    </div>
  )
}
