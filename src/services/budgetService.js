import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000/budgets",
});

export const createBudget = (budget) => client.post("", budget).then((res) => res.data);

export const updateBudget = (budgetType, month, amount) =>
    client.put("", amount, { params: { budgetType, month } }).then((res) => res.data);

export const getBudget = (budgetType, month) =>
    client.get("", { params: { budgetType, month } }).then((res) => res.data);
