import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { IoIosArrowForward } from 'react-icons/io'

export function SearchResult({
  shortname,
  name,
  active
}: {
  shortname: string
  name: string
  active: boolean
}) {
  return (
    <Button
      as={Link}
      className="flex h-16 w-full items-center justify-between rounded-xl bg-white p-3 dark:bg-dark-black"
      href={`/app/profesor/${shortname}`}
      target="_self"
    >
      <div className="flex items-center gap-3">
        <Avatar
          showFallback
          name={name.charAt(0).toUpperCase()}
          classNames={{
            name: 'text-lg'
          }}
        />
        <p className="max-w-40 overflow-clip text-ellipsis md:max-w-fit">
          {name}
        </p>
        <span className="hidden lg:inline">
          {active ? (
            <Chip size="sm" variant="dot" color="success">
              Activo
            </Chip>
          ) : (
            <Chip size="sm" variant="dot" color="primary">
              Inactivo
            </Chip>
          )}
        </span>
      </div>
      <IoIosArrowForward />
    </Button>
  )
}
