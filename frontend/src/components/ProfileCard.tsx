import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Skeleton } from "@heroui/skeleton";
import { useEffect, useState } from 'react'
import { fetchProfileCard } from '@/actions/fetchProfileCard'
import { getCareerFormattedName } from '@/lib/getCareerName'
import { User } from '@prisma/client'

interface Stats {
  reviewCount: number
  likeCount: number
}

export function ProfileCard({ username }: { username: string }) {
  const [status, setStatus] = useState({
    error: false,
    loaded: false
  })
  const [data, setData] = useState<{
    user: User | undefined
    stats: Stats | undefined
  }>({
    user: undefined,
    stats: undefined
  })
  useEffect(() => {
    async function loadProfileCard() {
      const { success, data } = await fetchProfileCard(username)
      if (!success || !data) {
        setStatus({
          error: true,
          loaded: true
        })
        return
      }

      setData(data)
      setStatus({
        error: false,
        loaded: true
      })
    }

    void loadProfileCard()
  }, [username])

  return (
    <Card shadow="none" className="w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between gap-4">
        <div className="flex gap-3">
          <Skeleton className="rounded-full" isLoaded={status.loaded}>
            <Avatar
              radius="full"
              fallback={username.charAt(0).toUpperCase()}
              classNames={{
                fallback: 'text-lg'
              }}
            />
          </Skeleton>
          <div className="flex flex-col items-start justify-center">
            <Skeleton
              className="min-h-3 max-w-[100px] rounded-lg"
              isLoaded={status.loaded}
            >
              <h4 className="min-h-3 min-w-14 max-w-[100px] overflow-clip text-ellipsis font-semibold leading-none text-default-600 text-small">
                {data.user?.username}
              </h4>
            </Skeleton>
            <h5 className="tracking-tight text-default-500 text-small">
              Miembro desde{' '}
              <Skeleton
                className="inline-flex min-h-3 w-8 rounded-lg"
                isLoaded={status.loaded}
              >
                <span className="text-primary">
                  {data.user?.createdAt.getFullYear()}
                </span>
              </Skeleton>
            </h5>
          </div>
        </div>
        <Button
          color="primary"
          size="sm"
          variant="solid"
          as={Link}
          href={`/app/profile/${data.user?.username as string}`}
          isDisabled={!status.loaded}
        >
          Ver perfil
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <Skeleton className="min-h-5 rounded-lg" isLoaded={status.loaded}>
          <p className="h-4 pl-px text-default-500 text-small">
            {data.user && (getCareerFormattedName(data.user.carrera) as string)}
          </p>
        </Skeleton>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Skeleton
            className="min-h-4 min-w-3 rounded-md"
            isLoaded={status.loaded}
          >
            <p className="font-semibold text-primary text-small">
              {data.stats?.reviewCount}
            </p>
          </Skeleton>
          <p className="text-default-500 text-small">Comentarios</p>
        </div>
        <div className="flex gap-1">
          <Skeleton
            className="min-h-4 min-w-3 rounded-md"
            isLoaded={status.loaded}
          >
            <p className="font-semibold text-small">{data.stats?.likeCount}</p>
          </Skeleton>
          <p className="text-default-500 text-small">Likes recibidos</p>
        </div>
      </CardFooter>
    </Card>
  )
}
