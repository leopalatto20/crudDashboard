import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { maestroLogin } from './services/authservice'
import Admin from './pages/Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Leer el estado inicial desde localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const onLogin = async (correo: string, grupo: string) => {
    const result = await maestroLogin(correo, grupo);
    if (result.Valido) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // Guardar estado de autenticación
      localStorage.setItem('IDMaestro', result.IDMaestro); // Guardar ID del maestro
      return true;
    } else {
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false'); // Guardar estado de autenticación
      localStorage.removeItem('IDMaestro'); // Limpiar ID del maestro
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Eliminar estado de autenticación
    localStorage.removeItem('user'); // Eliminar datos del usuario
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard onLogout={logout} />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login onLogin={onLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
