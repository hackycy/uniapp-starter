export function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}
