import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <img src="../imagenes/logo.png" className="header__logo" alt="logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item"><Link to="/catalogo">Catálogo</Link></li>



          {userRole === 'admin' && (
            <>
              <li className="header__nav-item"><Link to="/administrar">Administrar</Link></li>
              <li className="header__nav-item"><Link to="/registro">Registro</Link></li>
            </>
          )}
          {userRole === 'bibliotecario' && (
            <>
              <li className="header__nav-item"><Link to="/solicitudes">Solicitudes</Link></li>
              <li className="header__nav-item"><Link to="/vencidos">Prestamos</Link></li>
              <li className="header__nav-item"><Link to="/devoluciones">Devoluciones</Link></li>
            </>
          )}
          <li className="header__nav-item"><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;