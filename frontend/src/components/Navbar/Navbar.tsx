import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false); // Cierra el menú al hacer logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false); // Cierra el menú al seleccionar una opción
  };

  return (
    <nav>
      <div className="navbar-container">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          {!user ? (
            <>
              <li>
                <button onClick={closeMenu}><Link to="/">Inicio</Link></button>
              </li>
              <li>
                <button onClick={closeMenu}><Link to="/login">Iniciar sesión</Link></button>
              </li>
              <li>
                <button onClick={closeMenu}><Link to="/register">Crear cuenta</Link></button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={closeMenu}><Link to="/">Inicio</Link></button>
              </li>
              <li>
                <button onClick={closeMenu}><Link to="/profile">Mi perfil</Link></button>
              </li>
              <li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
