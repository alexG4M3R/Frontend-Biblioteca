import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalogo from './components/Catalogo';
import Resultados from './components/Resultados';
import AdministrarCatalogo from './components/Administrar';
import DevolucionLibro from './components/Devoluciones';
import RegistroUsuario from './components/Registro';
import PrivateRoute from './components/PrivateRoute';
import Solicitudes from './components/Solicitudes';
import RegistroSolicitud from './components/RegistroSolicitud';
import Vencidos from './components/Vencidos';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/solicitudes" element={<PrivateRoute element={<Solicitudes />} />} />
        <Route path="/registroSolicitud" element={<PrivateRoute element={<RegistroSolicitud />} />} />
        <Route path="/vencidos" element={<Vencidos />} />
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<PrivateRoute element={<Catalogo />} />} />
        <Route path="/resultados" element={<PrivateRoute element={<Resultados />} />} />
        <Route path="/administrar" element={<PrivateRoute element={<AdministrarCatalogo />} />} />
        <Route path="/devoluciones" element={<PrivateRoute element={<DevolucionLibro />} />} />
        <Route path="/registro" element={<PrivateRoute element={<RegistroUsuario />} />} />
      </Routes>
    </Router>
  );
}


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/solicitudes" element={<PrivateRoute element={<Solicitudes />} roles={['bibliotecario']} />} />
//         <Route path="/registroSolicitud" element={<PrivateRoute element={<RegistroSolicitud />} roles={['bibliotecario']} />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/catalogo" element={<PrivateRoute element={<Catalogo />} roles={['admin', 'bibliotecario', 'usuario']} />} />
//         <Route path="/resultados" element={<PrivateRoute element={<Resultados />} roles={['admin', 'bibliotecario', 'usuario']} />} />
//         <Route path="/administrar" element={<PrivateRoute element={<AdministrarCatalogo />} roles={['admin']} />} />
//         <Route path="/eliminar" element={<PrivateRoute element={<EliminarDocumento />} roles={['admin']} />} />
//         <Route path="/devoluciones" element={<PrivateRoute element={<DevolucionLibro />} roles={['bibliotecario']} />} />
//         <Route path="/registro" element={<PrivateRoute element={<RegistroUsuario />} roles={['admin']} />} />
//         <Route path="/unauthorized" element={<div>No tienes permiso para acceder a esta página.</div>} />
//       </Routes>
//     </Router>
//   );
// }

export default App;