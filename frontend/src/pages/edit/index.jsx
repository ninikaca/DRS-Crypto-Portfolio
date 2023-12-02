import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { proveri_sesiju, kreiraj_sesiju, zavrsi_sesiju } from '../../session/session-manager';
import { useNavigate } from 'react-router-dom';

const Izmena = () => {
  const [formData, setFormData] = useState({
    id: '',
    ime: '',
    prezime: '',
    adresa: '',
    grad: '',
    drzava: '',
    telefon: '',
    email: '',
    lozinka: ''
  });
  const navigate = useNavigate();
  const [poruka, setPoruka] = useState('');
  const [greska, setGreska] = useState('');
  const [ucitanKorisnik, setUcitanKorisnik] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function odjava() {
    zavrsi_sesiju();
    window.location.reload(); // ne znam sto ne radi navigate('/') ....
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // resetovanje greske i poruke
    setPoruka('');
    setGreska('');

    // AXIOS POZIV KA APIJU
    try {
      const response = await axios.post('http://localhost:5000/api/korisnici/izmeni', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setPoruka(response.data.data);
      } else {
        setGreska(response.data.data); // axiosresponse ima request, response, data,
        // kako smo mi slali jsonify({data: poruka}), bice respone.data pa nas data response.data.data
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setGreska(error.response.data.data); // Axios response has request, response, data properties
      } else if (error.request) {
        // The request was made but no response was received
        setGreska('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an error
        setGreska(error.message);
      }
    }
  };

  useEffect(() => {
    

    async function fetch_user() {
      try {
        let korisnik = proveri_sesiju(); //  korisnik iz local storage

        if(korisnik == null)
        {
            return false;
        }
        const response = await axios.post('http://localhost:5000/api/korisnici/pribavi', {email: korisnik.email }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setUcitanKorisnik(response.data.data)
          setFormData(response.data.data)
          return true;
        }
        else {
          setUcitanKorisnik(null)
          return false;
        }
      }
      catch (error) {
        setUcitanKorisnik(null)
        return false;
      }
    }

    if (fetch_user() === false) {
      odjava()
    }
  }, [])

  return (
    <div>
      {/* ternarni operator, uslovno renderovanje, osnove reactjs --> google or ig posts */}
      {ucitanKorisnik != null &&
        <div>
          <form onSubmit={handleSubmit} className='container'>
            <div className="field">
              <label className="label">Ime:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="ime"
                  value={formData.ime}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Prezime:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="prezime"
                  value={formData.prezime}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Adresa:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="adresa"
                  value={formData.adresa}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Grad:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="grad"
                  value={formData.grad}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Država:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="drzava"
                  value={formData.drzava}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Telefon:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email:</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Lozinka:</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="lozinka"
                  value={formData.lozinka}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div>
              {/* Poruka za gresku */}
              {greska !== '' && <h2 className='has-text-danger'>{greska}</h2>}

              {/* Poruka o uspesnom dodavanju */}
              {poruka !== '' && <h2 className='has-text-success'>{poruka}</h2>}
            </div>
            <div className="field mt-2">
              <div className="control">
                <button className="button is-info" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>

  );
};

export default Izmena;