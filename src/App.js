import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Transactions from './pages/Transactions/Transactions';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboards" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;