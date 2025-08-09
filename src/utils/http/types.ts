export interface Result<T = any> {
  code: number
  result: T
  message?: string
}
