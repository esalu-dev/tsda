import { Card, CardBody } from "@heroui/card";
import { FaStar } from 'react-icons/fa'

export function StarRating({
  rating,
  setStarRating
}: {
  rating: number
  setStarRating: (rating: number) => void
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Card
          key={star}
          shadow="sm"
          isPressable
          onPress={() => {
            setStarRating(star)
            if (star === rating) {
              setStarRating(0)
            }
          }}
          className={`${
            star <= rating ? 'text-yellow-500' : 'text-gray-500'
          } trasition-all`}
        >
          <CardBody>
            <FaStar className="transition-colors duration-75 ease-out" />
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
