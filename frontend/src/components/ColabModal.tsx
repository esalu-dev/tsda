'use client'
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { ColabCard } from './ColabCard'

export function ColabModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const COLABORATORS = [
    {
      name: 'Emilio Salas Luján',
      description:
        'Representante Profedex de ingeniería en sistemas, TICs e informática',
      instagramLink: 'https://www.instagram.com/esalu._/',
      phoneNumber: '961-947-5238'
    },
    {
      name: 'Luis Tadeo Becerra Rocha',
      description: 'Representante Profedex de ingeniería mecánica',
      instagramLink: 'https://www.instagram.com/juicho0',
      phoneNumber: '563-191-9439'
    },
    {
      name: 'Enrique Zamora Ríos',
      description: 'Representante Profedex de ingeniería bioquímica',
      instagramLink: 'https://www.instagram.com/z.e.012',
      phoneNumber: '618-318-7924'
    }
  ]
  return (
    <>
      <Button className="bg-white dark:bg-dark-black" onPress={onOpen}>
        Ver Representantes
      </Button>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="auto"
          backdrop="blur"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Representantes Profedex
                  <span className="font-normal text-default-500 text-small">
                    Si tienes alguna duda, puedes contactar a alguno de los
                    representantes de Profedex
                  </span>
                </ModalHeader>
                <ModalBody>
                  <div>
                    {COLABORATORS.map((colab, index) => (
                      <ColabCard key={index} {...colab} />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
