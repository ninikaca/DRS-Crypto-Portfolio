interface CurrencyInfo {
    currency: string;
    total_amount: number;
    type: "bought";
    difference: number;
    userId?: number;
}

export default CurrencyInfo;