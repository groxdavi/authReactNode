import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RedirectAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();


   
   if (user) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
    return <Navigate to={from} />;
  }

  return <>{children}</>;
};

export default RedirectAuth;