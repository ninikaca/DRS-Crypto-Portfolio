import CurrencyInfo from './ICryptoCurrency';

interface IPortfolio {
    [currency: string]: CurrencyInfo;
  }

  export default IPortfolio;