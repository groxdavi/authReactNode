import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Navbar from '../components/Navbar/Navbar';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import RedirectAuth from '../components/Auth/RedirectAuth';
import Profile from '../components/Profile/Profile';
import { NotFound } from './NotFound';
import Home from '../components/Home/Home';



const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectAuth>
              <Login />
            </RedirectAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuth>
              <Register />
            </RedirectAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route path="/" element={<Home/>} />
        {/* Rutas no existentes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;