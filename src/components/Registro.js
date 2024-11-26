import React from 'react';
import '../styles/registro.css';
import Header from './Header';
import Background from './Background';

const RegistroUsuario = () => {
  return (
    <div>
      <Header />
      <div><Background imageUrl={`${process.env.PUBLIC_URL}/imagenes/fondo.jpeg`} /></div>
        <div className="container">
        <h2>Registro de Usuario</h2>
        <div className="form-wrapper">
            <div className="register-tab">
            <h3>Datos Personales</h3>
            <form id="registerForm1" action="#" method="post">
                <div className="input-group">
                <label htmlFor="first-name">Nombre Completo</label>
                <input type="text" id="first-name" name="first-name" required />
                </div>
                <div className="input-group">
                <label htmlFor="rut">RUT</label>
                <input type="text" id="rut" name="rut" required />
                </div>
                <div className="input-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required />
                </div>
                <div className="input-group">
                <label htmlFor="confirm-password">Confirmar Contraseña</label>
                <input type="password" id="confirm-password" name="confirm-password" required />
                <small id="passwordError" className="error-message"></small>
                </div>
            </form>
            </div>

            <div className="register-tab">
            <h3>Datos de Contacto y Biometría</h3>
            <form id="registerForm2" action="#" method="post" encType="multipart/form-data">
                <div className="input-group">
                <label htmlFor="address">Dirección</label>
                <input type="text" id="address" name="address" required />
                </div>
                <div className="input-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="input-group">
                <label htmlFor="fingerprint">Foto de la Huella Digital</label>
                <input type="file" id="fingerprint" name="fingerprint" accept=".png, .jpg, .jpeg" required />
                </div>
                <div className="input-group">
                <label htmlFor="photo">Foto de Usuario</label>
                <input type="file" id="photo" name="photo" accept=".png, .jpg, .jpeg" required />
                </div>
            </form>
            </div>
        </div>

        <div className="button-group">
            <button type="button" className="btn-back">Volver</button>
            <button type="submit" className="btn-register" form="registerForm1">Registrarse</button>
        </div>
        </div>
    </div>
  );
};

export default RegistroUsuario;
