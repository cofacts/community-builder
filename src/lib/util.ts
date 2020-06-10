/**
 * Converts 1234 to "1,234"
 *
 * @param num The number to convert
 */
export function getThousandSep(num: number): string {
  return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/, '$1,');
}

/**
 * @param enum
 * @returns type guard of the enum
 */
export function isSomeEnum<T>(e: T) {
  return (token: any): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T]);
}
