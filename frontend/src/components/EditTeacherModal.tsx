import { searchTeacher } from '@/actions/searchTeacher'
import { updateTeacher } from '@/actions/updateTeacher'
import { AddTeacherSchema } from '@/schemas/AddTeacherSchema'
import { ShortnameSearchSchema } from '@/schemas/ShortnameSearchSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { z } from 'zod'

type ShortnameSearchType = z.infer<typeof ShortnameSearchSchema>
type EditTeacherFormTypes = z.infer<typeof AddTeacherSchema>
export function EditTeacherModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [blocked, setBlocked] = useState({
    shortname: false,
    else: true
  })
  const [teacherInfo, setTeacherInfo] = useState({
    shortname: '',
    name: '',
    paterno: '',
    materno: '',
    isActive: false
  })
  const [message, setMessage] = useState({
    show: false,
    message: ''
  })
  const {
    register: shortnameRegister,
    handleSubmit: shortnameHandleSubmit,
    reset: shortnameReset
  } = useForm<ShortnameSearchType>({
    resolver: zodResolver(ShortnameSearchSchema),
    mode: 'onBlur'
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<EditTeacherFormTypes>({
    resolver: zodResolver(AddTeacherSchema),
    mode: 'onBlur'
  })
  const onSearch = shortnameHandleSubmit(async (data) => {
    const searchResponse = await searchTeacher(data)
    if (!searchResponse.success) {
      setMessage({
        show: true,
        message: searchResponse.error as string
      })
      return
    }
    setBlocked({
      shortname: true,
      else: false
    })
    if (!searchResponse.teacher) return
    setTeacherInfo({
      shortname: data.shortname,
      name: searchResponse.teacher.nombre,
      paterno: searchResponse.teacher.apellidoPaterno,
      materno: searchResponse.teacher.apellidoMaterno,
      isActive: searchResponse.teacher.active
    })
  })
  const onSubmit = async () => {
    setValue('shortname', teacherInfo.shortname)
    setValue('name', teacherInfo.name)
    setValue('paterno', teacherInfo.paterno)
    setValue('materno', teacherInfo.materno)
    setValue('isActive', teacherInfo.isActive)
    await handleSubmit(async (data) => {
      const response = await updateTeacher(data)
      if (!response.success) {
        setMessage({
          show: true,
          message: response.error as string
        })
        return
      }
      setMessage({
        show: true,
        message: 'Profesor actualizado correctamente'
      })
      setTeacherInfo({
        shortname: '',
        name: '',
        paterno: '',
        materno: '',
        isActive: false
      })
      setBlocked({
        shortname: false,
        else: true
      })
    })()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Modificar profesor</ModalHeader>
            <ModalBody>
              {message.show && (
                <div className="flex items-center justify-between rounded bg-main-red p-2 text-white">
                  <p>{message.message}</p>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      setMessage({ show: false, message: '' })
                    }}
                  >
                    <FiX />
                  </Button>
                </div>
              )}
              <form onSubmit={onSearch} className="flex flex-col gap-2">
                <Input
                  label="Shortname"
                  isDisabled={blocked.shortname}
                  {...shortnameRegister('shortname')}
                />
                <Button variant="flat" type="submit">
                  Buscar
                </Button>
              </form>
              <Divider />
              <Input
                label="Nombre(s)"
                isDisabled={blocked.else}
                value={teacherInfo.name}
                onValueChange={(value) =>
                  setTeacherInfo({
                    ...teacherInfo,
                    name: value
                  })
                }
                {...register('name')}
                isInvalid={errors.name !== undefined}
                errorMessage={errors.name?.message}
              />
              <Input
                label="Apellido paterno"
                isDisabled={blocked.else}
                value={teacherInfo.paterno}
                onValueChange={(value) =>
                  setTeacherInfo({
                    ...teacherInfo,
                    paterno: value
                  })
                }
                {...register('paterno')}
                isInvalid={errors.paterno !== undefined}
                errorMessage={errors.paterno?.message}
              />
              <Input
                label="Apellido materno"
                isDisabled={blocked.else}
                value={teacherInfo.materno}
                onValueChange={(value) =>
                  setTeacherInfo({
                    ...teacherInfo,
                    materno: value
                  })
                }
                {...register('materno')}
                isInvalid={errors.materno !== undefined}
                errorMessage={errors.materno?.message}
              />
              <Checkbox
                isDisabled={blocked.else}
                isSelected={teacherInfo.isActive}
                onValueChange={(value) =>
                  setTeacherInfo({
                    ...teacherInfo,
                    isActive: value
                  })
                }
              >
                ¿Está activo?
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  setMessage({
                    show: false,
                    message: ''
                  })
                  shortnameReset()
                  setTeacherInfo({
                    shortname: '',
                    name: '',
                    paterno: '',
                    materno: '',
                    isActive: false
                  })
                  setBlocked({
                    shortname: false,
                    else: true
                  })
                  onClose()
                }}
                variant="ghost"
              >
                Cancelar
              </Button>
              <Button color="primary" onPress={onSubmit}>
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
