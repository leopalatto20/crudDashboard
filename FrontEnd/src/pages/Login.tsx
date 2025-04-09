import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: (correo: string, grupo: string) => Promise<boolean>;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [grupo, setGrupo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin(correo, grupo);
    if (success) {
      navigate('/dashboard'); // Redirige al Dashboard
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <div>
        <label>Grupo:</label>
        <input
          type="text"
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
