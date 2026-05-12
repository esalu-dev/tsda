'use client'

import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/modal'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { searchUsers, banUser, unbanUser } from '@/actions/adminBans'
import { FiSearch, FiShield, FiXCircle } from 'react-icons/fi'

type UserSearchResult = {
  id: string
  email: string
  username: string
  numControl: string
  banned: boolean
  bannings: { reason: string; duration: Date | null } | null
}

export function BanUserButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        className="mt-2 w-full justify-start bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500 sm:w-auto"
        onPress={onOpen}
        startContent={<FiShield />}
      >
        Gestionar Baneos
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => <BanUserForm onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  )
}

function BanUserForm({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UserSearchResult[]>([])
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(
    null
  )

  // Ban form state
  const [reason, setReason] = useState('')
  const [duration, setDuration] = useState('0') // 0 = indefinido
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const users = await searchUsers(query)
      setResults(users as UserSearchResult[])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBan = async () => {
    if (!selectedUser || !reason) return
    setIsLoading(true)
    try {
      await banUser(selectedUser.id, reason, parseInt(duration))
      // Refetch to see updated state
      handleSearch()
      setSelectedUser(null)
      setReason('')
      setDuration('0')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnban = async (user: UserSearchResult) => {
    setIsLoading(true)
    try {
      await unbanUser(user.id)
      handleSearch()
      if (selectedUser?.id === user.id) {
        setSelectedUser(null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Gestionar Baneos de Usuarios
      </ModalHeader>
      <ModalBody>
        <div className="flex gap-2">
          <Input
            placeholder="Buscar por email, usuario o no. de control..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            startContent={<FiSearch className="text-default-400" />}
          />
          <Button onPress={handleSearch} isLoading={isLoading}>
            Buscar
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-sm font-semibold">Resultados:</p>
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border p-3 dark:border-gray-800"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-xs text-gray-500">
                    {user.email} | {user.numControl}
                  </p>
                  {user.banned && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      Baneado: {user.bannings?.reason}
                    </p>
                  )}
                </div>

                {user.banned ? (
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    onPress={() => handleUnban(user)}
                    isLoading={isLoading}
                  >
                    Desbanear
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => setSelectedUser(user)}
                  >
                    Banear
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-red-800 dark:text-red-400">
                Banear a {selectedUser.username}
              </h3>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={() => setSelectedUser(null)}
              >
                <FiXCircle className="text-xl" />
              </Button>
            </div>

            <Textarea
              label="Motivo del ban"
              placeholder="Ej. Lenguaje inapropiado en reseñas..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mb-4"
              isRequired
            />

            <Select
              label="Duración"
              selectedKeys={[duration]}
              onChange={(e) => setDuration(e.target.value)}
              className="mb-4"
            >
              <SelectItem key="0">Permanente</SelectItem>
              <SelectItem key="1">1 Día</SelectItem>
              <SelectItem key="3">3 Días</SelectItem>
              <SelectItem key="7">1 Semana</SelectItem>
              <SelectItem key="30">1 Mes</SelectItem>
            </Select>

            <Button
              color="danger"
              className="w-full"
              onPress={handleBan}
              isLoading={isLoading}
              isDisabled={!reason}
            >
              Confirmar Ban
            </Button>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" variant="light" onPress={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </>
  )
}
