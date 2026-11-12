import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/constants/app";

const formatters = new Map();

function getFormatter(currency, decimals) {
  const key = `${currency}:${decimals}`;
  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return formatters.get(key);
}

/**
 * decimals: 2 (default) | 0 | 'auto' (no decimals for whole amounts, otherwise 2)
 * signed:   show a leading + or − (true minus sign), like the designs do for income/expense.
 */
export function formatCurrency(
  amount,
  { currency = DEFAULT_CURRENCY, decimals = 2, signed = false } = {},
) {
  const n = Number(amount) || 0;
  const digits = decimals === "auto" ? (Number.isInteger(n) ? 0 : 2) : decimals;
  const text = getFormatter(currency, digits).format(Math.abs(n));

  if (n < 0) return `−${text}`;
  if (signed && n > 0) return `+${text}`;
  return text;
}

// Dollars (what people type and read) → the unit the API expects.
export const toApiMoney = (amount) =>
  API_MONEY_IN_CENTS ? Math.round(amount * 100) : amount;

// The unit the API sends → dollars.
export const fromApiMoney = (value) => {
  const n = Number(value) || 0;
  return API_MONEY_IN_CENTS ? n / 100 : n;
};

// "$" for USD, "RM" for MYR, and so on.
export function getCurrencySymbol(currency = DEFAULT_CURRENCY) {
  return (
    new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? currency
  );
}
