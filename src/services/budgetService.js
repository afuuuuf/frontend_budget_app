import { apiClient } from "@/libs/apiClient";
import { API_PATHS } from "@/constants/api";
import { budgetsStore } from "@/services/mocks/budgetsRaw";
import { fromApiMoney, toApiMoney } from "@/utils/currencyUtil";
import { getMonthEnum } from "@/utils/timeUtil";
import { formatEnumLabel } from "@/utils/enumUtil";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// The only place that knows the shape of a budget from the API (assumed: an array of
// { category, amount, spent, remaining }, with money in the API's unit).
// A budget is identified by its category within a month, so the category doubles as the id.
export function toBudgets(raw) {
  const list = Array.isArray(raw) ? raw : (raw?.budgets ?? []);
  return list.map((b) => ({
    id: b.category,
    category: b.category,
    limit: fromApiMoney(b.amount),
    spent: fromApiMoney(b.spent),
  }));
}

function mockError(status, detail) {
  const error = new Error(detail);
  error.response = { status, data: { detail } };
  return error;
}

export const budgetService = {
  async getBudgets({ year, month }) {
    if (USE_MOCKS) {
      await wait();
      return toBudgets(budgetsStore);
    }
    const { data } = await apiClient.get(API_PATHS.budgets, {
      params: { year, month: getMonthEnum(month) },
    });
    return toBudgets(data);
  },

  // Creates the budget for the current month. `amount` is in dollars.
  async createBudget({ category, amount }) {
    if (USE_MOCKS) {
      await wait();
      if (budgetsStore.some((b) => b.category === category)) {
        throw mockError(
          409,
          `You already have a ${formatEnumLabel(category)} budget this month.`,
        );
      }
      budgetsStore.push({
        category,
        amount: toApiMoney(amount),
        spent: 0,
      });
      return null;
    }
    const { data } = await apiClient.post(API_PATHS.budgets, {
      category,
      amount: toApiMoney(amount),
    });
    return data;
  },

  // Only the amount can change. The budget is addressed by category + month in the query.
  async updateBudget({ category, year, month, amount }) {
    if (USE_MOCKS) {
      await wait();
      const budget = budgetsStore.find((b) => b.category === category);
      if (!budget) throw mockError(404, "Budget not found.");
      budget.amount = toApiMoney(amount);
      return null;
    }
    const { data } = await apiClient.put(
      API_PATHS.budgets,
      { amount: toApiMoney(amount) },
      { params: { category, year, month: getMonthEnum(month) } },
    );
    return data;
  },
};
