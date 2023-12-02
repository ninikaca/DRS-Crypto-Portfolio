import './App.css';
import './styles.css'; // Create a separate CSS file for styling
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registracija from './pages/register';
import Prijava from './pages/login';
import Izmena from './pages/edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registracija />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/izmena" element={<Izmena />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
