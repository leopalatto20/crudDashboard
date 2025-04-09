import { Navigate, Outlet } from 'react-router-dom';

// NOTE: Estado global para bloquear la ruta de /dashboard si todavia no hay un login

interface PrivateRoutesProps {
  isAuthenticated: boolean;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
