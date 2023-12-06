import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { proveri_sesiju } from '../../session/session-manager';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const Pocetna = () => {
    return (
        <div>
            <Navbar/>
          <h1>Welcome to Crypto Portfolio</h1>
        </div>
      );
}

export default Pocetna;