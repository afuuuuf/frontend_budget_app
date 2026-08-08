import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCar, FaQuestionCircle, FaShoppingBag, FaUtensils } from 'react-icons/fa';
import { getTransaction, listTransactions } from '../../services/transactionService';
import TransactionDetailsModal from '../TransactionDetailsModal/TransactionDetailsModal';
import './TransactionList.css';

const categoryStyles = {
    Food: { icon: <FaUtensils />, color: '#f97316' },
    Transport: { icon: <FaCar />, color: '#3b82f6' },
    Shopping: { icon: <FaShoppingBag />, color: '#ec4899' },
    default: { icon: <FaQuestionCircle />, color: '#9ca3af' },
};

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                setLoading(true);
                const data = await listTransactions();
                setTransactions(data);
            } catch (err) {
                setError(err.description);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    async function handleViewDetails(id) {
    try {
        const details = await getTransaction(id);
        setSelectedTransaction(details);
    } catch (err) {
        if (err.response?.status === 404) {
            toast.error(err.response?.data.detail);
        } else {
            toast.error("Something went wrong. Please try again.");
        }
    }
}

    if (loading) return <div className="transaction-table">Loading transactions...</div>;
    if (error) return <div className="transaction-table">Error: {error}</div>;
    if (transactions.length === 0) return <div className="transaction-table">No transactions yet.</div>;

    return (
        <div className="transaction-table">
            <div className="transaction-table-header">
                <span>Category</span>
                <span>Date</span>
                <span>Description</span>
                <span>Cost</span>
                <span>Details</span>
            </div>

            {transactions.map((tx) => {
                const style = categoryStyles[tx.category] || categoryStyles.default;

                return (
                    <div className="transaction-row" key={tx.id}>
                        <div className="transaction-icon" style={{ backgroundColor: style.color }}>
                            {style.icon}
                        </div>
                        <span className="transaction-date">{formatDate(tx.created_at)}</span>
                        <span className="transaction-description">{tx.description}</span>
                        <span className="transaction-cost">RM{tx.amount.toFixed(2)}</span>
                        <button
                            className="transaction-details-btn"
                            onClick={() => handleViewDetails(tx.id)}
                        >
                            Details
                        </button>
                    </div>
                );
            })}

            {selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}
        </div>
    );
}

export default TransactionList;