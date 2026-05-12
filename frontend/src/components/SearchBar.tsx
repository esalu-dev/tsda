'use client'
import { Input } from "@heroui/input";
import { CiSearch } from 'react-icons/ci'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.delete('page')
    replace(`${pathname}?${params.toString()}`)
  }, 500)
  return (
    <Input
      label="Introduce tu búsqueda"
      variant="bordered"
      color="primary"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
      startContent={<CiSearch />}
    />
  )
}
