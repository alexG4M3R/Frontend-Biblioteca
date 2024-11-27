import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/estilos.css'; 
import Header from './Header';
import Background from './Background';

const categorias = [
  'Ficción',
  'No Ficción',
  'Ciencia',
  'Historia',
  'Biografía',
  'Fantasía',
  'Misterio',
  'Romance',
  'Terror',
  'Aventura',
  'Infantil',
  'Educativo',
  'Salud',
  'Tecnología'
];

const Catalogo = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/resultados?titulo=${titulo}&autor=${autor}&categoria=${categoria}`);
  };

  return (
    <div>
      <Header />
      <Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} />
      
      <div className="Contenido">
        <div className="container">
          <h1>Catálogo de Libros</h1>
          <div className="filtros">
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

              <label htmlFor="CategoriaBsq">Categoría</label>
              <select 
                id="CategoriaBsq" 
                name="CategoriaBsq" 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button type="submit">Aplicar Filtros</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;