import { useEffect, useState } from "react";
import "../style/Dashboard.css";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiSend,
  FiCreditCard,
} from "react-icons/fi";
import { motion } from "framer-motion"
import { getBalance } from "../api/wallet";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const data = await getBalance();
        setBalance(data.balance);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalanceData();
  }, []);

  const toggleBalanceVisibility = () => setShowBalance((prev) => !prev);

  return (
    <div className="dashboard">
      {/* Fixed Top Bar */}
      <header className="dashboard__topbar">
        <div className="dashboard__topbar-left">
          <div className="dashboard__avatar">
            {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="dashboard__greeting">
            <span className="dashboard__greeting-label">Welcome back</span>
            <span className="dashboard__greeting-name">
              {user?.fullname || "Calero"}
            </span>
          </div>
        </div>
        <div className="dashboard__topbar-right">
          <button
            className="dashboard__icon-btn"
            aria-label="Notifications"
          >
            <IoNotifications size={22} />
            <span className="dashboard__badge">3</span>
          </button>
          <button
            className="dashboard__logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Fixed Balance Card */}
      <section className="dashboard__balance-section">
        <div className="dashboard__balance-card">
          <div className="dashboard__balance-header">
            <span className="dashboard__balance-label">Available Balance</span>
            <button
              className="dashboard__balance-toggle"
              onClick={toggleBalanceVisibility}
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? (
                <AiOutlineEyeInvisible size={18} color="white" />
              ) : (
                <AiOutlineEye size={18} color="white" />
              )}
            </button>
          </div>
          <div className="dashboard__balance-amount">
            {loading ? (
              <motion.span
               className="dashboard__balance-skeleton"
               animate={{rotate: 360}}
               transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "linear"
               }}
                />
            ) : (
              <span className="dashboard__balance-value">
                {showBalance ? `$${balance.toLocaleString()}` : "********"}
              </span>
            )}
          </div>
          <div className="dashboard__balance-account">
            <FiCreditCard size={14} />
            <span>@{user?.username || "user"}</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard__actions">
        <h2 className="dashboard__section-title">Quick Actions</h2>
        <div className="dashboard__actions-grid">
          <button className="dashboard__action-btn dashboard__action-btn--deposit">
            <span className="dashboard__action-icon">
              <FiArrowDownCircle size={24} />
            </span>
            <span className="dashboard__action-label">Deposit</span>
          </button>
          <button className="dashboard__action-btn dashboard__action-btn--withdraw">
            <span className="dashboard__action-icon">
              <FiArrowUpCircle size={24} />
            </span>
            <span className="dashboard__action-label">Withdraw</span>
          </button>
          <button className="dashboard__action-btn dashboard__action-btn--transfer">
            <span className="dashboard__action-icon">
              <FiSend size={24} />
            </span>
            <span className="dashboard__action-label">Transfer</span>
          </button>
          <button className="dashboard__action-btn dashboard__action-btn--history">
            <span className="dashboard__action-icon">
              <FiCreditCard size={24} />
            </span>
            <span className="dashboard__action-label">History</span>
          </button>
        </div>
      </section>

      {/* Recent Transactions Placeholder */}
      <section className="dashboard__transactions">
        <h2 className="dashboard__section-title">Recent Transactions</h2>
        <div className="dashboard__empty-state">
          <FiCreditCard size={40} />
          <p>No transactions yet.</p>
          <span>Your recent activity will appear here.</span>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
