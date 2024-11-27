import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/devoluciones.css';
import Header from './Header';
import Background from './Background';

const DevolucionLibro = () => {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/devoluciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al devolver el libro');
      }

      window.alert('Libro devuelto correctamente');
      setSuccess('Libro devuelto correctamente');
      setIsbn('');
      setTimeout(() => {
        setSuccess('');
        navigate('/devoluciones');
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="devolucion_libro">
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: '#8b0000' }}>Devolución documento</h1>

          <label htmlFor="isbn">ISBN del Libro</label><br />
          <input 
            type="text" 
            id="isbn" 
            name="isbn" 
            placeholder="Ingrese ISBN del documento" 
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required 
          /><br />

          {/* Contenedor de botones */}
          <div className="button-container">
            <input className="boton_ingresar botones" type="submit" value="Ingresar" />
            <Link to="/administrar">
              <button type="button" className="boton_volver botones">Volver</button>
            </Link>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default DevolucionLibro;