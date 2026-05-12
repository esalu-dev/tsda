import { prisma } from '@/lib/prisma'

/**
 * Asynchronously fetches the profile of a user based on their username.
 * Uses Prisma ORM to find and return a unique user record from the database.
 *
 * @param {string} username - The unique username of the user whose profile needs to be fetched.
 * @returns {Promise<Object|null>} A promise that resolves to the user profile object if found, otherwise null.
 */
export const fetchProfile = async (username: string) => {
  console.log('Fetching profile for username:', username)
  return await prisma.user.findUnique({
    where: {
      username
    }
  })
}
