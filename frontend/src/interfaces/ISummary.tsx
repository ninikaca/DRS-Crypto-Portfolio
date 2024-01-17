interface Profit {
    id: number;
    user_id: number;
    type: 'profit' | 'loss';
    summary: number;
    net_worth: number;
}

export default Profit;  