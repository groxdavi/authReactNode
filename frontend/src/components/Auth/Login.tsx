import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/profile";
      window.location.reload();
      navigate(from);
    } catch {
      setError('Ingresaste mal email o contraseña. Intenta de nuevo.');
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
      <h2 className='h2Login'>Inicio de sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            placeholder='Contraseña'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='inputLogin'
          />
        </div>
        {error && <p>{error}</p>}
        <button className="toggle-btn" type="submit">Iniciar sesión</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
