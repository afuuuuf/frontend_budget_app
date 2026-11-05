import { apiClient } from "@/libs/apiClient";
import { API_PATHS } from "@/constants/api";
import { getSavingsRate, withShares } from "@/utils/mathUtil";
import { dashboardRaw } from "@/services/mocks/dashboardRaw";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const num = (value) => Number(value) || 0;

// The only place that knows the backend's response shape. Everything past here uses the
// view model it returns, so a backend change means editing this one function.
export function toDashboard(raw) {
  const income = num(raw.income);
  const expenses = num(raw.expenses);
  const savingsTransfers = num(raw.savings_transfers);

  const spending = (raw.category_spending ?? [])
    .map((item) => ({ name: item.category, amount: num(item.amount) }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  // Prefer the sum of categories so the donut and its legend always agree.
  const totalSpent =
    spending.reduce((sum, item) => sum + item.amount, 0) || expenses;

  return {
    income,
    expenses,
    savingsTransfers,
    // Savings transfers leave the balance but are not expenses.
    balance: income - expenses - savingsTransfers,
    savingsRate: getSavingsRate(income, expenses),
    unspent: income - expenses,
    budgets: (raw.budgets ?? []).map((b) => ({
      id: b.id,
      category: b.category,
      spent: num(b.spent),
      limit: num(b.limit),
    })),
    categorySpending: withShares(spending, totalSpent),
    totalSpent,
    recentTransactions: (raw.recent_transactions ?? []).map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      date: t.date,
      // Expenses are negative, income positive.
      amount:
        t.type === "income"
          ? Math.abs(num(t.amount))
          : -Math.abs(num(t.amount)),
    })),
    savings: {
      totalSaved: num(raw.savings?.total_saved),
      goalCount: num(raw.savings?.goal_count),
      addedThisPeriod: num(raw.savings?.added_this_period),
    },
  };
}

export const dashboardService = {
  async getDashboard({ year, month }) {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return toDashboard(dashboardRaw);
    }
    const { data } = await apiClient.get(API_PATHS.dashboard, {
      params: { year, month },
    });
    return toDashboard(data);
  },
};
