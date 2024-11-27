import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Solicitudes.css';
import Header from './Header';
import Background from './Background';

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
        setLoanData(data || []);
        setFilteredLoans(data || []);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const results = loanData.filter(loan =>
      (loan.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.libros.some(libro => libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === '' || loan.tipo === filterType) &&
      loan.estado === 'pendiente' // Filtrar por estado pendiente
    );
    setFilteredLoans(results);
  }, [searchTerm, filterType, loanData]);

  const handleApprove = (loan) => {
    navigate('/RegistroSolicitud', { state: { loan } });
  };

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="container">
        <h1>Solicitudes de Préstamo</h1>
        <input 
          type="text" 
          placeholder="Buscar por usuario o libro..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Todos</option>
          <option value="domicilio">Domicilio</option>
          <option value="sala">Sala</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Libros</th>
              <th>Fecha de Préstamo</th>
              <th>Fecha de Devolución</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.usuario.nombre}</td>
                <td>{loan.libros.map(libro => libro.titulo).join(', ')}</td>
                <td>{new Date(loan.fechaPrestamo).toLocaleDateString()}</td>
                <td>{new Date(loan.fechaDevolucion).toLocaleDateString()}</td>
                <td>{loan.tipo}</td>
                <td>{loan.estado}</td>
                <td>
                  {loan.estado === 'pendiente' && (
                    <button onClick={() => handleApprove(loan)}>Aprobar</button>
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

export default Solicitudes;