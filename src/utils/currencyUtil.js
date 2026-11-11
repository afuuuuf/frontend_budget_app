import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '@/constants/app'

const formatters = new Map()

function getFormatter(currency, decimals) {
  const key = `${currency}:${decimals}`
  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    )
  }
  return formatters.get(key)
}

/**
 * decimals: 2 (default) | 0 | 'auto' (no decimals for whole amounts, otherwise 2)
 * signed:   show a leading + or − (true minus sign), like the designs do for income/expense.
 */
export function formatCurrency(
  amount,
  { currency = DEFAULT_CURRENCY, decimals = 2, signed = false } = {},
) {
  const n = Number(amount) || 0
  const digits = decimals === 'auto' ? (Number.isInteger(n) ? 0 : 2) : decimals
  const text = getFormatter(currency, digits).format(Math.abs(n))

  if (n < 0) return `−${text}`
  if (signed && n > 0) return `+${text}`
  return text
}
