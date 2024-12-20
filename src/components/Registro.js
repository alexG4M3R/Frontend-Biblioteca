import React, { useState } from 'react';
import '../styles/registro.css';
import Header from './Header';
import Background from './Background';

const RegistroUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('usuario');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRutChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setRut(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, rut, email, password, direccion, telefono, rol })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error al crear el usuario');
      }

      setSuccess('Usuario creado correctamente');
      setNombre('');
      setRut('');
      setEmail('');
      setPassword('');
      setDireccion('');
      setTelefono('');
      setRol('usuario');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
        <h2>Registro de Usuario</h2>
        <div className="form-wrapper">
          <div className="register-tab">
            <h3>Datos Personales</h3>
            <form id="registerForm1" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="first-name">Nombre Completo</label>
                <input 
                  type="text" 
                  id="first-name" 
                  name="first-name" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required 
                  placeholder='Ej: Juan Pérez'
                />
              </div>
              <div className="input-group">
                <label htmlFor="rut">RUT (sin guion ni puntos)</label>
                <input 
                  type="text" 
                  id="rut" 
                  name="rut" 
                  value={rut}
                  onChange={handleRutChange}
                  pattern="\d*"
                  required 
                  placeholder='Ej: 123456789'
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  placeholder='ejemplo@example.com'
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder='********'
                />
              </div>
              <div className="input-group">
                <label htmlFor="direccion">Dirección</label>
                <input 
                  type="text" 
                  id="direccion" 
                  name="direccion" 
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required 
                  placeholder='Ej: Calle 123'
                />
              </div>
              <div className="input-group">
                <label htmlFor="telefono">Teléfono</label>
                <input 
                  type="tel" 
                  id="telefono" 
                  name="telefono" 
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required 
                  placeholder='912345678'
                />
              </div>
              <div className="input-group">
                <label htmlFor="rol">Rol</label>
                <select 
                  id="rol" 
                  name="rol" 
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                >
                  <option value="usuario">Usuario</option>
                  <option value="bibliotecario">Bibliotecario</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="fingerprint">Foto de la Huella Digital (opcional)</label>
                <input type="file" id="fingerprint" name="fingerprint" accept=".png, .jpg, .jpeg" />
              </div>
              <div className="input-group">
                <label htmlFor="photo">Foto de Usuario (opcional)</label>
                <input type="file" id="photo" name="photo" accept=".png, .jpg, .jpeg" />
              </div>
              <button type="submit">Registrar</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      </div>
    
  );
};

export default RegistroUsuario;