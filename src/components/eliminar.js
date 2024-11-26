import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/eliminar.css';
import Header from './Header';
import Background from './Background';

const EliminarDocumento = () => {
  return (
    <div>
        <Header />
        <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
        <div>
            <div className="eliminar_documento">
                <form>
                    <h1 style={{ color: '#8b0000' }}>Eliminar documento</h1>
                    <label htmlFor="codigo_libro">Código Del Documento</label><br />
                    <input type="text" id="codigo_libro" name="codigo_libro" placeholder="Ingrese código del documento" /><br />

                    {/* Contenedor de los botones */}
                    <div className="button-container">
                        <input className="boton_ingresar_eliminar" type="submit" value="Ingresar" />
                        <Link to="/administrar">
                            <button type="button" className="boton_volver_eliminar">Volver</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EliminarDocumento;
