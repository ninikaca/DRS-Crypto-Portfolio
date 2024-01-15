import React, { useEffect, useState } from "react";
import Transaction from '../../interfaces/ITransaction';
import ExchangeRates from "../../interfaces/ExchangeRates";
import axios from "axios";
import { check_session } from "../../session/session-manager";
import LoginData from "../../interfaces/ILogin";
import IRegistration from "../../interfaces/IRegistration";

interface TransactionFormProps {
  userId: number;
  EnteredData: (transaction: Transaction) => void;
  CloseForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuyCryptoForm: React.FC<TransactionFormProps> = ({ EnteredData, CloseForm, userId }) => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [formData, setFormData] = useState<Transaction>({
    user_id: -1, // Set a default user_id or fetch it from somewhere
    date_and_time: "",
    type: "bought",
    currency: "",
    amount_paid_dollars: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formData.user_id = userId;
    EnteredData(formData);
    CloseForm(false); // close form

    // reset the form after submission
    setFormData({
      user_id: 0, // Set a default user_id or fetch it from somewhere
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
    <form onSubmit={handleSubmit} className="has-background-link-light" style={{padding: 10, borderRadius: 10}}>
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
          <button className="button has-background-primary-dark has-text-white" type="submit" style={{ borderRadius: 7 }}>
            Buy Crypto
          </button>

          <button className="button ml-3 has-background-danger-dark has-text-white" type="button" style={{ borderRadius: 7 }} onClick={() => CloseForm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default BuyCryptoForm;
