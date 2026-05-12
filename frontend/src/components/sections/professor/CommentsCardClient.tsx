'use client'
import { OrderFilterDropdown } from '@/components/OrderFilterDropdown'
import { InfiniteScrollReviews } from '@/components/InfiniteScrollReviews'
import { ReviewModal } from '@/components/ReviewModal'
import { ReviewType } from '@/schemas/ReviewType'
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Materias } from '@prisma/client'
import { Session } from 'next-auth'
import { Chakra_Petch } from 'next/font/google'
import { CareerFilterDropdown } from '@/components/CareerFilterDropdown'
import { useSearchParams } from 'next/navigation'
import { FaAsterisk } from 'react-icons/fa'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

export function CommentsCardClient({
  reviews,
  shortname,
  materias,
  session
}: {
  reviews: ReviewType[]
  shortname: string
  materias: Materias[]
  session: Session
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const searchParams = useSearchParams()

  const activeFilter = new URLSearchParams(searchParams).has('career')

  return (
    <>
      <ReviewModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        chakra={chakra.className}
        shortname={shortname}
        materias={materias}
      />
      <div className="flex items-center justify-between">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Comentarios{' '}
          {activeFilter && (
            <span className="inline-block text-sm text-main-red-300">
              <FaAsterisk />
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          <CareerFilterDropdown activeFilter={activeFilter} />
          <OrderFilterDropdown />
        </div>
      </div>
      <div
        className={`flex flex-grow basis-[500px] flex-col gap-2 overflow-hidden rounded-2xl border-2 bg-white p-2 shadow-sm duration-1000 ease-in-out dark:bg-dark-black ${
          activeFilter ? 'border-main-red transition-all' : 'border-transparent'
        }`}
      >
        {reviews.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <h3 className="text-lg font-bold">No hay comentarios</h3>
            {activeFilter ? (
              <p className="text-sm text-gray-500">
                Prueba con un filtro diferente o elimina los filtros.
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Sé el primero en dejar un comentario
              </p>
            )}
          </div>
        ) : (
          <InfiniteScrollReviews session={session} reviews={reviews} />
        )}
        <Button
          className="sticky bottom-0 w-full shrink-0 basis-10 shadow-md"
          color="primary"
          onPress={onOpen}
        >
          Dejar un comentario
        </Button>
      </div>
    </>
  )
}
