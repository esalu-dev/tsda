import { DROPDOWN_OPTIONS } from '@/schemas/FilterOptions'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { MdSort } from 'react-icons/md'

export function OrderFilterDropdown() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)
  const handleFilter = (filter: string) => {
    if (filter !== 'popular') {
      params.set('filter', filter)
    } else {
      params.delete('filter')
    }
    replace(`${pathname}?${params.toString()}#comments`)
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          endContent={<MdSort className="text-lg" />}
          color="primary"
          size="sm"
        >
          Ordenar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => {
          handleFilter(key as string)
        }}
        selectionMode="single"
        selectedKeys={[params.get('filter') ?? 'popular']}
      >
        {DROPDOWN_OPTIONS.map((option) => (
          <DropdownItem key={option.key}>{option.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
