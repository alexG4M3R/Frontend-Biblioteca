import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/RegistroSolicitud.css';
import Background from './Background';
import { useLocation, useNavigate } from 'react-router-dom';

const RegistroSolicitud = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [libros, setLibros] = useState('');
  const [tipoPrestamo, setTipoPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [rut, setRut] = useState('');
  const [error, setError] = useState('');
  const [showHuella, setShowHuella] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const solicitudId = params.get('id'); // Obtener el ID de la solicitud desde los parámetros de la URL

  useEffect(() => {
    if (solicitudId) {
      // Obtener los datos de la solicitud desde el backend
      fetch(`/api/prestamos/${solicitudId}`)
        .then(response => response.json())
        .then(data => {
          setLibros(data.libros.map(libro => libro.titulo).join(', '));
          setTipoPrestamo(data.tipo);
          setFechaDevolucion(new Date(data.fechaDevolucion).toLocaleDateString());
        })
        .catch(error => console.error('Error:', error));
    } else {
      setError('ID de solicitud no proporcionado');
    }
  }, [solicitudId]);

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/usuarios/${rut}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      const usuario = await response.json();
      if (usuario.rut !== rut) {
        throw new Error('RUT no coincide con el usuario');
      }

      // Actualizar el estado del préstamo a "registrado"
      await fetch(`/api/prestamos/${solicitudId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setIsConfirmed(true);
      navigate('/solicitudes'); // Redirigir a la pantalla de solicitudes
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowHuella = () => {
    setShowHuella(true);
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
          <input type="text" value={libros} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="tipoPrestamo">Tipo de Préstamo:</label>
          <input type="text" value={tipoPrestamo} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="fechaDevolucion">Fecha de Devolución:</label>
          <input type="text" value={fechaDevolucion} readOnly />
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
        <button onClick={handleConfirm}>Confirmar</button>
        {isConfirmed && (
          <div>
            <p>Huella digital registrada</p>
            {/* Aquí puedes agregar la lógica para mostrar la huella digital */}
          </div>
        )}
        <button onClick={handleShowHuella}>Mostrar Huella</button>
        {showHuella && (
          <div>
            <img src="/imagenes/huella.png" alt="Huella Digital" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroSolicitud;