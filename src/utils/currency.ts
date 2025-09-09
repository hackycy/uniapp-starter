export function formatAmount(
  amount: number | string | null | undefined,
  {
    min = 2,
    max = 2,
    prefix = '',
    suffix = '',
  }: {
    min?: number
    max?: number
    prefix?: string
    suffix?: string
  } = {},
): string {
  if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
    return '-'
  }

  const numAmount = Number(amount)

  // 处理小数位
  let [integer, decimal = ''] = numAmount.toFixed(max).split('.')

  // 添加千分位分隔符
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 处理小数部分的最小长度
  if (min > 0) {
    decimal = decimal.padEnd(min, '0')
  }

  return `${prefix}${integer}${decimal ? `.${decimal}` : ''}${suffix}`
}
