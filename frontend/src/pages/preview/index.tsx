import React, { FormEvent, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { check_session, create_session, end_session } from '../../session/session-manager';
import IPreview from '../../interfaces/IPreview';


const Preview= (): React.JSX.Element => {
    const defaultData: IPreview = {
      name: '',
      quantity: '',
      value: '',
    }

    const [formData, setFormData] = useState<IPreview>(defaultData);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    //const [loadedUser, setLoadedUser] = useState<LoginData | null>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    function logout() {
      end_session();
      window.location.reload(); // return to homepage
    }
  
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      // resetovanje greske i poruke
      setMessage('');
      setError('');  

 // AXIOS POZIV KA APIJU
      try {
        const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/edit', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setMessage(response.data.data);
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

    return (
        <div>
          <a href='/login' className="link">
            Log In
          </a>
        <div>

      <center><h1>Preview</h1>
      <table>
        <thead>
          <tr>
            <th>Naziv</th><tr></tr>
            <th>Količina</th>
            <th>Vrednost u vlasništvu</th>
          </tr>
        </thead>
        
      </table>
      </center>
    </div>
        </div>
      
         
      );
    };

export default Preview;