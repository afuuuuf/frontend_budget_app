import { formatEnumLabel } from "@/utils/enumUtil";
import { isInMonth, toDate } from "@/utils/timeUtil";

const byNewestFirst = (a, b) => toDate(b.createdAt) - toDate(a.createdAt);

// The month's transactions, newest first.
export function getMonthTransactions(transactions, year, month) {
  return transactions
    .filter((t) => isInMonth(t.createdAt, year, month))
    .sort(byNewestFirst);
}

// Amounts are signed (expenses negative), so the sign decides which total they join.
// Both totals come back positive.
export function getTransactionTotals(transactions) {
  return transactions.reduce(
    (totals, { amount }) => {
      if (amount > 0) totals.income += amount;
      else totals.expenses += Math.abs(amount);
      return totals;
    },
    { income: 0, expenses: 0 },
  );
}

// Applies the list's filters. Search matches the title or the category name, ignoring case.
export function filterTransactions(transactions, { search, category, flow }) {
  const query = search.trim().toLowerCase();

  return transactions.filter(
    (t) =>
      (!category || t.category === category) &&
      (!flow || t.flow === flow) &&
      (!query ||
        t.title.toLowerCase().includes(query) ||
        formatEnumLabel(t.category).toLowerCase().includes(query)),
  );
}
