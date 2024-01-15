import CurrencyInfo from './ICryptoCurrency';

interface IPortfolio {
    transactions: CurrencyInfo[];
    userId: number;
  }

  export default IPortfolio;