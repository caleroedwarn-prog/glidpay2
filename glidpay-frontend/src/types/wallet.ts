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
    method: string;
    expiry?: string;
    cvv?: string;
    phoneNumber?: string;
    provider?: string;
    message?: boolean;
}

export type WithdrawRequest = {
    amount: number;
    pin: string;
    method: string;
    expiry?: string;
    cvv?: string;
    phoneNumber?: string;
    provider?: string;
}

export type TransferRequest = {
    amount: number;
    recipient: string;
    pin: string;
    message: boolean;
}

export type WalletResponse = {
    message: boolean;
    balance: number;
}
