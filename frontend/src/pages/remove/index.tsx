import React, { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  // Dodajte ostale potrebne atribute
}

const CryptoList: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  useEffect(() => {
    // Dobavi podatke o kriptovalutama s vašeg API-ja
    axios.get("/api/crypto").then((response) => {
      setCryptoList(response.data);
    });
  }, []);

  const handleDelete = (cryptoId: string) => {
    // Pošalji zahtjev za brisanje kriptovalute
    axios.delete(`/api/crypto/${cryptoId}`).then(() => {
      // Ažuriraj lokalno stanje nakon brisanja
      setCryptoList((prevCryptoList) =>
        prevCryptoList.filter((crypto) => crypto.id !== cryptoId)
      );
    });
  };

  return (
    <div>
      <h1>Crypto List</h1>
      <ul>
        {cryptoList.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol}){" "}
            <button onClick={() => handleDelete(crypto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
