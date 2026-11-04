import client from "./apiClient";

export const createTransaction = (txn) => client.post("/transactions", txn).then((res) => res.data);

export const updateTransaction = (id, data) =>
    client.put(`/transactions/${id}`, data).then((res) => res.data);

export const listTransactions = () => client.get("/transactions").then((res) => res.data);

export const getTransaction = (id) => client.get(`/transactions/${id}`).then((res) => res.data);

export const deleteTransaction = (id) =>
    client.delete(`/transactions/${id}`).then((res) => res.data);
