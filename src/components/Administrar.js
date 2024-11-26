import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/administrar.css';

import Header from './Header';
import Background from './Background';

const AdministrarCatalogo = () => {
  return (
    <div>
        <Header />
        <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
            <div>
            <div className="index_admcatalog">
                <form>
                <h1 style={{ color: '#8b0000' }}>Administrar Catálogo</h1>

                <label htmlFor="titulo">Título Del Libro</label><br />
                <input type="text" id="titulo" name="titulo" placeholder="Ingrese el título" /><br /><br />

                <label htmlFor="autor">Autor del Documento</label><br />
                <input type="text" id="autor" name="autor" placeholder="Ingrese el autor" /><br /><br />

                <label htmlFor="edicion">Edición del Documento</label><br />
                <input type="text" id="edicion" name="edicion" placeholder="Ingrese la edición" /><br /><br />

                <label htmlFor="ano">Año del Documento</label><br />
                <input type="text" id="ano" name="ano" placeholder="Ingrese el año" /><br /><br />


                <label htmlFor="categoria">Categoría del Documento:</label>
                <select id="categoria" name="categoria">
                    <option value="">Seleccionar</option>
                </select><br /><br />

                

                <div className="button-container">

                    <button type="submit" className="boton_agregar botones">Agregar al Catálogo</button>

                    <Link to="/eliminar">
                        <button type="button" className="boton_eliminar botones">Eliminar del catálogo</button>
                    </Link>


                    
                </div>
                </form>
            </div>
            </div>
    </div>
  );
};

export default AdministrarCatalogo;
