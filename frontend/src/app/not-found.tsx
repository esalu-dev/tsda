/* eslint-disable @next/next/no-img-element */
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
export default function NotFound() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-main-black">
        <img
          className="w-[300px] drop-shadow-md"
          src="/pola.webp"
          alt="ITD PET"
        />
        <h2 className="my-1 mb-4 text-center text-2xl font-semibold">
          Ooops... Parece que estás algo perdido.
        </h2>
        <p className="mb-6 max-w-full text-center">
          Puedes regresar a la página de inicio o ir a la sección de ayuda.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="shadow"
            color="primary"
            className="w-28 font-bold"
            href="/app"
            as={Link}
          >
            Inicio
          </Button>
        </div>
      </div>
    </>
  )
}
