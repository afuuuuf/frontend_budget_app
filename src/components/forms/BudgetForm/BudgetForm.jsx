import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBudget, updateBudget } from '../../services/budgetService';
import './BudgetForm.css';

function BudgetForm({ budgetType, month, existingAmount, onCreated, onClose }) {
    const [amount, setAmount] = useState(existingAmount != null ? String(existingAmount) : '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsed = Number(amount);

        if (!amount || Number.isNaN(parsed)) {
            toast.error('Please enter a valid amount');
            return;
        }

        try {
            setIsSubmitting(true);

            if (existingAmount != null) {
                await updateBudget(budgetType, month, { amount: parsed });
                toast.success(`${budgetType} budget updated successfully`);
            } else {
                await createBudget({ budgetType, amount: parsed });
                toast.success(`${budgetType} budget created successfully`);
            }

            onCreated?.();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Failed to save budget');
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

                <h3>{existingAmount != null ? 'Update Budget' : 'Set Budget'}</h3>
                <p className="modal-subtitle">
                    {existingAmount != null ? 'Update the monthly amount below.' : `Set the ${budgetType} budget for ${month}.`}
                </p>

                <form className="details-form" onSubmit={handleSubmit}>
                    <div className="floating-field">
                        <input
                            type="number"
                            name="amount"
                            placeholder=" "
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                            autoFocus
                        />
                        <label>Amount</label>
                    </div>

                    <button type="submit" className="send-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : existingAmount != null ? 'Update' : 'Add Budget'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BudgetForm;
