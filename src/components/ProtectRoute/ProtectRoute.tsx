import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../store/authContext';

export const ProtectRoute: React.FC = () => {
  const { authStatus } = useContext(AuthContext);
  if (!authStatus.authed) return <Navigate to='/login' replace />;
  return (
    <>
      <Outlet />
    </>
  );
};
