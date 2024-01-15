import React from "react";
import IPortoflio from "../../interfaces/IPortoflio";

const UserCryptoCurrencies: React.FC<IPortoflio> = ({ transactions }) => {
    const onCancelTransaction = (currency: string, userId?: number) => {
        // Call your function to handle canceling the transaction
        // to do pozovi api da ponisti ovo
        alert(currency + " " + userId);
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(transactions).map(([currencyCode, currencyInfo]) => (
                        <tr key={currencyInfo.currency}>
                            <td className="has-text-link has-text-weight-bold">{currencyInfo.currency}</td>
                            <td className="has-text-weight-bold">${currencyInfo.total_amount}</td>
                            <td>
                                <button
                                    className="button has-background-danger-dark has-text-white"
                                    style={{ borderRadius: 7 }}
                                    onClick={() => onCancelTransaction(currencyInfo.currency, currencyInfo.userId)}
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
