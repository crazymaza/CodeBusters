// TODO Реализация хелпера для примера, необходимо сделать более надежным
export default function queryStringify<T extends object>(data: T) {
  if (data) {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&')
  }

  return ''
}
