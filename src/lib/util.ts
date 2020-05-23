/**
 * Converts 1234 to "1,234"
 *
 * @param num The number to convert
 */
export function getThousandSep(num: number): string {
  return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/, '$1,');
}
