import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { maestroLogin } from './services/authservice'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // NOTE: Esta funcion usa maestroLogin que esta dentro de services
  const onLogin = async (correo: string, grupo: string) => {
    const result = await maestroLogin(correo, grupo);
    if (result.Valido) {
      setIsAuthenticated(true);
      return true;
    }
    else {
      setIsAuthenticated(false);
      return false;
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login onLogin={onLogin} />} />
      </Routes>
    </Router>
  )
}

export default App
