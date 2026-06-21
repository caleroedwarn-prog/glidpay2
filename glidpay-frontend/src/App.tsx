import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Registers';
import HomePage from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute'
import Features from './contents/Features';
import WithdrawPage from './pages/withdraw';

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
      </Routes>
    </BrowserRouter>
  );
}
export default App;