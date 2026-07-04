import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Registers';
import HomePage from './pages/Home';
import Features from './contents/Features';
import WithdrawPage from './pages/withdraw';
import DepositePage from './pages/deposite';
import TransferPage from './pages/transfer';
import HistoryPage from './pages/history';
import AnalysisPage from './pages/analysisPage';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/features' element={<Features/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/deposit" element={<DepositePage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;