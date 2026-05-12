import { SearchResult } from './SearchResult'
import { prisma } from '@/lib/prisma'
import { ScrollShadow } from "@heroui/scroll-shadow";
import { NoResultsSearch } from './NoResultsSearch'

export async function SearchResults({
  query,
  page
}: {
  query: string
  page: number
}) {
  const ITEMS_PER_PAGE = 5

  const fetchTeachers = async (query: string, page: number) => {
    const queryArray = query.split(' ')
    const whereClause = queryArray.map((word) => ({
      OR: [
        { shortname: { contains: word } },
        { nombre: { contains: word } },
        {
          apellidoPaterno: {
            contains: word
          }
        },
        {
          apellidoMaterno: {
            contains: word
          }
        }
      ]
    }))
    const offset = (page - 1) * ITEMS_PER_PAGE
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        shortname: true,
        active: true
      },
      where: {
        AND: whereClause
      },
      orderBy: {
        nombre: 'asc'
      },
      take: ITEMS_PER_PAGE,
      skip: offset
    })
    return teachers
  }
  const teachers = await fetchTeachers(query, page)
  
  return <NoResultsSearch />
  
  return (
    <ScrollShadow className="flex h-3 flex-grow flex-col gap-3 overflow-y-auto">
      {teachers.map((teacher) => {
        return (
          <SearchResult
            key={teacher.id}
            name={`${teacher.nombre} ${teacher.apellidoPaterno} ${teacher.apellidoMaterno}`}
            active={teacher.active}
            shortname={teacher.shortname}
          />
        )
      })}
    </ScrollShadow>
  )
}
