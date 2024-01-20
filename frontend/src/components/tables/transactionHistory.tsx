import React from "react";
import Transactions from "../../interfaces/ITransactions";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionHistory: React.FC<Transactions> = ({ transactions, fetchPortfolio, fetchTransactions }) => {
    const onCancelTransaction = async (id?: number) => {
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/deleteTransaction',
                {
                    transaction_id: id
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.warning('Transaction has been cancelled.')
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
            <h1 className="title">Transaction History</h1>
            {(transactions && transactions.length !== 0) === true ?
                <table className="table is-fullwidth is-hoverable is-responsive" style={{ borderRadius: 5 }}>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Sale / Buy</th>
                            <th>Currency</th>
                            <th>Net worth in $</th>
                            <th>Undo transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>
                                    {new Date(transaction.date_and_time).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    }).replaceAll("/", ".")}</td>
                                <td>{transaction.type.toUpperCase()}</td>
                                <td>{transaction.currency}</td>
                                <td>${transaction.amount_paid_dollars}</td>
                                <td>
                                    <button
                                        className="button has-background-danger-dark has-text-white"
                                        style={{ borderRadius: 7 }}
                                        onClick={() => { onCancelTransaction(transaction.id) }}
                                    >
                                        Cancel transaction
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <div>
                    <h1 style={{ fontSize: 20, fontStyle: 'italic', color: 'darkgreen' }}>No transaction has been evidented.</h1>
                </div>
            }
        </div>
    );
};

export default TransactionHistory;
