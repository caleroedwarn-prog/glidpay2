
import { type Transaction } from "../types/wallet";

export const calculateCategoryPercentages = (transaction: Transaction[]) => {
    const counts = {
        deposits: 0,
        withdraws: 0,
        transfers: 0,
        received: 0
    }

    transaction.forEach((t) => {
        if(t.type === "deposit") counts.deposits++;
        if(t.type === "withdraw") counts.withdraws++;
        if(t.type === "transfer") counts.transfers++;
        if(t.type === "received") counts.received++;
    });

    const total = transaction.length;

    return [
        {name: "Deposit", value: Math.round((counts.deposits / total) * 100), color:  "#22C55E"},
        {name: "Withdraw", value: Math.round((counts.withdraws / total) * 100), color:  "#EF4444"},
        {name: "Transfer", value: Math.round((counts.transfers / total) * 100), color:  "#9333EA"},
        {name: "Received", value: Math.round((counts.received / total) * 100), color:  "#3B82F6"}
    ]

}

    export const groupByMonth = (transactions: Transaction[]) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const grouped: Record<string, number> = {};

        months.forEach((m) => {grouped[m] = 0});

        transactions.forEach((t) => {
            const month = new Date(t.date).getMonth();
            const monthName = months[month];
            grouped[monthName] += t.amount;
        })

        return months.map((m) => ({
            month: m,
            amount: grouped[m] || 0
        }))
    }

    export const groupByYear = (transactions: Transaction[]) => {
        const grouped: Record<string, Record<string, number>> = {}

        transactions.forEach((t) => {
            const year = new Date(t.date).getFullYear().toString()

            if(!grouped[year]){
                grouped[year] = { deposit: 0, withdraw: 0, transfer: 0, received: 0 }
            }

            grouped[year][t.type] += t.amount

        })

        return Object.keys(grouped).map((year) => ({
            year,
            deposit:  grouped[year].deposit,
            withdraw: grouped[year].withdraw,
            transfer: grouped[year].transfer,
            received: grouped[year].received
        }))
    }

    export const getFinancialStatus = (transactions: Transaction[]) => {

            let totalDeposited = 0
            let totalWithdrawn = 0
            let totalTransferred = 0
            let totalReceived = 0

            transactions.forEach((t) => {
                if (t.type === "deposit")  totalDeposited  += t.amount
                if (t.type === "withdraw") totalWithdrawn  += t.amount
                if (t.type === "transfer") totalTransferred += t.amount
                if (t.type === "received") totalReceived   += t.amount
            })

            const totalIn  = totalDeposited + totalReceived
            const totalOut = totalWithdrawn + totalTransferred
            const netFlow  = totalIn - totalOut

  let status 
  let statusColor 

        if (netFlow > 0) {
            status = "Your savings are growing steadily 📈"
            statusColor = "#22C55E"
        } else if (netFlow < 0) {
            status = "You are spending more than you receive ⚠️"
            statusColor = "#EF4444"
        } else {
            status = "Your income and spending are balanced ⚖️"
            statusColor = "#9333EA"
        }

        return {
            totalDeposited,
            totalWithdrawn,
            totalTransferred,
            totalReceived,
            totalIn,
            totalOut,
            netFlow,
            status,
            statusColor
        }
    }