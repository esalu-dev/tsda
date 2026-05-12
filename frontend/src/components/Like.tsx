import { Button } from "@heroui/button";
import { useOptimistic } from 'react'
import { FaHeart } from 'react-icons/fa'

export function Like({
  likeState,
  handleLike,
  published
}: {
  likeState: { numberLikes: number; liked: boolean }
  handleLike: () => Promise<void>
  published?: boolean
}) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likeState,
    (state) => ({
      numberLikes: state.numberLikes + (state.liked ? -1 : 1),
      liked: !state.liked
    })
  )
  return (
    <Button
      startContent={<FaHeart />}
      size="sm"
      color="primary"
      variant={optimisticLikes.liked ? 'shadow' : 'bordered'}
      onClick={async () => {
        setOptimisticLikes(optimisticLikes)
        await handleLike()
      }}
      isDisabled={published === false}
    >
      {optimisticLikes.numberLikes}
    </Button>
  )
}
