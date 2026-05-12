import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/modal'
import { RadioGroup, Radio } from '@heroui/radio'
import { Slider } from '@heroui/slider'
import { Textarea } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'
import { Button } from '@heroui/button'
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete'
import { Link } from '@heroui/link'
import { Key, useRef, useState } from 'react'
import { StarRating } from './StarRating'
import { ReviewSchema } from '@/schemas/ReviewSchema'
import { addReview } from '@/actions/addReview'
import { Materias } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function ReviewModal({
  isOpen,
  onOpenChange,
  chakra,
  shortname,
  materias
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  chakra: string
  shortname: string
  materias: Materias[]
}) {
  const [wouldTakeAgain, setWouldTakeAgain] = useState('si')
  const [difficulty, setDifficulty] = useState(0)
  const [rating, setRating] = useState(0)
  const [learned, setLearned] = useState(0)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isAccepted, setIsAccepted] = useState(false)
  const [materia, setMateria] = useState<Key | null>(null)
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onOpenChange: successOnOpenChange
  } = useDisclosure()

  const onMateriaChange = (value: Key) => {
    setMateria(value)
  }

  const [errors, setErrors] = useState({
    error: false,
    message: ''
  })

  const sendReview = async () => {
    if (!isAccepted) {
      alert('Debes aceptar las políticas de comentarios')
      return
    }
    setLoading(true)
    const wouldTakeAgainValue = wouldTakeAgain === 'si'
    const validacion = await ReviewSchema.safeParseAsync({
      rating,
      wouldTakeAgain: wouldTakeAgainValue,
      difficulty,
      learned,
      materiaId: Number(materia),
      body: textAreaRef.current?.value ?? ''
    })
    if (!validacion.success) {
      setErrors({
        error: true,
        // TODO: Corregir error de validacion
        // message: validacion.error.errors[0].message
        message: 'Error al validar el comentario'
      })
      setLoading(false)
      return
    }
    const response = await addReview(validacion.data, shortname)
    if (response.success) {
      setLoading(false)
      onOpenChange(false)
      successOnOpen()
    }
  }

  const onDismiss = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('filter')
    params.set('filter', 'recent')
    replace(`${pathname}?${params.toString()}#comments`)
  }

  return (
    <>
      <Modal
        isOpen={successIsOpen}
        onOpenChange={successOnOpenChange}
        backdrop="blur"
        placement="auto"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Éxito!</ModalHeader>
              <ModalBody>
                <p>Tu comentario ha sido publicado exitosamente!</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => {
                    onClose()
                    onDismiss()
                  }}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        backdrop="blur"
        scrollBehavior="inside"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1 ${chakra}`}>
                Añadir un comentario
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between">
                  <p className="text-gray-500">Calificación general:</p>
                  <p>
                    <strong>{rating}</strong>/5
                  </p>
                </div>
                <StarRating rating={rating} setStarRating={setRating} />
                <RadioGroup
                  label="¿Volverías a tomar clase con este profesor?"
                  isRequired
                  value={wouldTakeAgain}
                  onValueChange={(value: string) => setWouldTakeAgain(value)}
                >
                  <Radio value="si">Sí</Radio>
                  <Radio value="no">No</Radio>
                </RadioGroup>
                <Slider
                  size="lg"
                  step={1}
                  color={
                    difficulty < 3
                      ? 'success'
                      : difficulty < 8
                        ? 'warning'
                        : 'primary'
                  }
                  label="Del 1 al 10, ¿qué tan difícil consideras que fue tu experiencia con este profesor?"
                  showSteps
                  maxValue={10}
                  minValue={0}
                  value={difficulty}
                  onChange={(value: number | number[]) =>
                    setDifficulty(value as number)
                  }
                  classNames={{
                    label: 'text-gray-500'
                  }}
                />
                <Slider
                  size="lg"
                  step={1}
                  color={
                    learned < 3
                      ? 'primary'
                      : learned < 7
                        ? 'warning'
                        : 'success'
                  }
                  label="Del 1 al 10, ¿qué tanto consideras que aprendiste con este profesor? "
                  showSteps
                  maxValue={10}
                  minValue={0}
                  value={learned}
                  onChange={(value: number | number[]) =>
                    setLearned(value as number)
                  }
                  classNames={{
                    label: 'text-gray-500'
                  }}
                />
                <p className="text-gray-500">Para finalizar:</p>
                <Autocomplete
                  defaultItems={materias}
                  label="Materia"
                  placeholder="Selecciona la materia que te impartió"
                  onSelectionChange={(key: Key | null) =>
                    onMateriaChange(key as Key)
                  }
                  isRequired
                >
                  {(materia) => (
                    <AutocompleteItem key={materia.id}>
                      {materia.nombre}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Textarea
                  label="Añade tu comentario"
                  isRequired
                  description="Por favor, evita comentarios irrespetuosos"
                  placeholder="Detalla lo más que puedas tu experiencia con este profesor, te recomendamos considerar puntos como la metodología de enseñanza, la claridad de las explicaciones, la disponibilidad para resolver dudas, entre otros."
                  ref={textAreaRef}
                  isInvalid={errors.error}
                  errorMessage={errors.message}
                />
                <Checkbox
                  classNames={{
                    label: 'text-small'
                  }}
                  isRequired
                  isSelected={isAccepted}
                  onValueChange={setIsAccepted}
                >
                  He leído y acepto las{' '}
                  <Link href="/terms" color="primary" target="_blank">
                    políticas de comentarios
                  </Link>{' '}
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={sendReview}
                  isLoading={loading}
                >
                  Añadir comentario
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
