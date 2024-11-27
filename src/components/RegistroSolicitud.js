import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/registro.css';
import Header from './Header';
import Background from './Background';

const RegistroSolicitud = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loan } = location.state || {};
  const [rut, setRut] = useState('');
  const [fingerprint, setFingerprint] = useState(null); // Estado para la foto de la huella digital
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loan) {
      navigate('/solicitudes');
    }
  }, [loan, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rut) {
      window.alert('Por favor, ingrese el RUT del usuario');
      return;
    }
    try {
      const response = await fetch(`/api/prestamos/${loan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'registrado', rut })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al registrar el préstamo');
      }

      window.alert('Préstamo registrado correctamente');
      navigate('/solicitudes');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="container">
        <h1>Registro de Préstamo</h1>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="libros">Libros Solicitados:</label>
          <input type="text" value={loan ? loan.libros.map(libro => libro.titulo).join(', ') : ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="tipoPrestamo">Tipo de Préstamo:</label>
          <input type="text" value={loan ? loan.tipo : ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="fechaDevolucion">Fecha de Devolución:</label>
          <input type="text" value={loan ? new Date(loan.fechaDevolucion).toLocaleDateString() : ''} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT del Usuario:</label>
          <input 
            type="text" 
            placeholder="Ingrese el RUT del usuario" 
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fingerprint">Foto de la Huella Digital (opcional):</label>
          <input 
            type="file" 
            id="fingerprint" 
            name="fingerprint" 
            accept=".png, .jpg, .jpeg" 
            onChange={(e) => setFingerprint(e.target.files[0])}
          />
        </div>
        <button onClick={handleSubmit}>Registrar</button>
      </div>
    </div>
  );
};

export default RegistroSolicitud;