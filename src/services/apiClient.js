import axios from "axios";

const DEFAULT_BASE_URL = "/api";

export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_BASE_URL;

const client = axios.create({
    baseURL: API_BASE_URL,
});

export default client;
