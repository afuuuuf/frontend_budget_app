import { useState } from "react";
import { createTransaction } from "../../routers/transaction_routes.js";

export default function TransactionForm({ onCreated }) {
    const [form, setForm] = useState({ amount: "", description: "", category: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTransaction({ ...form, amount: parseFloat(form.amount) });
            setForm({ amount: "", description: "", category: "" });
            onCreated?.();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />\
            <button onClick={handleSubmit}>Add Transaction</button>
            {error && <p>Error: {error}</p>}
        </div>
    );
}