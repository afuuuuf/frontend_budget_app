import { useState } from 'react';
import toast from 'react-hot-toast';
import { transactionCategoryOptions } from '../../enums/transactionCategory';
import { transactionFlowOptions } from '../../enums/transactionFlow';
import { buildTransactionPayload } from '../../payloads/transactionPayload';
import { createTransaction } from '../../services/transactionService';
import './TransactionForm.css';

function TransactionForm({ onCreated, onClose }) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        transactionFlow: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTransaction = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const payload = buildTransactionPayload(formData);

            await createTransaction(payload);

            toast.success('Transaction created successfully');

            setFormData({
                description: '',
                amount: '',
                category: '',
                transactionFlow: '',
            });

            onCreated?.();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Failed to create transaction');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-x" onClick={onClose}>×</button>

                <div className="modal-icon">
                    <div className="icon-square large"></div>
                    <div className="icon-square small"></div>
                    <span className="dot pink"></span>
                    <span className="dot purple"></span>
                </div>

                <h3>Add Transaction</h3>
                <p className="modal-subtitle">
                    Enter the transaction information below.
                </p>

                <form className="details-form" onSubmit={addTransaction}>
                    <div className="floating-field">
                        <input
                            type="text"
                            name="description"
                            placeholder=" "
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <label>Description</label>
                    </div>

                    <div className="floating-field">
                        <input
                            type="number"
                            name="amount"
                            placeholder=" "
                            value={formData.amount}
                            onChange={handleChange}
                            step="0.01"
                        />
                        <label>Amount</label>
                    </div>

                    <div className="floating-field select-field">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select category
                            </option>

                            {transactionCategoryOptions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <label>Category</label>
                    </div>
                    
                    <div className="floating-field select-field">
                        <select
                            name="transactionFlow"
                            value={formData.transactionFlow}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select type of transaction
                            </option>

                            {transactionFlowOptions.map((transactionFlow) => (
                                <option key={transactionFlow} value={transactionFlow}>
                                    {transactionFlow}
                                </option>
                            ))}
                        </select>
                        <label>Transaction Flow</label>
                    </div>

                    <button type="submit" className="send-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Transaction'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TransactionForm;
