import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <>
      <h1 className="bg-amber-300 text-blue-300 text-2xl font-semibold text-center">Dashboard</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAdminClick}
        id="buttonAdmin"
      >
        Admin
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
