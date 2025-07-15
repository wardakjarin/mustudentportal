import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

function PrivateRoute({ children }) {
  const { authTokens } = useAuth();
  
  return authTokens ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;