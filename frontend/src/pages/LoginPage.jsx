import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { loginUser } from '../services/authService';
import useAuthStore from '../context/authStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      login(data.user, data.token);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border p-2 rounded mb-4" required />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;