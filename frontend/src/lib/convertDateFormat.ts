/**
 * Converts a date string from MM/DD/YYYY format to YYYY-MM-DD format.
 *
 * @param dateString - The date string in MM/DD/YYYY format.
 * @returns The date string in YYYY-MM-DD format.
 */
export function convertDateFormat(dateString: string): string {
  const [month, day, year] = dateString.split('/')

  return `${year}-${month}-${day}`
}
