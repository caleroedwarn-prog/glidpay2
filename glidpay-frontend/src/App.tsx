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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/features' element={<Features/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><WithdrawPage /></ProtectedRoute>} />
        <Route path="/deposit" element={<ProtectedRoute><DepositePage /></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/analysis" element={<ProtectedRoute><AnalysisPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;