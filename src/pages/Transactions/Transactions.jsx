import { useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import TransactionDetailsModal from '../../components/TransactionDetailsModal/TransactionDetailsModal';
import TransactionList from '../../components/TransactionList/TransactionList';
import TransactionForm from '../../forms/TransactionForm/TransactionForm';
import './Transactions.css';

function Transactions() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [balance, setBalance] = useState(null);
    const [percentChange, setPercentChange] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchBalance() {
            try {
                setLoading(true);

                const res = await fetch('/transactions');

                if (!res.ok) {
                    throw new Error('Failed to fetch balance');
                }

                const data = await res.json();

                setBalance(data.amount);
                setPercentChange(data.percentChange);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchBalance();
    }, [refreshKey]);

    const isNegative = percentChange < 0;

    return (
        <div className="Transactions">
            <div className="transaction-info">
                <div className="cards">
                    <div className="balance-card">
                        <h3>YOUR BALANCE</h3>
                        <h2>{loading ? '...' : `$${balance?.toFixed(2)}`}</h2>
                        <h4>This Month</h4>
                    </div>

                    <div className="past-transaction-card">
                        <h5>Last Week Transaction</h5>

                        <div className={`percent-row ${isNegative ? 'negative' : 'positive'}`}>
                            {isNegative ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
                            <span>{loading ? '...' : `${Math.abs(percentChange || 0)}%`}</span>
                        </div>
                    </div>
                </div>

                <div className="transaction-list">
                    <div className="transaction-header">
                        <h5>Previous Transactions</h5>
                        <button
                            type="button"
                            className="add-more-btn"
                            onClick={() => setShowForm((prev) => !prev)}
                        >
                            Add more
                        </button>
                    </div>

                    {selectedTransaction && (
                        <TransactionDetailsModal
                            transaction={selectedTransaction}
                            onClick={() => setSelectedTransaction(null)}
                        />
                    )}
                    {showForm && (
                        <TransactionForm
                            onCreated={() => {
                                setRefreshKey((k) => k + 1);
                                setShowForm(false);
                            }}
                            onClose={() => setShowForm(false)}
                        />
                    )}

                    <TransactionList key={refreshKey} />
                </div>
            </div>
        </div>
    );
}

export default Transactions;