import { useEffect, useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import TransactionList from '../../components/TransactionList/TransactionList';
import './Transactions.css';

function Transactions() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [balance, setBalance] = useState(null);
    const [percentChange, setPercentChange] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBalance() {
            try {
                setLoading(true);
                const res = await fetch('/api/balance'); // <-- replace with your actual endpoint
                if (!res.ok) throw new Error('Failed to fetch balance');
                const data = await res.json();

                setBalance(data.amount);         // e.g. 1234.56
                setPercentChange(data.percentChange); // e.g. -12.5 or 8.2
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchBalance();
    }, [refreshKey]); // refetch whenever a new transaction is created

    const isNegative = percentChange < 0;

    return (
        <div className='Transactions'>
            <div className='transaction-info'>
                <div className='cards'>
                    <div className='balance-card'>
                        <h3>YOUR BALANCE</h3>
                        <h2>{loading ? '...' : `$${balance?.toFixed(2)}`}</h2>
                        <h4>This Month</h4>
                    </div>

                    <div className='past-transaction-card'>
                        <h5>Last Week Transaction</h5>
                        <div className={`percent-row ${isNegative ? 'negative' : 'positive'}`}>
                            {isNegative ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
                            <span>{loading ? '...' : `${Math.abs(percentChange)}%`}</span>
                        </div>
                    </div>
                </div>

                <div className='transaction-list'>
                    <div className='transaction-header'>
                        <h5>Previous Transactions</h5>
                        <h5>Add more</h5>
                    </div>
                </div>
                {/* <TransactionForm onCreated={() => setRefreshKey((k) => k + 1)} /> */}
                <TransactionList key={refreshKey} />
            </div>
        </div>
    );
}

export default Transactions;