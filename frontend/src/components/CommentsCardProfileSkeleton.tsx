import { Divider } from "@heroui/divider";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { CommentProfileSkeleton } from '@/components/CommentProfileSkeleton'

export function CommentsCardProfileSkeleton() {
  return (
    <>
      <div className="flex-1 overflow-hidden rounded-2xl bg-white p-2 shadow-sm dark:bg-dark-black">
        <section className="h-full">
          <ScrollShadow className="h-full overflow-clip">
            <div className="flex flex-col gap-3 p-2">
              <CommentProfileSkeleton />
              <Divider />
              <CommentProfileSkeleton />
              <Divider />
              <CommentProfileSkeleton />
              <Divider />
              <CommentProfileSkeleton />
              <Divider />
              <CommentProfileSkeleton />
            </div>
          </ScrollShadow>
        </section>
      </div>
    </>
  )
}
