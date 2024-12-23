import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './styles.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register({ name, email, password });
      navigate('/login');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            placeholder='Nombre'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="nameRegister"
          />
          </div>
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
          />
          </div>
        {error && <p>{error}</p>}
        <button className='toggle-btn' type="submit">Crear cuenta</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
