
  import React, { useState } from 'react';
  import ICrypto from '../../interfaces/ICrypto';
  import IBuy from '../../interfaces/IBuy';

  
  const Input: React.FC = () => {
    const [crypto, setCrypto] = useState<ICrypto>({
      name: '',
      symbol: '',
      price: 0,
    });
  
    const [buy, setBuy] = useState<IBuy>({
      date: '',
      quantity: 0,
      type: 'buy',
    });
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      setCrypto((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
  
      setBuy((prev) => ({
        ...prev,
        datum: value,
      }));
    };
  
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      setBuy((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    };
  
    const handleTipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
  
      setBuy((prev) => ({
        ...prev,
        tip: value as 'buy' | 'sell',
      }));
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      // Ovde možete proslediti podatke nekom API-ju ili ih obraditi na neki drugi način
      console.log('Podaci za unos:', crypto, buy);
  
      // Resetujte stanje nakon unosa
      setCrypto({
        name: '',
        symbol: '',
        price: 0,
      });
      setBuy({
        date: '',
        quantity: 0,
        type: 'buy',
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>The name of the cryptocurrency:</label>
          <input type="text" name="ime" value={crypto.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Cryptocurrency symbol:</label>
          <input type="text" name="simbol" value={crypto.symbol} onChange={handleInputChange} />
        </div>
        <div>
          <label>Cryptocurrency price:</label>
          <input type="number" name="cena" value={crypto.price} onChange={handleNumberChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="datum" value={buy.date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="kolicina" value={buy.quantity} onChange={handleNumberChange} />
        </div>
        <div>
          <label>Transaction type:</label>
          <select name="tip" value={buy.type} onChange={handleTipChange}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <button type="submit">Enter the transaction</button>
      </form>
    );
  };
  
  export default Input;
  