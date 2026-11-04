import client from "./apiClient";

export const createBudget = (budget) => client.post("/budgets", budget).then((res) => res.data);

export const updateBudget = (budgetType, month, amount) =>
    client.put("/budgets", amount, { params: { budgetType, month } }).then((res) => res.data);

export const getBudget = (budgetType, month) =>
    client.get("/budgets", { params: { budgetType, month } }).then((res) => res.data);
