import React, { useEffect, useState } from "react";
import Transaction from '../../interfaces/ITransaction';
import ExchangeRates from "../../interfaces/ExchangeRates";
import axios from "axios";

interface TransactionFormProps {
  EnteredData: (transaction: Transaction) => void;
  CloseForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuyCryptoForm: React.FC<TransactionFormProps> = ({ EnteredData, CloseForm }) => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [formData, setFormData] = useState<Transaction>({
    user_id: 1, // Set a default user_id or fetch it from somewhere
    date_and_time: "",
    type: "bought",
    currency: "",
    amount_paid_dollars: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EnteredData(formData);
    CloseForm(false); // close form

    // reset the form after submission
    setFormData({
      user_id: 1, // Set a default user_id or fetch it from somewhere
      date_and_time: "",
      type: "bought",
      currency: "",
      amount_paid_dollars: 0,
    });
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get<ExchangeRates>("http://localhost:5000/api/currencies/get/rates", {
            headers: {
              'Content-Type': 'application/json',
            },
          });        
          
          setExchangeRates(response.data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Date & Time</label>
        <div className="control">
          <input
            className="input"
            type="datetime-local"
            name="date_and_time"
            value={formData.date_and_time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Sale / Buy</label>
        <div className="control">
          <div className="select">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="bought">Bought</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Currency</label>
        <div className="control">
          <div className="select">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a currency</option>
              {exchangeRates?.rates &&
                Object.keys(exchangeRates.rates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Net worth in $</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="amount_paid_dollars"
            value={formData.amount_paid_dollars}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuyCryptoForm;
