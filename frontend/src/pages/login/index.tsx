import React, { FormEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { check_session, create_session, end_session } from '../../session/session-manager';
import LoginData from '../../interfaces/ILogin';

const Login = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<LoginData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function logout(): void {
    end_session();
    window.location.reload(); // ne znam sto ne radi navigate('/') ....
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // resetovanje greske i poruke
    setMessage('');
    setError('');

    // AXIOS POZIV KA APIJU
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage(response.data.data);

        // cuva trenutno prijavljen korisnik se u localstorage
        create_session(formData);
        window.location.reload(); // navigate('/'); // promeni posle u konkretnu stranicu tipa navigate('/pocetna');

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
    setUser(check_session()); //  korisnik iz local storage
  }, [])

  return (
    <div>
      {/* ternarni operator, uslovno renderovanje, osnove reactjs --> google or ig posts */}
      {user != null ?
        <div>
          <h1>Hello, {user.email}!</h1>
          <button className="button is-danger" onClick={logout}>
            Logout
          </button>
        </div>

        :
        <div>
          <a href='/registration' className="link">
            Registration
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
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>

  );
};

export default Login;