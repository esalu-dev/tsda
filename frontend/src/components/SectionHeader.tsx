import { Chip } from "@heroui/chip";

export function SectionHeader({
  button,
  title,
  description
}: {
  button: string
  title: string
  description: string
}) {
  return (
    <div className="font-onest my-10 flex flex-col items-center justify-center text-center">
      <Chip variant="solid" color="primary">
        {button}
      </Chip>
      <h2 className="mb-5 pt-3 text-2xl font-bold leading-tight text-black dark:text-white md:text-3xl">
        {title}
      </h2>
      <div className="mx-auto max-w-lg">
        <p className="md:text-md text-sm text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}
