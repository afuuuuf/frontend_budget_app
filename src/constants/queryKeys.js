export const queryKeys = {
  dashboard: (year, month) => ["dashboard", year, month],
  dashboardAll: ["dashboard"],
  budgets: (year, month) => ["budgets", year, month],
  budgetsAll: ["budgets"],
  transactions: ["transactions", "list"],
  transaction: (id) => ["transactions", "detail", id],
  transactionsAll: ["transactions"],
};
