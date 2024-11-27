import React, { useState, useEffect } from 'react';
import '../styles/login.css'; 
import Background from './Background';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('rol');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje);
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuarioId', data.id);
      localStorage.setItem('rol', data.rol);

      if (data.rol === 'admin') {
        navigate('/catalogo');
      } else if (data.rol === 'bibliotecario') {
        navigate('/catalogo');
      } else {
        navigate('/catalogo');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} />
      
      <div className='logincontainer'>
        <div className="login-container">
          <h1>Bienvenido a la biblioteca Municipal</h1>
          <h2>Inicie Sesión</h2>
          
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="login-button">Ingresar</button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;