import { FaArrowDown, FaArrowUp, FaDollarSign, FaWallet } from "react-icons/fa";
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="Dashboard">
            <div className="summary-cards">
                <div className="card">
                    <div className="card-header">
                        <span>Total Income</span>
                        <FaArrowUp className="icon income" />
                    </div>
                    <p className="value income">$0.00</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span>Total Expenses</span>
                        <FaArrowDown className="icon outcome" />
                    </div>
                    <p className="value expense">$0.00</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span>Current Balance</span>
                        <FaWallet className="icon balance" />
                    </div>
                    <p className="value balance">$0.00</p>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span>Savings Progress</span>
                        <FaDollarSign className="icon savings" />
                    </div>
                    <p className="value savings">0.0%</p>
                </div>
            </div>

            <div className="section">
                <h3>Budget Overview</h3>
                <p className="placeholder-text">No budget data yet.</p>
            </div>

            <div className="section">
                <h3>Category Spending</h3>
                <p className="placeholder-text">No spending data yet.</p>
            </div>
        </div>
    );
}

export default Dashboard;