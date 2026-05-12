import { careers } from '@/schemas/careers'

/**
 * Retrieves the career name corresponding to a given value.
 *
 * @param {string} value - The value associated with the desired career name.
 * @return {string | undefined} The name of the career if found, otherwise undefined.
 */
export function getCareerFormattedName(value: string): string | undefined {
  const career = careers.find((career) => career.value === value)
  return career ? career.formattedName : undefined
}

/**
 * Retrieves the career value corresponding to a given filter value.
 *
 * @param {string | undefined} value - The filter value associated with the desired career name.
 * @return {string | undefined} The value of the career if found, otherwise undefined.
 */
export function getCareerValueFromFilter(value?: string): string | undefined {
  const career = careers.find((career) => career.filter === value)
  return career ? career.value : undefined
}
