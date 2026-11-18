export const queryKeys = {
  dashboard: (year, month) => ["dashboard", year, month],
  dashboardAll: ["dashboard"],
  budgets: (year, month) => ["budgets", year, month],
  budgetsAll: ["budgets"],
  // The list holds every transaction; the month is picked on the client (see useTransactions).
  transactions: ["transactions", "list"],
  transaction: (id) => ["transactions", "detail", id],
  transactionsAll: ["transactions"],
  savingsGoals: ["savings", "goals"],
  savingsGoal: (id) => ["savings", "goal", id],
  contributions: (goalId) => ["savings", "contributions", goalId],
  savingsAll: ["savings"],
};
