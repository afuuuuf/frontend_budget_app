export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  budgets: "/budgets",
  budgetNew: "/budgets/new",
  budgetEditPattern: "/budgets/:category/edit",
  budgetEdit: (category) => `/budgets/${category}/edit`,
  transactions: "/transactions",
  savings: "/savings",
};
