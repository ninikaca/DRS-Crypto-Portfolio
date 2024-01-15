import React, { useState, useEffect } from "react";
import Card from "../../components/portfolioCard/card";
import Transaction from "../../interfaces/ITransaction";
import BuyCryptoForm from "../../components/forms/buyCrypto";
import axios, { AxiosResponse } from "axios";
import LoginData from "../../interfaces/ILogin";
import { check_session } from "../../session/session-manager";
import TransactionHistory from "../../components/tables/transactionHistory";
import Navbar from '../../components/navbar/navbar';

const Portfolio: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showBuyForm, setShowBuyForm] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>();

    const buyCryptoSubmit = async (transaction: Transaction) => {
        transaction.user_id = userId;

        // to do upis u bazu, pozovi api
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/buyCrypto', transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                console.log(response.data.data); // to do neku lepu ui poruku
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

    }

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            if (userId === 0) return;

            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/get', { user_id: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setTransactions(response.data);
            }
            else {
                console.warn("Nemere radit")
            }
        }
        catch
        {
            console.warn("Nemere radit exception")
        }
        setLoading(false);
    }

    useEffect(() => {
        const getUserId = async () => {
            var user_loggedin: LoginData | null = check_session();

            if (user_loggedin) {
                try {
                    const response = await axios.post('http://localhost:5000/api/users/get', { email: user_loggedin.email }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.status === 200) {
                        setUserId(response.data.data.id);
                    }
                }
                catch { }
            }
        }

        getUserId();
        fetchTransactions();

    }, [userId]);

    return (
        <main className="wallet-page">
            <div>
                <Navbar />
                <div className="hero-body" style={{margin:50}}>
                <h1 className="title">My Crypto Portfolio</h1>
                {/* Net Worth and Growth/Decrease Cards */}
                <div className="columns">
                    <Card title="Net Worth" subtitle="$1202.223" />
                    <Card title="Growth/Decrease" subtitle="-$202.223" />
                </div>

                {/* Buy Crypto Button */}
                <br />
                <div className="field is-grouped">
                    <br /><br />
                    <p className="control">
                        <button className="button has-background-link has-text-white is-medium" style={{ borderRadius: 7 }} onClick={() => setShowBuyForm(true)}>Buy Crypto</button>
                    </p>
                </div>

                {showBuyForm &&
                    <div>
                        <BuyCryptoForm EnteredData={buyCryptoSubmit} CloseForm={setShowBuyForm} userId={userId} />
                    </div>
                }

                {/* Crypto Transactions Table */}
                {loading ? <h1 className="is-size-4 has-text-info-dark mt-5 has-text-weight-normal has-text-centered">Loading your transaction history...</h1> :
                    transactions ? <TransactionHistory transactions={transactions} /> : <h1 className="title mt-3">No transactions</h1>
                }
                </div>

            </div>
        </main>
    );
};

export default Portfolio;
