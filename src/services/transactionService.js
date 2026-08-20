import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000/transactions",
});

export const createTransaction = (txn) => client.post("", txn).then(res => res.data);

export const updateTransaction = (id, data) => client.put(`/${id}`, data).then(res => res.data);

export const listTransactions = () => client.get().then(res => res.data);

export const getTransaction = (id) => client.get(`/${id}`).then(res => res.data);

export const deleteTransaction = (id) => client.delete(`/${id}`).then(res => res.data);