import React, { useState, useEffect } from "react";
import Card from "../../components/portfolioCard/card";
import Transaction from "../../interfaces/ITransaction";
import BuyCryptoForm from "../../components/forms/buyCrypto";
import axios, { AxiosResponse } from "axios";
import LoginData from "../../interfaces/ILogin";
import { check_session } from "../../session/session-manager";
import TransactionHistory from "../../components/tables/transactionHistory";
import Navbar from '../../components/navbar/navbar';
import UserCryptoCurrencies from "../../components/tables/userCryptoCurrencies";
import CurrencyInfo from "../../interfaces/ICryptoCurrency";
import SellCryptoForm from "../../components/forms/sellCrypto";
import ISummary from "../../interfaces/ISummary";

const Portfolio: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showBuyForm, setShowBuyForm] = useState<boolean>(false);
    const [showSellForm, setShowSellForm] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>();
    const [cryptoTransactions, setCryptoTransactions] = useState<CurrencyInfo[]>();
    const [summary, setSummary] = useState<ISummary>();

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
                fetchPortfolio();
                fetchSummary();
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

    const sellCryptoSubmit = async (transaction: Transaction) => {
        transaction.user_id = userId;

        // to do upis u bazu, pozovi api
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/sellCrypto', transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                console.log(response.data.data); // to do neku lepu ui poruku
                fetchTransactions();
                fetchPortfolio();
                fetchSummary();
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

    const fetchSummary = async () => {
        try {
            setLoading(true);
            if (userId === 0) return;

            const response: AxiosResponse = await axios.post('http://localhost:5000/api/profit/getSummary', { user_id: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSummary(response.data);
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

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            if (userId === 0) return;

            const response: AxiosResponse = await axios.post('http://localhost:5000/api/transaction/getCryptoPortfolio', { user_id: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setCryptoTransactions(response.data);
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
        fetchPortfolio();
        fetchSummary();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <main className="wallet-page" style={{paddingBottom: 50}}>
            <div>
                <Navbar />
                <div className="hero-body" style={{ margin: 50 }}>
                    <h1 className="title">My Crypto Portfolio</h1>
                    {/* Net Worth and Growth/Decrease Cards */}
                    <div className="columns">
                        <Card title="Net Worth" subtitle={"$" + (summary?.net_worth ? summary.net_worth.toFixed(2).toString() : "0.0")}/>
                        <Card title="Summary" subtitle={(summary?.summary ? summary.summary.toFixed(5).toString() : "0.0") + "%"} />
                    </div>

                    {/* Buy Crypto Button */}
                    <br />
                    <div className="field is-grouped" style={{ justifyContent: 'space-between' }}>
                        <p className="control">
                            <button className="button has-background-link has-text-white is-medium" style={{ borderRadius: 7 }} onClick={() => setShowBuyForm(true)}>
                                Buy Crypto
                            </button>
                        </p>

                        <p className="control">
                            <button className="button has-background-success-dark has-text-white is-medium" style={{ borderRadius: 7 }} onClick={() => setShowSellForm(true)}>
                                Sell Crypto
                            </button>
                        </p>
                    </div>


                    {/* Buy and Sell Crypto Forms */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {showBuyForm ? (
                            <div style={{ width: '48%' }}>
                                <BuyCryptoForm EnteredData={buyCryptoSubmit} CloseForm={() => setShowBuyForm(false)} userId={userId} />
                            </div>
                        ) : <div style={{ width: '48%' }}></div> }
                        {showSellForm && (
                            <div style={{ width: '48%' }}>
                                <SellCryptoForm EnteredData={sellCryptoSubmit} CloseForm={() => setShowSellForm(false)} userId={userId} />
                            </div>
                        )}
                    </div>


                    {/* Crypto Portoflio */}
                    {loading ? <h1 className="is-size-4 has-text-link-dark mt-5 has-text-weight-normal has-text-centered">Loading your crypto wallet...</h1> :
                        cryptoTransactions ? <UserCryptoCurrencies transactions={cryptoTransactions} userId={userId} fetchPortfolio={fetchPortfolio} fetchTransactions={fetchTransactions} /> : <h1 className="title mt-3">No currencies</h1>
                    }

                    {/* Crypto Transactions Table */}
                    {loading ? <h1 className="is-size-4 has-text-info-dark mt-5 has-text-weight-normal has-text-centered">Loading your transaction history...</h1> :
                        transactions ? <TransactionHistory transactions={transactions} fetchPortfolio={fetchPortfolio} fetchTransactions={fetchTransactions} /> : <h1 className="title mt-3">No transactions</h1>
                    }
                </div>
            </div>
        </main>
    );
};

export default Portfolio;
