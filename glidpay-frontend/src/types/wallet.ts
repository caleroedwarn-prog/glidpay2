export type WalletBalance = {
    balance: number;
}

export type Transaction = {
    id: number;
    type: string;
    amount: number;
    recipient: string;
    date: string;
    status: string;
}

export type TransactionList = Transaction[]

export type DepositeRequest = {
    amount: number;
}

export type WithdrawRequest = {
    amount: number;
    pin: string
}

export type TransferRequest = {
    amount: number;
    recipient: string;
    pin: string;
}

export type WalletResponse = {
    message: string;
    balance: number;
}
