import { likeReview } from '@/actions/likeReview'
import { ReviewType } from '@/schemas/ReviewType'
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useState } from 'react'
import { BiBrain } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { CgMathDivide } from 'react-icons/cg'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { SlOptions } from 'react-icons/sl'
import { TbMathIntegralX, TbMathXDivideY2 } from 'react-icons/tb'
import { Like } from './Like'
import { CommentDropwdown } from './CommentDropdown'
import { Session } from 'next-auth'
import { FiX } from 'react-icons/fi'
import { toggleReviewVisibility } from '@/actions/toggleReviewVisibility'
import { CommentDate } from './CommentDate'
import { ProfileCard } from '@/components/ProfileCard'

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div className="text-md flex items-center text-yellow-500">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <FaStar key={i} />
        ))}
      {halfStar && <FaRegStarHalfStroke />}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <FaRegStar key={i} />
        ))}
    </div>
  )
}

export function Comment({
  review,
  session,
  published,
  seenFromProfile
}: {
  review: ReviewType
  session: Session
  published?: boolean
  seenFromProfile: boolean
}) {
  const numberLikes = review.likes.length

  const [likeState, setLikeState] = useState({
    numberLikes,
    liked: review.likedByUser
  })
  const [modal, setModal] = useState({
    body: '¿Estás seguro de eliminar este comentario?',
    buttonContent: 'Eliminar'
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleLike = async () => {
    const response = await likeReview(review.id)
    if (!response.success) return
    setLikeState({
      numberLikes: likeState.numberLikes + (likeState.liked ? -1 : 1),
      liked: !likeState.liked
    })
  }
  const deleteComment = async () => {
    const response = await toggleReviewVisibility(review.id)
    if (!response.success) {
      setModal({
        body: response.error as string,
        buttonContent: 'Aceptar'
      })
      onOpen()
      return
    }
    window.location.reload()
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Advertencia</ModalHeader>
              <ModalBody>{modal.body}</ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="ghost">
                  Cancelar
                </Button>
                <Button color="primary" onPress={deleteComment}>
                  {modal.buttonContent}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex items-center justify-between gap-2">
          {seenFromProfile ? (
            <div
              className={`flex items-center gap-2 ${
                published === false ? 'line-through' : ''
              }`}
            >
              <Avatar
                showFallback
                name={review.user.username.charAt(0).toUpperCase()}
                classNames={{
                  name: 'text-lg'
                }}
              />
              <div className="flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <strong className="text-md flex items-center gap-1">
                    {review.user.username}
                    {published === false && (
                      <FiX className="text-xl text-main-red" />
                    )}
                  </strong>
                  <CommentDate date={review.createdAt} />
                </div>
                <div className="text-md flex items-center text-yellow-500">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <div
                  className={`flex items-center gap-2 ${
                    published === false ? 'line-through' : ''
                  }`}
                >
                  <Avatar
                    showFallback
                    name={review.user.username.charAt(0).toUpperCase()}
                    classNames={{
                      name: 'text-lg'
                    }}
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <strong className="text-md flex items-center gap-1">
                        {review.user.username}
                        {published === false && (
                          <FiX className="text-xl text-main-red" />
                        )}
                      </strong>
                      <CommentDate date={review.createdAt} />
                    </div>
                    <div className="text-md flex items-center text-yellow-500">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <ProfileCard username={review.user.username} />
              </PopoverContent>
            </Popover>
          )}
          <CommentDropwdown
            username={review.user.username}
            session={session}
            onOpen={onOpen}
            published={review.published}
            setModal={setModal}
          />
        </div>
        <p className="text-sm">
          <i className="block font-light text-gray-500 dark:text-gray-400">
            Materia: {review.materia.nombre}
          </i>
          {review.body}
        </p>
        <div className="flex justify-between gap-3">
          <div className="flex md:hidden">
            <Popover placement="top">
              <PopoverTrigger>
                <Chip
                  variant="bordered"
                  className="text-gray-400 dark:text-gray-600"
                >
                  <SlOptions />
                </Chip>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 p-2">
                <Chip
                  variant="flat"
                  color={review.wouldTakeAgain ? 'success' : 'primary'}
                  startContent={<BsArrowRepeat />}
                  size="lg"
                >
                  {review.wouldTakeAgain ? 'Sí' : 'No'}
                </Chip>
                <Divider />
                {review.difficulty < 3 && (
                  <Chip
                    variant="flat"
                    color="success"
                    startContent={<CgMathDivide />}
                    size="lg"
                  >
                    {review.difficulty} / 10
                  </Chip>
                )}
                {review.difficulty < 7 && review.difficulty >= 3 && (
                  <Chip
                    variant="flat"
                    color="warning"
                    startContent={<TbMathXDivideY2 />}
                    size="lg"
                  >
                    {review.difficulty} / 10
                  </Chip>
                )}
                {review.difficulty >= 7 && (
                  <Chip
                    variant="flat"
                    color="primary"
                    startContent={<TbMathIntegralX />}
                    size="lg"
                  >
                    {review.difficulty} / 10
                  </Chip>
                )}
                <Divider />
                <Chip
                  variant="flat"
                  startContent={<BiBrain />}
                  color={
                    review.learningLevel < 3
                      ? 'primary'
                      : review.learningLevel < 7
                        ? 'danger'
                        : 'success'
                  }
                  size="lg"
                >
                  {review.learningLevel} / 10
                </Chip>
              </PopoverContent>
            </Popover>
          </div>
          <div className="hidden gap-2 md:flex">
            <Chip
              variant="flat"
              color={review.wouldTakeAgain ? 'success' : 'primary'}
              startContent={<BsArrowRepeat />}
            >
              {review.wouldTakeAgain ? 'Sí' : 'No'}
            </Chip>
            {review.difficulty < 3 && (
              <Chip
                variant="flat"
                color="success"
                startContent={<CgMathDivide />}
              >
                {review.difficulty} / 10
              </Chip>
            )}
            {review.difficulty < 7 && review.difficulty >= 3 && (
              <Chip
                variant="flat"
                color="warning"
                startContent={<TbMathXDivideY2 />}
              >
                {review.difficulty} / 10
              </Chip>
            )}
            {review.difficulty >= 7 && (
              <Chip
                variant="flat"
                color="primary"
                startContent={<TbMathIntegralX />}
              >
                {review.difficulty} / 10
              </Chip>
            )}
            <Chip
              variant="flat"
              startContent={<BiBrain />}
              color={
                review.learningLevel < 3
                  ? 'primary'
                  : review.learningLevel < 7
                    ? 'danger'
                    : 'success'
              }
            >
              {review.learningLevel} / 10
            </Chip>
          </div>
          <div className="flex gap-2">
            <Like
              handleLike={handleLike}
              likeState={likeState}
              published={published}
            />
          </div>
        </div>
      </div>
    </>
  )
}
