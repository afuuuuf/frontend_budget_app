// A budget turns amber once this share of the limit is used, and terracotta past 100%.
const WARNING_THRESHOLD = 0.9

export function getBudgetStatus({ spent, limit }) {
  const ratio = limit > 0 ? spent / limit : 0
  return {
    ratio,
    percent: Math.round(ratio * 100),
    remaining: limit - spent,
    status: ratio > 1 ? 'over' : ratio >= WARNING_THRESHOLD ? 'warning' : 'ok',
  }
}

// (income − expenses) ÷ income, as a whole percent. null when there is no income.
export function getSavingsRate(income, expenses) {
  if (!(income > 0)) return null
  return Math.round(((income - expenses) / income) * 100)
}

// Adds each item's share of the total, to one decimal place.
export function withShares(items, total) {
  return items.map((item) => ({
    ...item,
    share: total > 0 ? Math.round((item.amount / total) * 1000) / 10 : 0,
  }))
}
