// A sample of the response shape dashboardService expects from GET /v1/dashboard.
// It doubles as documentation: if your API differs, adapt toDashboard() in dashboardService.js.
// Amounts are plain numbers in major units (dollars), not cents.
export const dashboardRaw = {
  income: 5000,
  expenses: 2300,
  savings_transfers: 600,
  budgets: [
    { id: 1, category: 'Groceries', spent: 320, limit: 400 },
    { id: 2, category: 'Dining', spent: 180, limit: 150 },
  ],
  category_spending: [
    { category: 'Housing', amount: 1500 },
    { category: 'Groceries', amount: 320 },
    { category: 'Dining', amount: 180 },
    { category: 'Utilities', amount: 180 },
    { category: 'Transport', amount: 120 },
  ],
  recent_transactions: [
    { id: 11, title: 'Whole Foods', category: 'Groceries', date: '2026-11-04', amount: 120, type: 'expense' },
    { id: 10, title: 'Lunch at Juniper', category: 'Dining', date: '2026-11-04', amount: 45, type: 'expense' },
    { id: 9, title: 'Design project', category: 'Freelance', date: '2026-11-03', amount: 500, type: 'income' },
  ],
  savings: { total_saved: 6000, goal_count: 2, added_this_period: 600 },
}
