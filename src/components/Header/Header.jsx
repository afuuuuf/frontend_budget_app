import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <nav>
                <h2 className="name"><span>Personal Budget Tracker</span></h2>
                <div className="nav-links">
                    <NavLink to="/dashboards">Dashboard</NavLink>
                    <NavLink to="/transactions">Transactions</NavLink>
                    <NavLink to="/budgets">Budgets</NavLink>
                    <NavLink to="/savings">Savings</NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Header;