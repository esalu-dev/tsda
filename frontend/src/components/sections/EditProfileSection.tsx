import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Chakra_Petch } from 'next/font/google'
import { LogoutButton } from '../LogoutButton'
import { fetchUserInfo } from '@/lib/fetchUserInfo'
import { UsernameInput } from '../UsernameInput'

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '700']
})

export async function EditProfileSection() {
  const user = await fetchUserInfo()
  return (
    <div className="h-full p-4 sm:p-12">
      <h1 className={`${chakra.className} text-3xl font-bold`}>
        Editar perfil
      </h1>
      <article>
        <h2 className={`my-2 text-xl ${chakra.className}`}>
          Nombre de usuario
        </h2>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Este es el nombre que se mostrará en la plataforma.
          </p>
          <UsernameInput username={user.user?.username as string} />
        </div>
      </article>
      <article>
        <h2 className={`my-2 text-xl ${chakra.className}`}>
          Información personal
        </h2>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Si deseas modificar tu información personal, por favor contacta a
            soporte.
          </p>
          <Input
            label="E-mail"
            className="max-w-xl"
            value={user.user?.email}
            isDisabled
            classNames={{
              inputWrapper: 'dark:bg-dark-black bg-white'
            }}
          />
          <Input
            label="Número de control"
            className="max-w-xl"
            value={user.user?.numControl}
            isDisabled
            classNames={{
              inputWrapper: 'dark:bg-dark-black bg-white'
            }}
          />
          <Input
            label="Carrera"
            className="max-w-xl"
            value={user.user?.carrera}
            isDisabled
            classNames={{
              inputWrapper: 'dark:bg-dark-black bg-white'
            }}
          />
          <Button
            as={Link}
            target="_self"
            href={`/app/profile/${user.user?.username as string}`}
            variant="flat"
            className="max-w-xl"
          >
            Regresar
          </Button>
          <LogoutButton />
        </div>
      </article>
    </div>
  )
}
