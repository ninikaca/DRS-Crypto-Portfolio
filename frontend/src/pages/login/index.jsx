import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { proveri_sesiju, kreiraj_sesiju, zavrsi_sesiju } from '../../session/session-manager';
import { useNavigate } from 'react-router-dom';

const Prijava = () => {
  const [formData, setFormData] = useState({
    email: '',
    lozinka: ''
  });

  const navigate = useNavigate();
  const [poruka, setPoruka] = useState('');
  const [greska, setGreska] = useState('');
  const [korisnik, setKorisnik] = useState({});

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
      const response = await axios.post('http://localhost:5000/api/korisnici/prijava', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setPoruka(response.data.data);

        // cuva trenutno prijavljen korisnik se u localstorage
        kreiraj_sesiju(formData.email, formData.password);
        window.location.reload(); // navigate('/'); // promeni posle u konkretnu stranicu tipa navigate('/pocetna');

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
    setKorisnik(proveri_sesiju()); //  korisnik iz local storage
  }, [])

  return (
    <div>
      {/* ternarni operator, uslovno renderovanje, osnove reactjs --> google or ig posts */}
      {korisnik != null ?
        <div>
          <h1>Cao, {korisnik.email}!</h1>
          <button className="button is-danger" onClick={odjava}>
            Logout
          </button>
        </div>

        :
        <div>
          <a href='/' className="link">
            Registracija
          </a>
          <form onSubmit={handleSubmit} className='container'>
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
                  Prijava
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>

  );
};

export default Prijava;