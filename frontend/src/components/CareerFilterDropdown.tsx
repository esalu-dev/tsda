import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { careers } from '@/schemas/careers'
import { FiFilter } from 'react-icons/fi'

export function CareerFilterDropdown({
  activeFilter
}: {
  activeFilter: boolean
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)
  const handleCareer = (career: string) => {
    if (career !== 'all') {
      params.set('career', career)
    } else {
      params.delete('career')
    }
    replace(`${pathname}?${params.toString()}#comments`)
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          endContent={<FiFilter className="text-lg" />}
          size="sm"
          color={activeFilter ? 'primary' : 'default'}
          variant="bordered"
        >
          Carrera
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => {
          handleCareer(key as string)
        }}
        selectionMode="single"
        selectedKeys={new Set([params.get('career') ?? 'all'])}
      >
        <DropdownSection title="Sin filtro">
          <DropdownItem key="all">Todas</DropdownItem>
        </DropdownSection>
        <DropdownSection title="Carreras">
          {careers.map((option) => (
            <DropdownItem key={option.filter}>
              {option.formattedName}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
