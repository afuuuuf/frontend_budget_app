import { apiClient } from "@/libs/apiClient";
import { API_PATHS } from "@/constants/api";
import { API_MONEY_IN_CENTS } from "@/constants/app";
import { TRANSACTION_FLOW } from "@/enums/transactionFlow";
import { withShares } from "@/utils/mathUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { getMonthEnum } from "@/utils/timeUtil";
import { dashboardRaw } from "@/services/mocks/dashboardRaw";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const num = (value) => Number(value) || 0;
const money = (value) => (API_MONEY_IN_CENTS ? num(value) / 100 : num(value));

// The only place that knows the backend's response shape. Everything past here uses the
// view model it returns, so a backend change means editing this one function.
export function toDashboard(raw) {
  const income = money(raw.totalIncome);
  const expenses = money(raw.totalExpenses);

  const spending = (raw.categorySpending ?? [])
    .map((item) => ({
      name: formatEnumLabel(item.category),
      amount: money(item.amount),
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  // Prefer the sum of categories so the donut and its legend always agree.
  const totalSpent =
    spending.reduce((sum, item) => sum + item.amount, 0) || expenses;

  const rate = Number(raw.netSavingsRate);

  return {
    income,
    expenses,
    // Optional: money moved to savings goals this month. Not in the API yet.
    savingsTransfers: money(raw.savingsTransfers),
    balance: money(raw.currentBalance),
    // The API sends a percentage like 24.53; show it whole, or "—" when there is no income.
    savingsRate: income > 0 && Number.isFinite(rate) ? Math.round(rate) : null,
    unspent: income - expenses,
    budgets: (raw.budgetOverview ?? []).map((b) => ({
      id: b.category, // one budget per category; the API sends no budget id here
      category: formatEnumLabel(b.category),
      spent: money(b.spent),
      limit: money(b.amount),
    })),
    categorySpending: withShares(spending, totalSpent),
    totalSpent,
    // Optional: null when the API doesn't send them yet, and the page hides those cards.
    recentTransactions: raw.recentTransactions
      ? raw.recentTransactions.map((t) => ({
          id: t.id,
          title: t.title,
          category: formatEnumLabel(t.category),
          date: t.date,
          // Expenses are negative, income positive.
          amount:
            t.type === TRANSACTION_FLOW.INCOME
              ? Math.abs(money(t.amount))
              : -Math.abs(money(t.amount)),
        }))
      : null,
    savings: raw.savings
      ? {
          totalSaved: money(raw.savings.totalSaved),
          goalCount: num(raw.savings.goalCount),
          addedThisPeriod: money(raw.savings.addedThisMonth),
        }
      : null,
  };
}

export const dashboardService = {
  async getDashboard({ year, month }) {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return toDashboard(dashboardRaw);
    }
    const { data } = await apiClient.get(API_PATHS.dashboard, {
      params: { year, month: getMonthEnum(month) },
    });
    return toDashboard(data);
  },
};
