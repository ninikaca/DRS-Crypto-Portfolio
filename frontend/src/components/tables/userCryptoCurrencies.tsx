import React from "react";
import Transactions from "../../interfaces/ITransactions";

const UserCryptoCurrencies: React.FC<Transactions> = ({ transactions }) => {
    const onCancelTransaction = () => {
        // Call your function to handle canceling the transaction
        // to do pozovi api da ponisti ovo
        alert("Cancel transaction");
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
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="has-text-link has-text-weight-bold">{transaction.currency}</td>
                            <td className="has-text-weight-bold">${transaction.amount_paid_dollars}</td>
                            <td>
                                <button
                                    className="button has-background-danger-dark has-text-white"
                                    style={{ borderRadius: 7 }}
                                    onClick={onCancelTransaction}
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
