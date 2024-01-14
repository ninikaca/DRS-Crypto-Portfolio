import React, { useState, useEffect } from "react";
import Card from "../../components/portfolioCard/card";

const Portfolio: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
    }, []);

    return (
        <main className="section">
        <div>
          <h1 className="title">My Crypto Portfolio</h1>
  
          {/* Net Worth and Growth/Decrease Cards */}
          <div className="columns">
            <Card title="Net Worth" subtitle="$1202.223" />
            <Card title="Growth/Decrease" subtitle="-$202.223" />
          </div>
  
          {/* Buy Crypto Button */}
          <br/>
          <div className="field is-grouped">
            <br/><br/>
            <p className="control">
              <button className="button has-background-link	has-text-white is-medium">Buy Crypto</button>
            </p>
          </div>
  
          {/* Crypto Transactions Table */}
          <div className="table-container">
            <br/>
          <h1 className="title">Transaction History</h1>
            <table className="table is-fullwidth is-hoverable is-responsive">
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
            <tr>
                  <td>14.01.2024. 22:15</td>
                  <td>BOUGHT</td>
                  <td>BTC</td>
                  <td>$1000</td>
                  <td>
                    <button className="button is-danger" onClick={() => {alert("nesto")}}>Cancel transcation</button>
                  </td>
                </tr>              
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
};

export default Portfolio;
