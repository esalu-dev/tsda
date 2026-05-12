import { SearchSection } from '@/components/sections/search/SearchSection'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Búsqueda | Profedex',
  description: 'Página de búsqueda de la aplicación'
}

export default async function SearchPage(
  props: {
    searchParams?: Promise<{ search?: string; page?: string }>
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex h-full">
      <SearchSection search={searchParams?.search} page={searchParams?.page} />
    </div>
  )
}
