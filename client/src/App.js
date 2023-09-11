import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppointmentForm from './components/AppointmentForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/LogIn';
import Register from './components/SignUp';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Router basename='/login'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AppointmentForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
