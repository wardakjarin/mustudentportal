import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../utils/SetAuthToken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('tokens') || null
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('tokens');
    setAuthTokens(null);
    setCurrentUser(null);
    setAuthToken(null);
    navigate('/login');
  }, [navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/students/me');
      setCurrentUser(res.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (authTokens) {
      setAuthToken(authTokens);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [authTokens, fetchUser]);

  const login = async (token) => {
    localStorage.setItem('tokens', token);
    setAuthTokens(token);
    setAuthToken(token);
    await fetchUser();
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authTokens, 
        currentUser,
        loading,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
