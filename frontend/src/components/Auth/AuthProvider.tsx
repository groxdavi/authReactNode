import React, { useState, useEffect, ReactNode } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, authenticate as authAuthenticate } from '../../services/authService';
import { AuthContext } from './AuthContext';
import {User} from "../../types"



export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await authAuthenticate();
        setUser(userData.user);
      } catch (error) {
        console.error('User not authenticated', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const userData = await authLogin(credentials.email, credentials.password);
    console.log('User logged in:', userData);
    setUser(userData.user);
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    await authRegister(userData.name, userData.email, userData.password);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};