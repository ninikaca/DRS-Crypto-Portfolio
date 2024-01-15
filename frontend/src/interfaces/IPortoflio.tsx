import CurrencyInfo from './ICryptoCurrency';

interface IPortfolio {
    transactions: CurrencyInfo[];
    userId: number;
    fetchTransactions: () => void;
    fetchPortfolio: () => void;
  }

  export default IPortfolio;