import client from "./apiClient";

export const getBudgets = (txn) => client.get("/dashboard", txn).then((res) => res.data);

export const getExpenses = () => client.get("/dashboard").then((res) => res.data);

export const getBalance = (id) => client.get(`/dashboard/${id}`).then((res) => res.data);

export const getSavings = (id) => client.get(`/dashboard/${id}`).then((res) => res.data);
