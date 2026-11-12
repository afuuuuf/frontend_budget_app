import { API_MONEY_IN_CENTS } from "@/constants/app";

// In-memory stand-in for GET/POST/PUT /v1/budgets while VITE_USE_MOCKS=true.
// Values are written in dollars and converted to whatever unit the API uses.
const api = (amount) => (API_MONEY_IN_CENTS ? amount * 100 : amount);

export const budgetsStore = [
  { category: "HOUSING", amount: api(1500), spent: api(1500) },
  { category: "GROCERIES", amount: api(400), spent: api(320) },
  { category: "DINING", amount: api(150), spent: api(180) },
  { category: "TRANSPORT", amount: api(200), spent: api(120) },
  { category: "UTILITIES", amount: api(200), spent: api(180) },
];
