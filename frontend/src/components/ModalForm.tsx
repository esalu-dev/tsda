import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { useRouter } from 'next/navigation'

/**
 * Renders a modal form component.
 *
 * @param isOpen - A boolean indicating whether the modal is open or not.
 * @param onOpenChange - A function that handles the change of the modal's open state.
 * @param response - An object containing the response data.
 * @param url - The URL to redirect to.
 * @returns The rendered modal form component.
 */
export function ModalForm({
  isOpen,
  onOpenChange,
  response,
  url
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  response: {
    title: string
    message: string
    success: boolean
  }
  url: string
}) {
  const router = useRouter()
  return (
    <Modal
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {response.title}
            </ModalHeader>
            <ModalBody>
              <p>{response.message}</p>
            </ModalBody>
            <ModalFooter>
              {response.success ? (
                <Button
                  color="primary"
                  onClick={() => {
                    onClose()
                    router.push(url)
                  }}
                >
                  Iniciar sesión
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    onClose()
                    location.reload()
                  }}
                >
                  Cerrar
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
