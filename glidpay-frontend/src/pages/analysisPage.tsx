import { useState, useEffect } from "react"
import {  getTransaction } from "../api/wallet"
import {  type Transaction } from "../types/wallet"
import {
  calculateCategoryPercentages,
  groupByMonth,
  groupByYear,
  getFinancialStatus
} from "../utils/AnalyzeTransaction"
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from "recharts"

import "../style/Analysis.css"
import { FaBackward } from "react-icons/fa"

const AnalysisPage = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

// ✅ Replace with fake data for testing
useEffect(() => {
  const fakeTransactions: Transaction[] = [
    { id: 1,  type: "deposit",  amount: 50000,  recipient: "",       date: "2026-01-15", status: "success" },
    { id: 2,  type: "withdraw", amount: 20000,  recipient: "",       date: "2026-01-20", status: "success" },
    { id: 3,  type: "transfer", amount: 10000,  recipient: "john",   date: "2026-02-05", status: "success" },
    { id: 4,  type: "received", amount: 30000,  recipient: "mary",   date: "2026-02-14", status: "success" },
    { id: 5,  type: "deposit",  amount: 75000,  recipient: "",       date: "2026-03-01", status: "success" },
    { id: 6,  type: "withdraw", amount: 15000,  recipient: "",       date: "2026-03-10", status: "success" },
    { id: 7,  type: "transfer", amount: 25000,  recipient: "alice",  date: "2026-04-03", status: "success" },
    { id: 8,  type: "received", amount: 40000,  recipient: "bob",    date: "2026-04-18", status: "success" },
    { id: 9,  type: "deposit",  amount: 100000, recipient: "",       date: "2026-05-07", status: "success" },
    { id: 10, type: "withdraw", amount: 35000,  recipient: "",       date: "2026-05-22", status: "success" },
    { id: 11, type: "transfer", amount: 20000,  recipient: "emma",   date: "2026-06-11", status: "success" },
    { id: 12, type: "received", amount: 60000,  recipient: "james",  date: "2026-06-25", status: "success" },
    { id: 13, type: "deposit",  amount: 80000,  recipient: "",       date: "2026-07-04", status: "success" },
    { id: 14, type: "withdraw", amount: 45000,  recipient: "",       date: "2026-07-19", status: "success" },
    { id: 15, type: "transfer", amount: 15000,  recipient: "kate",   date: "2026-08-02", status: "success" },
    { id: 16, type: "received", amount: 25000,  recipient: "mike",   date: "2026-08-30", status: "success" },
    { id: 17, type: "deposit",  amount: 120000, recipient: "",       date: "2026-09-12", status: "success" },
    { id: 18, type: "withdraw", amount: 55000,  recipient: "",       date: "2026-09-28", status: "success" },
    { id: 19, type: "transfer", amount: 30000,  recipient: "lucy",   date: "2026-10-08", status: "success" },
    { id: 20, type: "received", amount: 70000,  recipient: "paul",   date: "2026-10-21", status: "success" },
  ]

  setTransactions(fakeTransactions)
  setIsLoading(false)
}, [])

/**Analysis
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getTransaction()
        setTransactions(data)
      } catch {
        setError("Failed to load transactions")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
 */

  const pieData      = calculateCategoryPercentages(transactions)
  const monthlyData  = groupByMonth(transactions)
  const yearlyData   = groupByYear(transactions)
  const statusData   = getFinancialStatus(transactions)

  if (isLoading) return <div className="loading">Loading analysis...</div>
  if (error)     return <div className="error-text">{error}</div>

  return (
    <div className="analysis-page">

      <h1>Financial Analysis</h1>

      {/* ── Financial Status Card ── */}
      <div
        className="status-card"
        style={{ borderColor: statusData.statusColor }}
      >
        <h3>Financial Status</h3>
        <p style={{ color: statusData.statusColor }}>
          {statusData.status}
        </p>

        <div className="status-grid">
          <div className="status-item">
            <span>Total Deposited</span>
            <p style={{ color: "#22C55E" }}>
              XAF {statusData.totalDeposited.toLocaleString()}
            </p>
          </div>
          <div className="status-item">
            <span>Total Withdrawn</span>
            <p style={{ color: "#EF4444" }}>
              XAF {statusData.totalWithdrawn.toLocaleString()}
            </p>
          </div>
          <div className="status-item">
            <span>Total Transferred</span>
            <p style={{ color: "#9333EA" }}>
              XAF {statusData.totalTransferred.toLocaleString()}
            </p>
          </div>
          <div className="status-item">
            <span>Total Received</span>
            <p style={{ color: "#3B82F6" }}>
              XAF {statusData.totalReceived.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="net-flow">
          <span>Net Flow</span>
          <p style={{ color: statusData.statusColor }}>
            XAF {statusData.netFlow.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ── Pie Chart — Category Breakdown ── */}
      <div className="chart-card">
        <h3>Transaction Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name} ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bar Chart — Monthly Expenditure ── */}
      <div className="chart-card">
        <h3>Monthly Transactions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#C4B5FD" />
            <YAxis stroke="#C4B5FD" />
            <Tooltip
              formatter={(value) => `XAF ${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="amount" fill="#9333EA" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bar Chart — Yearly Dominance ── */}
      <div className="chart-card">
        <h3>Yearly Transaction Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="#C4B5FD" />
            <YAxis stroke="#C4B5FD" />
            <Tooltip
              formatter={(value) => `XAF ${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="deposit"  fill="#22C55E" radius={[6, 6, 0, 0]} name="Deposit" />
            <Bar dataKey="withdraw" fill="#EF4444" radius={[6, 6, 0, 0]} name="Withdraw" />
            <Bar dataKey="transfer" fill="#9333EA" radius={[6, 6, 0, 0]} name="Transfer" />
            <Bar dataKey="received" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Received" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default AnalysisPage