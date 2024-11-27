import React, { useEffect, useState } from 'react';
import '../styles/Solicitudes.css';
import Header from './Header';
import Background from './Background';
import { useNavigate } from 'react-router-dom';

const Vencidos = () => {
  const [prestamosData, setPrestamosData] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Estado para el filtro de tipo de préstamo
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/prestamos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPrestamosData(data);
        } else {
          setError('Error al obtener los datos');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSendReminder = (prestamoId) => {
    // Aquí puedes agregar la lógica para enviar el recordatorio por correo
    // Por ahora, solo mostramos un mensaje de confirmación
    setMessage(`Recordatorio enviado al correo para el préstamo con ID: ${prestamoId}`);
  };

  const handleDevolucion = (prestamoId) => {
    navigate(`/devoluciones/`);
  };

  const filteredPrestamos = prestamosData.filter(prestamo => {
    const matchesFilter = filterType === 'all' || prestamo.estado === filterType;
    const matchesSearch = prestamo.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prestamo.libros.some(libro => libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          prestamo._id.includes(searchTerm);
    const isRegisteredOrVencido = prestamo.estado === 'registrado' || prestamo.estado === 'vencido';
    return matchesFilter && matchesSearch && isRegisteredOrVencido;
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="container">
        <h1>Consulta de Préstamos</h1>
        {message && <p className="message">{message}</p>}
        <form>
          <div className="filters">
            <input 
              type="text" 
              placeholder="Buscar por usuario, ID o libro..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select className="filter-select" value={filterType} onChange={handleFilterChange}>
              <option value="all">Todos</option>
              <option value="registrado">En Préstamo</option>
              <option value="vencido">Vencidos</option>
            </select>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID Solicitud</th>
              <th>Usuario</th>
              <th>Libros Prestados</th>
              <th>Tipo de Préstamo</th>
              <th>Fecha de Vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrestamos.map((prestamo, index) => (
              <tr key={index}>
                <td>{prestamo._id}</td>
                <td>{prestamo.usuario.nombre}</td>
                <td>{prestamo.libros.map(libro => libro.titulo).join(', ')}</td>
                <td>{prestamo.tipo}</td>
                <td>{new Date(prestamo.fechaDevolucion).toLocaleString()}</td>
                <td>
                  {prestamo.estado === 'vencido' ? (
                    <button 
                      className='botonsoli' 
                      type="button" 
                      onClick={() => handleSendReminder(prestamo._id)}
                    >
                      Enviar Recordatorio
                    </button>
                  ) : (
                    <button 
                      className='botonsoli' 
                      type="button" 
                      onClick={() => handleDevolucion(prestamo._id)}
                    >
                      Devolver Libro
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vencidos;