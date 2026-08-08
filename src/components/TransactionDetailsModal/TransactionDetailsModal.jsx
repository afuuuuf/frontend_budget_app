import { useState } from 'react';
import toast from 'react-hot-toast';

import { transactionCategoryOptions } from '../../enums';
import { buildTransactionPayload } from '../../payloads/transactionPayload';
import { updateTransaction } from '../../services/transactionService';

import './TransactionDetailsModal.css';

function TransactionDetailsModal({ transaction, onClose }) {

    const [formData, setFormData] = useState({
        description: transaction.description || '',
        amount: transaction.amount || '',
        category: transaction.category || '',
    });

    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const payload = buildTransactionPayload(formData);

            await updateTransaction(transaction.id, payload);

            toast.success('Transaction updated successfully');

            onClose();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Failed to update transaction');
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

                <h3>Transaction Details</h3>
                <p className="modal-subtitle">
                    View or update the transaction information below.
                </p>

                <form className="details-form">
                    <div className="floating-field">
                        <input
                            type="text"
                            placeholder=" "
                            defaultValue={transaction.description}
                        />
                        <label>Description</label>
                    </div>

                    <div className="floating-field">
                        <input
                            type="number"
                            placeholder=" "
                            defaultValue={transaction.amount.toFixed(2)}
                        />
                        <label>Amount</label>
                    </div>

                    <div className="floating-field select-field">
                        <select defaultValue={transaction.category || ''}>
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

                    <div className="floating-field">
                        <input
                            type="text"
                            placeholder=" "
                            defaultValue={new Date(transaction.created_at).toLocaleString()}
                        />
                        <label>Created</label>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="send-btn" disabled={isUpdating}>
                        {isUpdating ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TransactionDetailsModal;