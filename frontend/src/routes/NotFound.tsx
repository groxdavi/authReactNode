import React from 'react'
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {

    const navigate = useNavigate();

const handleBack = () => {
    navigate('/');
}

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Página no encontrada</h1>
        <p>La página que buscas no existe.</p>
        <button onClick={handleBack}>volver a inicio</button>
      </div>
    );
  };