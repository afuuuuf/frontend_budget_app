import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <h1>Welcome to the Personal Budgeting and Finance Tracker</h1>
            <p>Track your transactions, manage your budget, and stay on top of your finances.</p>
            <button onClick={() => navigate('/transactions')}>Get Started</button>
        </div>
    );
}

export default Home;