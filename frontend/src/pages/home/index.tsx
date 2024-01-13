import React from 'react';
import Navbar from '../../components/navbar/navbar';

const Home = (): React.JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="home-page">
      <div className="columns ">
        
        <div className="column">
          <a style={{marginLeft: 120}}href="/">
            <img
              src="home2.png"
              width={800}
              alt=""
            />
          </a>
        </div>
        <div className="column">
          <h1 style={{fontSize: 62, marginTop: 200}}>The future of money is here</h1>
          <h2>We're the most trusted place for people and businesses to buy, sell, and manage crypto.</h2>

          <div className="field mt-2">
                <div className="control" style={{marginTop: 300}}>
                <h2>Explore crypto like Bitcoin, Ethereum, and Dogecoin.</h2>
                  <button className="button is-outlined" onClick={() => { window.location.href = "/registration"}} style={{marginTop: 10}}>
                    Register now
                  </button>
                </div>
              </div>
        </div>
        </div>
      </div>
    </div >
  );
}

export default Home;