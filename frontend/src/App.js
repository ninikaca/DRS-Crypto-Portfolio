import './App.css';
import './styles.css'; // Create a separate CSS file for styling
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from './pages/register';
import PrijavaForm from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/prijava" element={<PrijavaForm />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
