import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    adresa: '',
    grad: '',
    drzava: '',
    telefon: '',
    email: '',
    lozinka: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/korisnici/kreiraj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Korisnik created successfully with ID:', data.id);
        // Handle success: show a success message, redirect, etc.
      } else {
        console.error('Failed to create Korisnik:', response.statusText);
        // Handle error: show an error message, handle accordingly
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle error: show an error message, handle accordingly
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ime:
        <input type="text" name="ime" value={formData.ime} onChange={handleChange} />
      </label>
      <label>
        Prezime:
        <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} />
      </label>
      <label>
        Adresa:
        <input type="text" name="adresa" value={formData.adresa} onChange={handleChange} />
      </label>
      <label>
        Grad:
        <input type="text" name="grad" value={formData.grad} onChange={handleChange} />
      </label>
      <label>
        Država:
        <input type="text" name="drzava" value={formData.drzava} onChange={handleChange} />
      </label>
      <label>
        Telefon:
        <input type="text" name="telefon" value={formData.telefon} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Lozinka:
        <input type="password" name="lozinka" value={formData.lozinka} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;