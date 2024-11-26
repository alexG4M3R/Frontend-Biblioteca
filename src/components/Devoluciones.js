import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/devoluciones.css';
import Header from './Header';
import Background from './Background';
const DevolucionLibro = () => {
  return (
    <div>
        <Header />
        <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
        <div>
        <div className="devolucion_libro">
            <form>
            <h1 style={{ color: '#8b0000' }}>Devolución documento</h1>

            <label htmlFor="codigo_libro">Código Del Libro</label><br />
            <input type="text" id="codigo_libro" name="codigo_libro" placeholder="Ingrese código del documento" /><br />

            {/* Contenedor de botones */}
            <div className="button-container">
                <input className="boton_ingresar botones" type="submit" value="Ingresar" />

                <Link to="/administrar">
                <button type="button" className="boton_volver botones">Volver</button>
                </Link>
            </div>
            </form>
        </div>
        </div>
    </div>
  );
};

export default DevolucionLibro;
