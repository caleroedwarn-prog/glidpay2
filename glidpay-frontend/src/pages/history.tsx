import { type Transactions } from "../types/wallet";
import { useEffect, useState } from "react";
import { getTransaction } from "../api/wallet";
import "../style/history.css";

const HistoryPage = () => {

    const [transactions, setTransactions] = useState<Transactions[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
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
    }, []);

    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="history-page">
            <h2>Transaction History</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul className="transaction-list">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="transaction-item">
                            <div>
                                <strong>{transaction.type}</strong>
                                <p>{transaction.recipient}</p>
                            </div>
                            <div>
                                <span>{transaction.amount} CFA</span>
                                <p>{transaction.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistoryPage;