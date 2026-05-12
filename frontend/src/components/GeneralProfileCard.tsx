import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { fetchProfile } from '@/lib/fetchProfile'
import { notFound } from 'next/navigation'
import { getCareerFormattedName } from '@/lib/getCareerName'
import { auth } from '@/auth'
import { FiEdit } from 'react-icons/fi'

export async function GeneralProfileCard({ username }: { username: string }) {
  const user = await fetchProfile(username)
  const session = await auth()
  if (user === null) return notFound()

  return (
    <section className="relative flex flex-1 basis-60 flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-sm dark:bg-dark-black">
      {session?.user.username === username && (
        <span className="absolute right-4 top-4">
          <Button
            isIconOnly
            variant="light"
            color="primary"
            size="lg"
            href="/app/profile/edit"
            as={Link}
          >
            <FiEdit />
          </Button>
        </span>
      )}
      <Avatar
        showFallback
        fallback={username.charAt(0).toUpperCase()}
        color="primary"
        size="lg"
        classNames={{
          fallback: 'text-xl font-bold'
        }}
      />
      <h3 className="text-xl font-bold">{user.username}</h3>
      <div className="text-center">
        <p className="text-gray-500">
          {getCareerFormattedName(user.carrera) as string}
        </p>
        <p>
          Miembro desde{' '}
          <strong className="text-primary">
            {user.createdAt.getFullYear()}
          </strong>
        </p>
      </div>
    </section>
  )
}
