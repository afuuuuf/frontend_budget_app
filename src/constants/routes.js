export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  budgets: "/budgets",
  budgetNew: "/budgets/new",
  budgetEditPattern: "/budgets/:category/edit",
  budgetEdit: (category) => `/budgets/${category}/edit`,
  transactions: "/transactions",
  transactionNew: "/transactions/new",
  transactionDetailPattern: "/transactions/:id",
  transactionDetail: (id) => `/transactions/${id}`,
  savings: "/savings",
};
