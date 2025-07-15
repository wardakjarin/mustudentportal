import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    dob: ''
  });
  const { setAuthTokens } = useAuth();
  const navigate = useNavigate();

  const { studentId, dob } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      setAuthTokens(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 to-blue-500 rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-white p-8 rounded-lg">
          <div className="text-center mb-8">
            <svg className="mx-auto h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">METRO UNIVERSITY BANGLADESH</h1>
            <p className="text-gray-600">Student Portal Login</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
              <input 
                type="text" 
                id="studentId" 
                name="studentId" 
                value={studentId}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                value={dob}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                LOGIN
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">Forgot credentials? Contact registrar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;