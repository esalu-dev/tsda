'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@heroui/modal'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'
import {
  fetchSiitTeachersPreview,
  TeacherPreview
} from '@/actions/fetchSiitTeachersPreview'
import { saveSiitTeachers } from '@/actions/saveSiitTeachers'
import { saveAdminPin } from '@/actions/saveAdminPin'
import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'

export function SiitSyncModal({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [needsPin, setNeedsPin] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [teachers, setTeachers] = useState<TeacherPreview[]>([])

  // New states for the requested features
  const [showExisting, setShowExisting] = useState(true)
  const [selectedTeachers, setSelectedTeachers] = useState<Set<number>>(
    new Set()
  )

  const handleEdit = (
    index: number,
    field: 'nombre' | 'apellidoPaterno' | 'apellidoMaterno' | 'shortname',
    value: string
  ) => {
    const updated = [...teachers]
    updated[index][field] = value
    setTeachers(updated)
  }

  const loadTeachers = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    setNeedsPin(false)
    setTeachers([])
    setSelectedTeachers(new Set())
    try {
      const result = await fetchSiitTeachersPreview()
      if (result.success && result.data) {
        setTeachers(result.data)
        // Auto-select all NEW teachers by default
        const newTeacherIndices = new Set<number>()
        result.data.forEach((t, idx) => {
          if (t.status === 'NEW') newTeacherIndices.add(idx)
        })
        setSelectedTeachers(newTeacherIndices)
      } else {
        if (result.error?.includes('PIN del SIIT')) {
          setNeedsPin(true)
        } else {
          setError(result.error || 'Error desconocido')
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || 'Error al conectar con el servidor')
      } else {
        setError('Error al conectar con el servidor')
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      loadTeachers()
    }
  }, [isOpen])

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    // Only save the ones that are NEW AND checked
    const newTeachers = teachers.filter(
      (t, index) => t.status === 'NEW' && selectedTeachers.has(index)
    )

    if (newTeachers.length === 0) {
      setError('No hay profesores nuevos seleccionados para guardar.')
      setLoading(false)
      return
    }

    const payload = newTeachers.map((t) => ({
      nombre: t.nombre,
      apellidoPaterno: t.apellidoPaterno,
      apellidoMaterno: t.apellidoMaterno,
      shortname: t.shortname
    }))

    const result = await saveSiitTeachers(payload)
    if (result.success) {
      setSuccess(
        `Guardado exitoso. Se agregaron ${result.added} nuevos profesores y se omitieron ${result.skipped} duplicados extra.`
      )
      loadTeachers() // Recargar para actualizar los estados
    } else {
      setError(result.error || 'Error al guardar')
      setLoading(false)
    }
  }

  const handleSavePin = async () => {
    if (!pinInput.trim()) {
      setError('Por favor, ingresa tu NIP del SIIT.')
      return
    }
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('pin', pinInput)
    const res = await saveAdminPin(formData)
    if (res.success) {
      setNeedsPin(false)
      loadTeachers() // Retry fetch
    } else {
      setError(res.error || 'Error al guardar el NIP')
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Sincronización de Profesores (SIIT)</ModalHeader>
            <ModalBody>
              {error && (
                <div className="flex items-center justify-between rounded bg-main-red p-3 text-white">
                  <p>{error}</p>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setError('')}
                  >
                    <FiX />
                  </Button>
                </div>
              )}
              {success && (
                <div className="flex items-center justify-between rounded bg-green-600 p-3 text-white">
                  <p>{success}</p>
                  <Button
                    isIconOnly
                    className="text-white"
                    variant="light"
                    onPress={() => setSuccess('')}
                  >
                    <FiX />
                  </Button>
                </div>
              )}

              {needsPin && !loading ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="w-full max-w-md space-y-4 text-left">
                    <p className="text-gray-600 dark:text-gray-300">
                      Para poder sincronizar los profesores, necesitamos
                      conectarnos al SIIT usando tu número de control y tu NIP
                      (contraseña del SIIT).
                    </p>
                    <Input
                      label="NIP del SIIT"
                      type="password"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      description="Esta información se guardará en tu perfil de administrador."
                    />
                    <Button
                      color="primary"
                      className="w-full"
                      onPress={handleSavePin}
                      isLoading={loading}
                    >
                      Guardar NIP y Continuar
                    </Button>
                  </div>
                </div>
              ) : null}

              {loading && teachers.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Conectando con SIIT y procesando datos...
                  </p>
                </div>
              ) : null}

              {!loading &&
                !needsPin &&
                teachers.length === 0 &&
                !error &&
                !success && (
                  <div className="p-8 text-center text-gray-500">
                    No se encontraron profesores cargados.
                  </div>
                )}

              {teachers.length > 0 && !needsPin && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Se encontraron {teachers.length} profesores. Los que{' '}
                      <span className="text-yellow-600">YA EXISTEN</span> están
                      deshabilitados. Selecciona y edita los{' '}
                      <span className="text-green-600">NUEVOS</span> antes de
                      guardarlos.
                    </div>
                    <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 dark:bg-gray-800">
                      <Checkbox
                        isSelected={showExisting}
                        onValueChange={setShowExisting}
                        size="sm"
                      >
                        Mostrar ya existentes
                      </Checkbox>
                    </div>
                  </div>

                  <div className="mb-1 hidden grid-cols-[auto_1fr_1fr_1fr_1fr_80px] gap-2 px-2 pl-6 text-sm font-bold text-gray-500 md:grid">
                    <div>Nombre(s)</div>
                    <div>A. Paterno</div>
                    <div>A. Materno</div>
                    <div>Shortname</div>
                    <div className="text-center">Estado</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {teachers.map((t, index) => {
                      if (!showExisting && t.status === 'EXISTS') return null

                      return (
                        <div
                          key={index}
                          className={`flex flex-col gap-2 rounded border p-3 md:p-2 ${t.status === 'EXISTS' ? 'border-gray-200 bg-gray-100 opacity-70 dark:border-gray-800 dark:bg-gray-800/50' : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-black'}`}
                        >
                          <div className="grid grid-cols-[auto_1fr] items-start gap-2 md:grid-cols-[auto_1fr_1fr_1fr_1fr_80px] md:items-center">
                            <div className="flex items-center self-center pl-1 pt-2 md:pt-0">
                              <Checkbox
                                isSelected={
                                  t.status === 'EXISTS'
                                    ? false
                                    : selectedTeachers.has(index)
                                }
                                onValueChange={(isSelected) => {
                                  const newSet = new Set(selectedTeachers)
                                  if (isSelected) {
                                    newSet.add(index)
                                  } else {
                                    newSet.delete(index)
                                  }
                                  setSelectedTeachers(newSet)
                                }}
                                isDisabled={t.status === 'EXISTS'}
                                size="md"
                              />
                            </div>
                            <div className="grid w-full grid-cols-1 gap-2 md:contents">
                              <Input
                                size="sm"
                                label={
                                  t.status === 'EXISTS' ? 'Nombre' : undefined
                                }
                                value={t.nombre}
                                onChange={(e) =>
                                  handleEdit(index, 'nombre', e.target.value)
                                }
                                isDisabled={t.status === 'EXISTS'}
                              />
                              <Input
                                size="sm"
                                label={
                                  t.status === 'EXISTS'
                                    ? 'A. Paterno'
                                    : undefined
                                }
                                value={t.apellidoPaterno}
                                onChange={(e) =>
                                  handleEdit(
                                    index,
                                    'apellidoPaterno',
                                    e.target.value
                                  )
                                }
                                isDisabled={t.status === 'EXISTS'}
                              />
                              <Input
                                size="sm"
                                label={
                                  t.status === 'EXISTS'
                                    ? 'A. Materno'
                                    : undefined
                                }
                                value={t.apellidoMaterno}
                                onChange={(e) =>
                                  handleEdit(
                                    index,
                                    'apellidoMaterno',
                                    e.target.value
                                  )
                                }
                                isDisabled={t.status === 'EXISTS'}
                              />
                              <Input
                                size="sm"
                                label={
                                  t.status === 'EXISTS'
                                    ? 'Shortname'
                                    : undefined
                                }
                                value={t.shortname}
                                onChange={(e) =>
                                  handleEdit(index, 'shortname', e.target.value)
                                }
                                isDisabled={t.status === 'EXISTS'}
                              />
                              <div className="mt-2 text-center text-xs font-bold md:mt-0 md:w-[80px]">
                                {t.status === 'EXISTS' ? (
                                  <span className="text-yellow-600 dark:text-yellow-500">
                                    YA EXISTE
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-green-600 dark:text-green-500 md:text-xs">
                                    NUEVO
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {t.warnings &&
                            t.warnings.length > 0 &&
                            t.status === 'NEW' && (
                              <div className="ml-1 mt-1 flex flex-col gap-1 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-500 md:ml-[36px]">
                                {t.warnings.map((w, i) => (
                                  <p
                                    key={i}
                                    className="flex items-start gap-1.5"
                                  >
                                    <span className="mt-[0.5px]">⚠️</span>
                                    <span>{w}</span>
                                  </p>
                                ))}
                              </div>
                            )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="ghost" isDisabled={loading}>
                Cerrar
              </Button>
              {!needsPin && (
                <Button
                  color="primary"
                  onPress={handleSave}
                  isLoading={loading}
                  isDisabled={
                    teachers.filter(
                      (t, idx) =>
                        t.status === 'NEW' && selectedTeachers.has(idx)
                    ).length === 0
                  }
                >
                  Guardar (
                  {
                    teachers.filter(
                      (t, idx) =>
                        t.status === 'NEW' && selectedTeachers.has(idx)
                    ).length
                  }
                  ) Nuevos
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
