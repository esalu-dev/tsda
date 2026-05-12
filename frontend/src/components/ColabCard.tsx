import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";

export function ColabCard({
  name,
  description,
  instagramLink,
  phoneNumber
}: {
  name: string
  description: string
  phoneNumber: string
  instagramLink?: string
}) {
  return (
    <Card className="my-3 max-w-[400px] shadow-sm" shadow="none">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-default-500 text-small">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className="flex gap-3">
        {instagramLink && (
          <Link isExternal href={instagramLink}>
            Instagram
          </Link>
        )}
        <div>
          <p className="text-default-500 text-small">{phoneNumber}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
