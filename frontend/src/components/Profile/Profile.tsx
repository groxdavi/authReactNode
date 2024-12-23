import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import "./Profile.css";

const Profile: React.FC = () => {
  const { user } = useAuth();


  if (!user || !user) {
    return <div>No se ha encontrado usuario. Por favor, inicia sesión.</div>;
  }



  const userData = user
  console.log(userData)
  return (
    <div className="profile-container">
      <h1>Perfil de {userData.name}</h1>
      <div className="profile-info">
        <div className="profile-item">
          <strong>Nombre:</strong>
          <span>{userData.name}</span>
        </div>
        <div className="profile-item">
          <strong>Email:</strong>
          <span>{userData.email}</span>
        </div>
        <div className="profile-item">
        <strong>Última vez:</strong>
          <span>{userData.lastLogin}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;