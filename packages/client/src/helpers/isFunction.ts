export default function isFuntion(fn: unknown): fn is (...args: any[]) => any {
  return typeof fn === 'function'
}
