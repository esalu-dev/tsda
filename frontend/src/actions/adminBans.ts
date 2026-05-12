'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function checkAdminLevel2() {
  const session = await auth()
  if (!session?.user?.id) return false

  const adminProfile = await prisma.administrator.findUnique({
    where: { userId: session.user.id }
  })

  return adminProfile?.nivelAdmin === 2
}

export async function searchUsers(query: string) {
  // const isAdmin = await checkAdminLevel2()
  // if (!isAdmin) throw new Error('Unauthorized')

  if (!query || query.length < 2) return []
  const session = await auth()
  console.log(session)
  if (!session?.user.accessToken) throw new Error('Unauthorized')

  const data = await fetch(
    `${process.env.BACKEND_AUTH_URL}/api/user/get-users-by-conflict-keys?query=${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`
      }
    }
  )

  if (!data.ok) {
    const error = await data.json()
    throw new Error(error.message || 'Failed to search users')
  }
  const users = await data.json()

  return users
}

export async function banUser(
  userId: string,
  reason: string,
  durationInDays?: number
) {
  // const isAdmin = await checkAdminLevel2()
  // if (!isAdmin) throw new Error('Unauthorized')

  // Calculate duration if provided
  let durationDate: Date | null
  if (durationInDays && durationInDays > 0) {
    durationDate = new Date()
    durationDate.setDate(durationDate.getDate() + durationInDays)
  }

  const session = await auth()
  if (!session?.user.accessToken) throw new Error('Unauthorized')

  const response = await fetch(
    `${process.env.BACKEND_AUTH_URL}/api/user/ban-user`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`
      },
      body: JSON.stringify({
        userId,
        reason,
        duration: durationInDays
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to ban user')
  }

  revalidatePath('/app/settings')
  return { success: true }
}

export async function unbanUser(userId: string) {
  // const isAdmin = await checkAdminLevel2()
  // if (!isAdmin) throw new Error('Unauthorized')

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { banned: false }
    }),
    prisma.bannings.delete({
      where: { userId }
    })
  ])

  revalidatePath('/app/settings')
  return { success: true }
}
