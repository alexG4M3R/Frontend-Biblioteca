import React from 'react';
import '../styles/Solicitudes.css';
import Header from './Header';
import Background from './Background';

const Vencidos = () => {
  const vencidosData = [
    { id: '001', usuario: 'Juan Pérez', libros: 'Blancanieves, La caperucita roja', tipoPrestamo: 'Domicilio', fechaVencimiento: '2024-08-30' },
    { id: '002', usuario: 'Jorge Palma', libros: 'Programacion web y desarrollo movil', tipoPrestamo: 'Domicilio', fechaVencimiento: '2024-08-30' },
    { id: '003', usuario: 'Nelson Erices', libros: 'Biografia del Ale', tipoPrestamo: 'Sala', fechaVencimiento: '2024-08-30' },
    { id: '004', usuario: 'Walter White', libros: 'Quimica Avanzada, Negocios del bajo mundo, Narcos', tipoPrestamo: 'Domicilio', fechaVencimiento: '2024-08-30' },
    { id: '005', usuario: 'Tony Stark', libros: 'Fisica Termonuclear II, Revista Times', tipoPrestamo: 'Domicilio', fechaVencimiento: '2024-08-30' },
    { id: '006', usuario: 'Light Yagami', libros: 'Biografia de L, Consejos de un mentiroso', tipoPrestamo: 'Sala', fechaVencimiento: '2024-08-30' },
    { id: '007', usuario: 'Mike Ross', libros: 'Revisa legal 2016, Todo sobre Harvard, Nuevas leyes', tipoPrestamo: 'Sala', fechaVencimiento: '2024-08-30' },
    { id: '008', usuario: 'Pablo Riquelme', libros: 'Como subir el promedio, Programacion avanzada', tipoPrestamo: 'Domicilio', fechaVencimiento: '2024-08-30' },
  ];

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="container">
        <h1>Consulta de Prestamos Vencidos</h1>
        <form>
          <div className="filters">
            <input type="text" placeholder="Buscar por usuario, ID o libro..." />
            <select className="filter-select">
              <option value="all">Todos</option>
              <option value="domicilio">Domicilio</option>
              <option value="sala">Sala</option>
            </select>
            <button type="submit">Buscar</button>
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
            {vencidosData.map((prestamo, index) => (
              <tr key={index}>
                <td>{prestamo.id}</td>
                <td>{prestamo.usuario}</td>
                <td>{prestamo.libros}</td>
                <td>{prestamo.tipoPrestamo}</td>
                <td>{prestamo.fechaVencimiento}</td>
                <td>
                  <form>
                    <button className='botonsoli' type="submit">Enviar Recordatorio</button>
                  </form>
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
