interface Transaction {
    id: number;
    user_id: number;
    date_and_time: string;
    type: 'bought' | 'sold';
    currency: string;
    amount_paid_dollars: number;
};

export default Transaction;