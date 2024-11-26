import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/estilos.css'; 
import Header from './Header';
import Background from './Background';

const Catalogo = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/resultados?titulo=${titulo}&autor=${autor}`);
  };

  return (
    <div>
      <Header />
      <Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} />
      
      <div className="Contenido">
        <div className="ConsultaCatalogo">
          <h2>Búsqueda de Catálogo</h2>
          <form onSubmit={handleSearch}>
            <label htmlFor="TituloBsq">Título</label>
            <input 
              type="text" 
              id="TituloBsq" 
              name="TituloBsq" 
              placeholder="Ingrese el título" 
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <label htmlFor="AutorBsq">Autor</label>
            <input 
              type="text" 
              id="AutorBsq" 
              name="AutorBsq" 
              placeholder="Ingrese el autor" 
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />

            <button type="submit">Aplicar Filtros</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;