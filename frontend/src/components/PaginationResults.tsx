'use client'

import { Pagination } from "@heroui/pagination";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function PaginationResults({ count }: { count: number }) {
  const totalPages = Math.ceil(count / 5)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams.toString())
  function handlePagination(page: number) {
    if (page !== 1) {
      params.set('page', String(page))
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Pagination
      page={((n) => (n === 0 ? 1 : n))(Number(params.get('page')))}
      total={totalPages}
      classNames={{
        item: 'bg-white dark:bg-dark-black'
      }}
      onChange={(e) => {
        handlePagination(e)
      }}
    />
  )
}
