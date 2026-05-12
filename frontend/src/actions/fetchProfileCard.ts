'use server'

import { auth } from '@/auth'
import { fetchProfile } from '@/lib/fetchProfile'
import { getProfileStats } from '@/lib/getProfileStats'

export async function fetchProfileCard(username: string) {
  const session = await auth()
  if (!session) {
    return {
      success: false,
      error: 'Not authenticated'
    }
  }
  const user = await fetchProfile(username)
  if (!user) {
    return {
      success: false,
      error: 'User not found'
    }
  }
  const stats = await getProfileStats(username)
  return {
    success: true,
    data: {
      user,
      stats
    }
  }
}
