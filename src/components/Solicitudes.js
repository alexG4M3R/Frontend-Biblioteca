import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import '../styles/Solicitudes.css';
import Background from './Background.js';
import { useNavigate } from 'react-router-dom';

const Solicitudes = () => {
  const [loanData, setLoanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filterType, setFilterType] = useState(''); // Estado para el filtro de tipo de préstamo
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/prestamos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Verificar los datos en la consola del navegador
        setLoanData(data.solicitudes || []);
        setFilteredLoans(data.solicitudes || []);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const results = loanData.filter(loan =>
      (loan.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.libros.some(libro => libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === '' || loan.tipo === filterType)
    );
    setFilteredLoans(results);
  }, [searchTerm, filterType, loanData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleRegistrar = (id) => {
    navigate(`/registroSolicitud?id=${id}`);
  };

  return (
    <div>
      <Header />
      <div>
        <Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} />
      </div>
      <div className="container">
        <h1>Consulta de Solicitudes de Préstamo</h1>
        <input
          type="text"
          placeholder="Buscar por usuario o libro..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="domicilio">Préstamo a domicilio</option>
          <option value="sala">Préstamo en sala</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>ID Solicitud</th>
              <th>Usuario</th>
              <th>Libros Solicitados</th>
              <th>Tipo de Préstamo</th>
              <th>Fecha de Solicitud</th>
              <th>Fecha de Devolución</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>
                <td>{loan.usuario.nombre}</td>
                <td>{Array.isArray(loan.libros) ? loan.libros.map(libro => libro.titulo).join(', ') : 'N/A'}</td>
                <td>{loan.tipo}</td>
                <td>{new Date(loan.fechaPrestamo || loan.fechaReserva).toLocaleDateString()}</td>
                <td>{new Date(loan.fechaDevolucion || loan.fechaFinReserva).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleRegistrar(loan._id)}>Registrar Préstamo</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solicitudes;