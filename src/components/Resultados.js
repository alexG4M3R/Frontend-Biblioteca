import React, { useEffect, useState } from 'react';
import '../styles/Resultados.css'; 
import Header from './Header';
import Background from './Background';
import { useLocation, useNavigate } from 'react-router-dom';

const Resultados = () => {
  const [librosData, setLibrosData] = useState([]);
  const [selectedLibros, setSelectedLibros] = useState([]);
  const [tipoPrestamo, setTipoPrestamo] = useState('domicilio');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const titulo = params.get('titulo');
    const autor = params.get('autor');

    fetch(`/api/libros?titulo=${titulo}&autor=${autor}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLibrosData(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, [location.search]);

  const handleCheckboxChange = (libroId) => {
    setSelectedLibros(prevSelectedLibros => {
      if (prevSelectedLibros.includes(libroId)) {
        return prevSelectedLibros.filter(id => id !== libroId);
      } else {
        return [...prevSelectedLibros, libroId];
      }
    });
  };

  const handleAgregarSolicitud = async (e) => {
    e.preventDefault();
    try {
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('/api/prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuarioId,
          libros: selectedLibros,
          tipo: tipoPrestamo
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const data = await response.json();
      alert('Solicitud agregada y libros actualizados');
      navigate('/catalogo');
    } catch (error) {
      console.log(selectedLibros, usuarioId, tipoPrestamo);
      console.error('Error:', error);
      alert('Error al agregar la solicitud');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} />
      
      <div className="container">
        <h1>Resultados de la búsqueda</h1>

        <form onSubmit={handleAgregarSolicitud}>
          <div>
            <label>
              <input 
                type="radio" 
                value="domicilio" 
                checked={tipoPrestamo === 'domicilio'} 
                onChange={() => setTipoPrestamo('domicilio')} 
              />
              Préstamo a domicilio
            </label>
            <label>
              <input 
                type="radio" 
                value="sala" 
                checked={tipoPrestamo === 'sala'} 
                onChange={() => setTipoPrestamo('sala')} 
              />
              Préstamo en sala
            </label>
          </div>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Año</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {librosData.map((libro, index) => (
                <tr key={index}>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.age}</td>
                  <td>{libro.categoria}</td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedLibros.includes(libro._id)} 
                      onChange={() => handleCheckboxChange(libro._id)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="botoness">
            <button className="boton botones" onClick={() => navigate('/catalogo')}>Volver</button>
            <button type="submit" className="boton botones">Agregar Solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resultados;