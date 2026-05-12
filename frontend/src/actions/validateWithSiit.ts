'use server'

export async function validateWithSiit(
  numControl: string,
  pin: string
): Promise<{
  success: boolean
  career: string
  error?: string
}> {
  const res = await fetch(
    'http://localhost:3001/api/services/validate-student',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numControl,
        pin
      })
    }
  )
  const data = await res.json()
  return data
}
