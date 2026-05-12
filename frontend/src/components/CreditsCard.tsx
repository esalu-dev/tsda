import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export function CreditsCard({
  img,
  name,
  occupation,
  description,
  instagramLink,
  websiteLink,
  githubLink
}: {
  img: string
  name: string
  occupation: string
  description: string
  instagramLink?: string
  websiteLink?: string
  githubLink?: string
}) {
  return (
    <Card className="my-3 max-w-[400px] shadow-sm" shadow="none">
      <CardHeader className="flex gap-3">
        <Image
          alt={`Image of ${name}`}
          height={70}
          radius="sm"
          src={img}
          width={70}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-default-500 text-small">{occupation}</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex gap-3">
        {instagramLink && (
          <Link isExternal href={instagramLink}>
            Instagram
          </Link>
        )}
        {websiteLink && (
          <Link isExternal href={websiteLink}>
            Sitio web
          </Link>
        )}
        {githubLink && (
          <Link isExternal href={githubLink}>
            GitHub
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
