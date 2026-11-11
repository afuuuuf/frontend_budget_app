// A budget turns amber once this share of the limit is used, and terracotta past 100%.
const WARNING_THRESHOLD = 0.9;

export function getBudgetStatus({ spent, limit }) {
  const ratio = limit > 0 ? spent / limit : 0;
  return {
    ratio,
    percent: Math.round(ratio * 100),
    remaining: limit - spent,
    status: ratio > 1 ? "over" : ratio >= WARNING_THRESHOLD ? "warning" : "ok",
  };
}

// Adds each item's share of the total, to one decimal place.
export function withShares(items, total) {
  return items.map((item) => ({
    ...item,
    share: total > 0 ? Math.round((item.amount / total) * 1000) / 10 : 0,
  }));
}
