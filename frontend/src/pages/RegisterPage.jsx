import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { registerUser } from '../services/authService';
import useAuthStore from '../context/authStore';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', password: '', user_type: 'worker', location: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(formData);
      login(data.user, data.token);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <input type="tel" placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <select onChange={(e) => setFormData({...formData, user_type: e.target.value})} className="w-full border p-2 rounded mb-4">
              <option value="worker">Worker</option>
              <option value="client">Client</option>
            </select>
            <input type="text" placeholder="Location" onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;