import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000/dashboard",
});

export const getBudgets = (txn) => client.get("/", txn).then(res => res.data);

export const getExpenses = () => client.get("/").then(res => res.data);

export const getBalance = (id) => client.get(`/${id}`).then(res => res.data);

export const getSavings = (id) => client.get(`/${id}`).then(res => res.data);