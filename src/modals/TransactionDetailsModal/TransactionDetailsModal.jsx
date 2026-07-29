import './TransactionDetailsModal.css';

function TransactionDetailsModal({ transaction, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Transaction Details</h3>
                <p><strong>Description:</strong> {transaction.description}</p>
                <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Created:</strong> {new Date(transaction.created_at).toLocaleString()}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default TransactionDetailsModal;