import React, { FormEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { check_session, create_session } from '../../session/session-manager';
import LoginData from '../../interfaces/ILogin';
import IRegistration from '../../interfaces/IRegistration';
import Navbar from '../../components/navbar/navbar';

const Registration = (): React.JSX.Element => {
  const defaultData: IRegistration = {
    id: '',
    name: '',
    surname: '',
    address: '',
    city: '',
    country: '',
    number: '',
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState<IRegistration>(defaultData);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<LoginData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // resetovanje greske i poruke
    setMessage('');
    setError('');

    // AXIOS POZIV KA APIJU
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setMessage(response.data.data);

        // cuva trenutno prijavljen korisnik se u localstorage
        create_session(formData);
        window.location.reload();

      } else {
        setError(response.data.data); // axiosresponse ima request, response, data,
        // kako smo mi slali jsonify({data: poruka}), bice respone.data pa nas data response.data.data
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError(error.response.data.data); // Axios response has request, response, data properties
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an error
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const check : LoginData | null =  check_session()
    setUser(check); //  korisnik iz local storage
    if(check != null)
      window.location.href = "/login"

  }, [])

  return (
    <div>
      <Navbar />
      {/* ternarni operator, uslovno renderovanje, osnove reactjs --> google or ig posts */}
      {user == null &&
        <div className="columns ">
          <div className="column">
            <a href="/">
              <img
                src="regist.png"
                alt=""
              />
            </a>
          </div>
          <div className="column">
          <h1 style={{fontSize: 62, marginTop: 0, marginBottom: 40, marginLeft: 60, paddingLeft:50,}}>Register</h1>
            <form onSubmit={handleSubmit} className='container' style={{backgroundColor: 'white', marginTop: 50, padding: 20, paddingLeft:50, paddingRight: 50, borderRadius: 15}}>
              <div className="field">
                <label className="label">Name:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Surname:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Address:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">City:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Country:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Number:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="number"
                    value={formData.number}
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
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                {/* Poruka za gresku */}
                {error !== '' && <h2 className='has-text-danger'>{error}</h2>}

                {/* Poruka o uspesnom dodavanju */}
                {message !== '' && <h2 className='has-text-success'>{message}</h2>}
              </div>
              <div className="field mt-2">
                <div className="control">
                  <button className="button is-info" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
      <br/><br/>
    </div>

  );
};

export default Registration;