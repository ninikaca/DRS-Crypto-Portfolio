interface CurrencyInfo {
    currency: string;
    total_amount: number;
    type: "bought";
    userId?: number;
}

export default CurrencyInfo;