import { Divider } from "@heroui/divider";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Chakra_Petch } from 'next/font/google'
import { CommentSkeleton } from './CommentSkeleton'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700']
})

export function CommentsCardSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className={`${chakra.className} mb-2 text-2xl font-bold`}>
          Comentarios
        </h2>
      </div>
      <div className="flex-1 basis-[500px] overflow-hidden rounded-2xl bg-white p-2 shadow-sm dark:bg-dark-black">
        <section className="h-full">
          <ScrollShadow className="h-full overflow-hidden">
            <div className="flex flex-col gap-3 p-2">
              <CommentSkeleton />
              <Divider />
              <CommentSkeleton />
              <Divider />
              <CommentSkeleton />
              <Divider />
              <CommentSkeleton />
              <Divider />
              <CommentSkeleton />
            </div>
          </ScrollShadow>
        </section>
      </div>
    </>
  )
}
