import React from "react";
import IPortoflio from "../../interfaces/IPortoflio";
import axios, { AxiosResponse } from "axios";

const UserCryptoCurrencies: React.FC<IPortoflio> = ({ transactions, userId, fetchPortfolio, fetchTransactions }) => {
    const onCancelTransaction = async (currency: string, userId?: number) => {
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/deleteCurrency',
                {
                    user_id: userId,
                    currency: currency
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                fetchPortfolio();
                fetchTransactions();
            }
            else {
                console.warn("Nemere radit")
            }
        }
        catch
        {
            console.warn("Nemere radit exception")
        }
    };

    return (
        <div className="table-container">
            <br />
            <h1 className="title">My Crypto Currencies</h1>
            <table className="table is-fullwidth is-hoverable is-responsive" style={{ borderRadius: 5 }}>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Net worth</th>
                        <th>Profit / Loss</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(transactions).map(([currencyCode, currencyInfo]) => (
                        <tr key={currencyInfo.currency}>
                            <td className="has-text-link has-text-weight-bold">{currencyInfo.currency}</td>
                            <td className="has-text-weight-medium">{currencyInfo.total_amount}</td>
                            <td className="has-text-weight-medium" style={{display: 'flex', alignItems: 'center'}}>{currencyInfo.difference}
                                {
                                    currencyInfo.difference < 0.0 ? <img className="ml-2" src="gubitak.png" width={32} height={32} alt=""></img>
                                        :
                                        <img className="ml-2" src="dobit.png" width={32} height={32} alt=""></img>
                                }
                            </td>
                            <td>
                                <button
                                    className="button has-background-danger-dark has-text-white"
                                    style={{ borderRadius: 7 }}
                                    onClick={() => onCancelTransaction(currencyInfo.currency, userId)}
                                >
                                    Remove currency from portfolio
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserCryptoCurrencies;
