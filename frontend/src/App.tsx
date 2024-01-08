import './App.css';
import './styles.css'; // Create a separate CSS file for styling
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from './pages/registration';
import Login from './pages/login';
import Edit from './pages/edit';
import Home from './pages/home';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
