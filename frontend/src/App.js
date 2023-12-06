import './App.css';
import './styles.css'; // Create a separate CSS file for styling
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registracija from './pages/register';
import Prijava from './pages/login';
import Izmena from './pages/edit';
import Pocetna from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/izmena" element={<Izmena />} />
      </Routes>
    </Router>
  );
}

export default App;
