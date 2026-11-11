import { API_MONEY_IN_CENTS } from "@/constants/app";
import { TRANSACTION_FLOW } from "@/enums/transactionFlow";

// Sample response in the shape GET /v1/dashboard returns (see toDashboard in dashboardService.js).
// recentTransactions, savings and savingsTransfers are optional extras the endpoint
// doesn't send yet; the dashboard hides the cards it has no data for.
// api() writes amounts in dollars and converts them to whatever unit the API uses.
const api = (amount) => (API_MONEY_IN_CENTS ? amount * 100 : amount);

export const dashboardRaw = {
  totalIncome: api(5000),
  totalExpenses: api(2300),
  currentBalance: api(2100),
  netSavingsRate: 54,
  savingsTransfers: api(600),
  budgetOverview: [
    { category: "FOOD", amount: api(400), spent: api(320), remaining: api(80) },
    {
      category: "ENTERTAINMENT",
      amount: api(150),
      spent: api(180),
      remaining: api(-30),
    },
  ],
  categorySpending: [
    { category: "HOUSING", amount: api(1500) },
    { category: "FOOD", amount: api(320) },
    { category: "ENTERTAINMENT", amount: api(180) },
    { category: "UTILITIES", amount: api(180) },
    { category: "TRANSPORT", amount: api(120) },
  ],
  recentTransactions: [
    {
      id: 11,
      title: "Whole Foods",
      category: "FOOD",
      date: "2026-11-04",
      amount: api(120),
      type: TRANSACTION_FLOW.EXPENSE,
    },
    {
      id: 10,
      title: "Lunch at Juniper",
      category: "FOOD",
      date: "2026-11-04",
      amount: api(45),
      type: TRANSACTION_FLOW.EXPENSE,
    },
    {
      id: 9,
      title: "Design project",
      category: "FREELANCE",
      date: "2026-11-03",
      amount: api(500),
      type: TRANSACTION_FLOW.INCOME,
    },
  ],
  savings: { totalSaved: api(6000), goalCount: 2, addedThisMonth: api(600) },
};
