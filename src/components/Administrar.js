import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/administrar.css';

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

const AdministrarCatalogo = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [edicion, setEdicion] = useState('');
  const [age, setAge] = useState('');
  const [isbn, setIsbn] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [libroExistente, setLibroExistente] = useState(null);

  useEffect(() => {
    if (isbn) {
      const fetchLibro = async () => {
        try {
          const response = await fetch(`/api/libros/${isbn}`);
          if (response.ok) {
            const data = await response.json();
            setLibroExistente(data);
            setTitulo(data.titulo);
            setAutor(data.autor);
            setEdicion(data.edicion);
            setAge(data.age);
            setCategoria(data.categoria);
          } else {
            setLibroExistente(null);
            setTitulo('');
            setAutor('');
            setEdicion('');
            setAge('');
            setCategoria('');
          }
        } catch (error) {
          console.error('Error al buscar el libro:', error);
        }
      };
      fetchLibro();
    }
  }, [isbn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, edicion, age, isbn, categoria })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al agregar el documento');
      }

      setSuccess('Documento agregado correctamente');
      setTitulo('');
      setAutor('');
      setEdicion('');
      setAge('');
      setIsbn('');
      setCategoria('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/libros/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al eliminar el documento');
      }

      setSuccess('Documento eliminado correctamente');
      setTitulo('');
      setAutor('');
      setEdicion('');
      setAge('');
      setIsbn('');
      setCategoria('');
      setLibroExistente(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
      <div className="index_admcatalog">
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: '#8b0000' }}>Administrar Catálogo</h1>

          <label htmlFor="isbn">ISBN del Documento</label><br />
          <input
            type="text"
            id="isbn"
            name="isbn"
            placeholder="Ingrese el ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          /><br /><br />

          <label htmlFor="titulo">Título Del Libro</label><br />
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ingrese el título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          /><br /><br />

          <label htmlFor="autor">Autor del Documento</label><br />
          <input
            type="text"
            id="autor"
            name="autor"
            placeholder="Ingrese el autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          /><br /><br />

          <label htmlFor="edicion">Edición del Documento</label><br />
          <input
            type="text"
            id="edicion"
            name="edicion"
            placeholder="Ingrese la edición"
            value={edicion}
            onChange={(e) => setEdicion(e.target.value)}
          /><br /><br />

          <label htmlFor="age">Año del Documento</label><br />
          <input
            type="text"
            id="age"
            name="age"
            placeholder="Ingrese el año"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          /><br /><br />

          <label htmlFor="categoria">Categoría del Documento:</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select><br /><br />

          <div className="button-container">
            <button type="submit" className="boton_agregar botones">Agregar al Catálogo</button>
            {libroExistente && (
              <button type="button" className="boton_eliminar botones" onClick={handleDelete}>Eliminar del catálogo</button>
            )}
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default AdministrarCatalogo;