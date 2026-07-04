import { type Transactions } from "../types/wallet"; // Keep this if needed, or remove if standalone
import { useEffect, useState } from "react";
import "../style/history.css";
import { IoReturnDownBack } from "react-icons/io5";
import AnalysisPage from "./analysisPage";
import { useNavigate } from "react-router-dom";

// Formatted dummy data to match the UI's filtering criteria
const DUMMY_TRANSACTIONS = [
    { id: "1", type: "Deposit - Bank Transfer", amount: "50,000", date: "2026-07-01 10:34", recipient: "" },
    { id: "2", type: "Deposit - Mobile Money", amount: "15,000", date: "2026-07-03 14:20", recipient: "" },
    { id: "3", type: "Withdrawal - ATM", amount: "20,000", date: "2026-07-02 09:15", recipient: "" },
    { id: "4", type: "Withdrawal - Card Payment", amount: "5,500", date: "2026-07-04 16:00", recipient: "" },
    { id: "5", type: "Transfer Sent", amount: "12,000", date: "2026-07-02 18:45", recipient: "Amadou Diallo" },
    { id: "6", type: "Transfer Received", amount: "35,000", date: "2026-07-04 11:10", recipient: "Marie Ndiaye" }
];

const HistoryPage = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<"deposits" | "withdrawals" | "transfers" | null>(null);

    useEffect(() => {
        // Simulating an API response with fake data delay
        const timer = setTimeout(() => {
            setTransactions(DUMMY_TRANSACTIONS);
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="history-page loading-state">
                <h3>Loading Transactions...</h3>
            </div>
        );
    }

    /** this is the Original for backend
     * useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await getTransaction();
                setTransactions(data);
            } catch (fetchError) {
                console.error("Error fetching transactions:", fetchError);
                setError("Failed to load transaction history.");
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []); */

    return (
        <>
        <div className="history-page">
              <button title="back to Dashboard" onClick={() => navigate("/dashboard")}>
                          <IoReturnDownBack size={24} />
                        </button>
            <h2>Transaction History</h2>
            <div className="transaction-list-submenu">
                
                {/* DEPOSITS & RECEIVED CATEGORY */}
                <div className="transaction-category">
                    <button 
                        title="toggle-btn" 
                        className={selectedCategory === 'deposits' ? 'active' : ''} 
                        onClick={() => setSelectedCategory(prev => prev === 'deposits' ? null : 'deposits')}
                    >
                        Deposits
                    </button>
                    {selectedCategory === 'deposits' && (
                        <div className="category-content">
                            <p className="category-description">Deposits are transactions where funds are added to your wallet via bank transfers, card payments, or mobile money services.</p>
                            {error ? (
                                <p className="Error message">{error}</p>
                            ) : transactions.filter((t) => t.type?.toLowerCase().includes("deposit") || t.type?.toLowerCase().includes("received")).length === 0 ? (
                                <p className="empty-state">No deposits found</p>
                            ) : (
                                <ul className="transaction-inner-list">
                                    {transactions
                                        .filter((t) => t.type && (t.type.toLowerCase().includes("deposit") || t.type.toLowerCase().includes("received")))
                                        .map((transaction) => (
                                            <li key={transaction.id} className="transaction-item">
                                                <div className="item-left">
                                                    <strong className="type type-deposit">{transaction.type}</strong>
                                                </div>
                                                <div className="item-right">
                                                    <span className="amount">{transaction.amount} CFA</span>
                                                    <p className="Date">{transaction.date}</p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* WITHDRAWALS CATEGORY */}
                <div className="transaction-category">
                    <button 
                        title="toggle-btn" 
                        className={selectedCategory === 'withdrawals' ? 'active' : ''} 
                        onClick={() => setSelectedCategory(prev => prev === 'withdrawals' ? null : 'withdrawals')}
                    >
                        Withdrawals
                    </button>
                    {selectedCategory === 'withdrawals' && (
                        <div className="category-content">
                            <p className="category-description">Withdrawals are transactions where funds are removed from your wallet to bank accounts or external cash outpoints.</p>
                            {error ? (
                                <p className="Error message">{error}</p>
                            ) : transactions.filter((t) => t.type?.toLowerCase().includes("withdraw")).length === 0 ? (
                                <p className="empty-state">No withdrawals found</p>
                            ) : (
                                <ul className="transaction-inner-list">
                                    {transactions
                                        .filter((t) => t.type && t.type.toLowerCase().includes("withdraw"))
                                        .map((transaction) => (
                                            <li key={transaction.id} className="transaction-item">
                                                <div className="item-left">
                                                    <strong className="type type-withdraw">{transaction.type}</strong>
                                                </div>
                                                <div className="item-right">
                                                    <span className="amount">{transaction.amount} CFA</span>
                                                    <p className="Date">{transaction.date}</p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* TRANSFERS CATEGORY */}
                <div className="transaction-category">
                    <button 
                        title="toggle-btn" 
                        className={selectedCategory === 'transfers' ? 'active' : ''} 
                        onClick={() => setSelectedCategory(prev => prev === 'transfers' ? null : 'transfers')}
                    >
                        Transfers
                    </button>
                    {selectedCategory === 'transfers' && (
                        <div className="category-content">
                            <p className="category-description">Transfers are peer-to-peer transactions executed directly between individual digital wallets.</p>
                            {error ? (
                                <p className="Error message">{error}</p>
                            ) : transactions.filter((t) => t.type?.toLowerCase().includes("transfer")).length === 0 ? (
                                <p className="empty-state">No transfers found</p>
                            ) : (
                                <ul className="transaction-inner-list">
                                    {transactions
                                        .filter((t) => t.type && t.type.toLowerCase().includes("transfer"))
                                        .map((transaction) => (
                                            <li key={transaction.id} className="transaction-item">
                                                <div className="item-left">
                                                    <p className="Recipient">Ref: {transaction.recipient || "N/A"}</p>
                                                    <strong className="type type-transfer">{transaction.type}</strong>
                                                </div>
                                                <div className="item-right">
                                                    <span className="amount">{transaction.amount} CFA</span>
                                                    <p className="Date">{transaction.date}</p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="AnalysisPage">
          <AnalysisPage />
          </div>
      </>
    );
};

export default HistoryPage;